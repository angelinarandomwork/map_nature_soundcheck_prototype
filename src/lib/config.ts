import { parseBooleanEnv, parseNumberEnv, parseOptionalStringEnv, requireEnv } from "./env";

export const config = {
    mapboxAccessToken: requireEnv(
        import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
        'VITE_MAPBOX_ACCESS_TOKEN',
    ),
    xenoCantoApiKey: parseOptionalStringEnv(import.meta.env.VITE_XENO_CANTO_API_KEY),
    enableRemoteExampleAudio: parseBooleanEnv(
        import.meta.env.VITE_ENABLE_REMOTE_EXAMPLE_AUDIO,
        true,
    ),
    proprietaryAudioBaseUrl: parseOptionalStringEnv(import.meta.env.VITE_PROPRIETARY_AUDIO_BASE_URL),
    biodiversitySearchRadiusKm: parseNumberEnv(
        import.meta.env.VITE_BIODIVERSITY_SEARCH_RADIUS_KM,
        10,
    ),
}
