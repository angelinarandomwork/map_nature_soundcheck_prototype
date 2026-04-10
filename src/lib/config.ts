const requireEnv = (value: string | undefined, key: string): string => {
    if (value === undefined || value.trim() === '') throw new Error(`Missing required environment variable: ${key}`)

    return value
}

export const parseBooleanEnv = (value: string | undefined, defaultValue: boolean): boolean => {
    if (value === undefined) return defaultValue
    if (value === 'true') return true
    if (value === 'false') return false

    throw new Error(`Invalid boolean environment variable value: ${value}`)
}

export const config = {
    mapboxAccessToken: requireEnv(
        import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
        'VITE_MAPBOX_ACCESS_TOKEN',
    ),
}