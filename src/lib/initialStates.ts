import type { BiodiversitySelectionState, TimeRange } from "../types/data"

const createLocalDateTimeValue = (date: Date): string => {
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, '0')
    const day = `${date.getDate()}`.padStart(2, '0')
    const hours = `${date.getHours()}`.padStart(2, '0')
    const minutes = `${date.getMinutes()}`.padStart(2, '0')

    return `${year}-${month}-${day}T${hours}:${minutes}`
}

export const toUnix = (isoTimestamp: string): number => Date.parse(isoTimestamp)
const createDefaultTimeRange = (): TimeRange => {
    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    return {
        earliestDateTime: toUnix(createLocalDateTimeValue(sevenDaysAgo)),
        latestDateTime: toUnix(createLocalDateTimeValue(now)),
    }
}

export const defaultTimeRange = createDefaultTimeRange()

export const initialState: BiodiversitySelectionState = {
    coordinates: null,
    areaId: null,
    external: null,
    proprietary: null,
    proprietaryDataPoints: [],
    selectedProprietaryId: null,
    selectedMode: null,
    earliestDateTime: defaultTimeRange.earliestDateTime,
    latestDateTime: defaultTimeRange.latestDateTime,
    isLoadingExpected: false,
    isLoadingObserved: false,
    isLoadingMapPoints: false,
    errorMessage: null,
}