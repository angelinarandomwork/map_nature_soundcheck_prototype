export const requireEnv = (value: string | undefined, key: string): string => {
    if (value === undefined || value.trim() === '') throw new Error(`Missing required environment variable: ${key}`)
    return value
}

export const parseOptionalStringEnv = (value: string | undefined): string | null => {
    if (value === undefined) return null
    const trimmedValue = value.trim()
    return trimmedValue === '' ? null : trimmedValue
}

export const parseBooleanEnv = (value: string | undefined, defaultValue: boolean): boolean => {
    if (value === undefined) return defaultValue
    if (value === 'true') return true
    if (value === 'false') return false

    throw new Error(`Invalid boolean environment variable value: ${value}`)
}

export const parseNumberEnv = (value: string | undefined, defaultValue: number): number => {
    if (value === undefined || value.trim() === '') return defaultValue
    const parsedValue = Number(value)
    if (!Number.isFinite(parsedValue)) throw new Error(`Invalid numeric environment variable value: ${value}`)

    return parsedValue
}
