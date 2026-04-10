import type { BiodiversityScoreBand } from "../../types/components"

export const getBiodiversityScoreBand = (score: number): BiodiversityScoreBand => {
    if (score < 0.4) return 'low'
    if (score < 0.7) return 'medium'
    return 'high'
}

export const getBiodiversityScoreLabel = (score: number): string => {
    const band = getBiodiversityScoreBand(score)
    if (band === 'low') return 'Low'
    if (band === 'medium') return 'Moderate'
    return 'High'
}