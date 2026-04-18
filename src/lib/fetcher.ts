export const fetchJson = async <T>(
    input: RequestInfo | URL,
    init?: RequestInit,
): Promise<T> => {
    const response = await fetch(input, {
        ...init,
        headers: {
            Accept: 'application/json',
            ...(init?.headers ?? {}),
        },
    })

    if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || `Request failed with status ${response.status}`)
    }

    return (await response.json()) as T
}