import { getBiodiversityScoreBand } from "../../scores/getBiodiversityScoreBand"

export const getBiodiversityScoreLabel = (score: number): string => {
    const band = getBiodiversityScoreBand(score)
    if (band === 'low') return 'Low'
    if (band === 'medium') return 'Moderate'
    return 'High'
}

export const getConfidenceTone = (
    confidence: number,
): 'success' | 'warning' | 'info' => {
    if (confidence >= 0.85) return 'success'
    if (confidence >= 0.65) return 'warning'
    return 'info'
}
