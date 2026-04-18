import type { BiodiversityScoreBand } from "./types"

export const getBiodiversityScoreBand = (score: number): BiodiversityScoreBand => {
    if (score < 0.3) return 'low'
    if (score < 0.6) return 'medium'
    return 'high'
}

// TODO: improve 