import type { BaseObservation, Proprietary, TimeRange } from "../entities"

export const toPercentage = (value: number): string => `${Math.round(value * 100)}%`

export const toScore = (value: number): string => `${Math.round(value * 100)}/100`

export const toFixedCoordinate = (value: number): string => value.toFixed(5)


export const MINUTE_IN_MS = 60 * 1000
export const HOUR_IN_MS = 60 * MINUTE_IN_MS
export const DAY_IN_MS = 24 * HOUR_IN_MS
const DEFAULT_APPLICATION_WINDOW_IN_DAYS = 30
const DEFAULT_SELECTED_WINDOW_IN_DAYS = 7

export const isValidTimeRange = ({ earliestDateTime, latestDateTime }: TimeRange): boolean => {
    return earliestDateTime <= latestDateTime
}

export const getDatasetTimeBounds = (
    proprietaryDataPoints: Array<Proprietary>,
): { minDateTime: number; maxDateTime: number } => {
    const timestamps = proprietaryDataPoints
        .flatMap((dataPoint) => dataPoint.observations.map((observation) => observation.timestamp))
        .filter((timestamp) => Number.isFinite(timestamp) && timestamp > 0)

    if (timestamps.length === 0) {
        const now = Date.now()

        return {
            minDateTime: now - DEFAULT_APPLICATION_WINDOW_IN_DAYS * DAY_IN_MS,
            maxDateTime: now,
        }
    }

    return {
        minDateTime: Math.min(...timestamps),
        maxDateTime: Math.max(...timestamps),
    }
}

export const getApplicationTimeBounds = (
    proprietaryDataPoints: Array<Proprietary>,
    referenceDateTime: number = Date.now(),
): { minDateTime: number; maxDateTime: number } => {
    const now = referenceDateTime
    const rollingWindowStart = now - DEFAULT_APPLICATION_WINDOW_IN_DAYS * DAY_IN_MS
    const { minDateTime: datasetMinDateTime, maxDateTime: datasetMaxDateTime } = getDatasetTimeBounds(proprietaryDataPoints)

    return {
        minDateTime: Math.min(datasetMinDateTime, rollingWindowStart),
        maxDateTime: Math.max(datasetMaxDateTime, now),
    }
}

export const getInitialRangeWithinBounds = (
    minDateTime: number,
    maxDateTime: number,
    referenceDateTime: number = Date.now(),
): TimeRange => {
    const preferredLatest = Math.min(referenceDateTime, maxDateTime)
    const preferredEarliest = preferredLatest - DEFAULT_SELECTED_WINDOW_IN_DAYS * DAY_IN_MS

    return {
        earliestDateTime: Math.max(minDateTime, preferredEarliest),
        latestDateTime: preferredLatest,
    }
}

export const clampTimeRange = (
    range: TimeRange,
    minDateTime: number,
    maxDateTime: number,
): TimeRange => {
    const earliestDateTime = Math.max(minDateTime, Math.min(range.earliestDateTime, maxDateTime))
    const latestDateTime = Math.max(minDateTime, Math.min(range.latestDateTime, maxDateTime))

    if (earliestDateTime <= latestDateTime) {
        return {
            earliestDateTime,
            latestDateTime,
        }
    }

    return {
        earliestDateTime: latestDateTime,
        latestDateTime: earliestDateTime,
    }
}

export const formatUnixToDisplayDateTime = (unixMs: number): string => {
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(unixMs))
}

export const formatConfidenceScore = (value: number): string => value.toFixed(2)

export const getUniqueSpeciesCount = (observations: Array<BaseObservation>): number => {
    return new Set(observations.map((observation) => observation.scientificName)).size
}


export const getHighestConfidenceObservation = (
    observations: Array<BaseObservation>,
): BaseObservation | null => {
    return observations.reduce<BaseObservation | null>((highestObservation, observation) => {
        if (!highestObservation || observation.confidence > highestObservation.confidence) {
            return observation
        }

        return highestObservation
    }, null)
}
