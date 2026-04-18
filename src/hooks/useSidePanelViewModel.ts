import { useMemo } from "react"
import { getHighestConfidenceObservation } from "../lib/formatters"
import { getSpeciesBreakdown, groupObservationsBySpecies } from "../lib/speciesAggregation"
import { getAverageNdsiScore } from "../scores/getAverageNdsiScore"
import { useSpeciesImages } from "./useSpeciesImages"
import type { SidePanelState } from "../entities"
import type { SidePanelViewModel } from "./types"

export const useSidePanelViewModel = (state: SidePanelState): SidePanelViewModel => {
    const hasSelection = Boolean(state.coordinates)

    const proprietaryObservations = state.proprietary?.observations ?? []
    const externalObservations = state.external?.observations ?? []

    const proprietarySpeciesGroups = useMemo(
        () => groupObservationsBySpecies(proprietaryObservations),
        [proprietaryObservations],
    )

    const externalSpeciesGroups = useMemo(
        () => groupObservationsBySpecies(externalObservations),
        [externalObservations],
    )

    const proprietarySpeciesBreakdown = useMemo(
        () => getSpeciesBreakdown(proprietaryObservations),
        [proprietaryObservations],
    )

    const externalSpeciesBreakdown = useMemo(
        () => getSpeciesBreakdown(externalObservations),
        [externalObservations],
    )

    const highestConfidenceObservation = useMemo(
        () => getHighestConfidenceObservation(proprietaryObservations),
        [proprietaryObservations],
    )

    const ndsiScores = useMemo(
        () =>
        proprietaryObservations
            .map((observation) => observation.ndsiScore)
            .filter((score): score is number => typeof score === 'number'),
        [proprietaryObservations],
    )

    const averageNdsiScore = useMemo(
        () => getAverageNdsiScore(ndsiScores),
        [ndsiScores],
    )
    
    const speciesNamesForImages = useMemo(
        () => [
        ...proprietarySpeciesGroups.map((group) => group.scientificName),
        ...externalSpeciesGroups.map((group) => group.scientificName),
        ],
        [proprietarySpeciesGroups, externalSpeciesGroups],
    )

    const { imageMap, loadingMap } = useSpeciesImages(speciesNamesForImages)

    return {
        hasSelection,
        proprietaryObservations,
        externalObservations,
        proprietarySpeciesGroups,
        externalSpeciesGroups,
        proprietarySpeciesBreakdown,
        externalSpeciesBreakdown,
        highestConfidenceObservation,
        averageNdsiScore,
        ndsiScores,
        pointOrPoints: state.proprietaryDataPoints.length > 1 ? 'points' : 'point',
        imageMap,
        loadingMap,
    }
}