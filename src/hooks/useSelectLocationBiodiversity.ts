import { useCallback, useEffect, useState } from 'react'
import { useBiodiversityData } from './useBiodiversityData'
import { useProprietaryData } from './useProprietaryData'
import {
  filterProprietaryDataPointsByTimeRange,
  getProprietaryDataPointById,
} from '../lib/proprietarySelectors'
import type { Coordinates, BiodiversitySelectionState, TimeRange } from '../types/data'
import { initialState } from '../lib/initialStates'
import { getInitialRangeWithinBounds, getDatasetTimeBounds, isValidTimeRange } from '../lib/formatters'

export const useSelectLocationBiodiversity = () => {
  const [state, setState] = useState<BiodiversitySelectionState>(initialState)
  const allProprietaryDataPoints = useProprietaryData()

  const updateState = useCallback((patch: Partial<BiodiversitySelectionState>) => {
    setState((current) => ({ ...current, ...patch }))
  }, [])

  useEffect(() => {
    updateState({ isLoadingMapPoints: true, errorMessage: null })

    try {
      const { minDateTime, maxDateTime } = getDatasetTimeBounds(allProprietaryDataPoints)
      const initialRange = getInitialRangeWithinBounds(minDateTime, maxDateTime)
      const filteredProprietaryDataPoints = filterProprietaryDataPointsByTimeRange(
        allProprietaryDataPoints,
        initialRange,
      )

      setState((current) => ({
        ...current,
        proprietaryDataPoints: filteredProprietaryDataPoints,
        earliestDateTime:
          current.selectedMode === null
            ? initialRange.earliestDateTime
            : current.earliestDateTime,
        latestDateTime:
          current.selectedMode === null
            ? initialRange.latestDateTime
            : current.latestDateTime,
        isLoadingMapPoints: false,
        errorMessage: null,
      }))
    } catch {
      updateState({
        isLoadingMapPoints: false,
        errorMessage: 'Unable to load proprietary data points.',
      })
    }
  }, [allProprietaryDataPoints, updateState])

  const finishExternalError = useCallback(
    (message: string) => {
      updateState({
        external: null,
        isLoadingExpected: false,
        isLoadingObserved: false,
        errorMessage: message,
      })
    },
    [updateState],
  )

  const selectLocation = useCallback(
    async (coordinates: Coordinates, timeRange: TimeRange) => {
      if (!isValidTimeRange(timeRange)) {
        updateState({ errorMessage: 'Earliest date must be before latest date.' })
        return
      }

      updateState({
        coordinates,
        external: null,
        proprietary: null,
        selectedProprietaryId: null,
        selectedMode: 'map',
        earliestDateTime: timeRange.earliestDateTime,
        latestDateTime: timeRange.latestDateTime,
        proprietaryDataPoints: filterProprietaryDataPointsByTimeRange(
          allProprietaryDataPoints,
          timeRange,
        ),
        isLoadingExpected: true,
        isLoadingObserved: false,
        errorMessage: null,
      })

      try {
        const external = await useBiodiversityData(coordinates, timeRange)

        updateState({
          external,
          isLoadingExpected: false,
          isLoadingObserved: false,
        })
      } catch {
        finishExternalError('Unable to load external biodiversity data for this location.')
      }
    },
    [allProprietaryDataPoints, finishExternalError, updateState],
  )

  const selectProprietaryLocation = useCallback(
    async (proprietaryId: string, timeRange: TimeRange) => {
      if (!isValidTimeRange(timeRange)) {
        updateState({ errorMessage: 'Earliest date must be before latest date.' })
        return
      }

      const existing = allProprietaryDataPoints.find((dataPoint) => dataPoint.id === proprietaryId)

      if (!existing) {
        updateState({ errorMessage: 'The selected proprietary point could not be found.' })
        return
      }

      const filteredProprietaryDataPoints = filterProprietaryDataPointsByTimeRange(
        allProprietaryDataPoints,
        timeRange,
      )

      updateState({
        coordinates: existing.coordinates,
        proprietary: null,
        selectedProprietaryId: existing.id,
        selectedMode: 'proprietary',
        earliestDateTime: timeRange.earliestDateTime,
        latestDateTime: timeRange.latestDateTime,
        proprietaryDataPoints: filteredProprietaryDataPoints,
        external: null,
        isLoadingExpected: true,
        isLoadingObserved: true,
        errorMessage: null,
      })

      try {
        const proprietary = getProprietaryDataPointById(proprietaryId, timeRange)

        if (!proprietary) {
          updateState({
            proprietary: null,
            selectedProprietaryId: null,
            isLoadingExpected: false,
            isLoadingObserved: false,
            errorMessage: 'The selected proprietary point could not be found.',
          })
          return
        }

        const external = await useBiodiversityData(proprietary.coordinates, timeRange)

        updateState({
          coordinates: proprietary.coordinates,
          proprietary,
          selectedProprietaryId: proprietary.id,
          proprietaryDataPoints: filteredProprietaryDataPoints,
          external,
          isLoadingExpected: false,
          isLoadingObserved: false,
        })
      } catch {
        updateState({
          isLoadingExpected: false,
          isLoadingObserved: false,
          errorMessage: 'Unable to load the selected proprietary location.',
        })
      }
    },
    [allProprietaryDataPoints, updateState],
  )

  const setTimeRange = useCallback(
    async (timeRange: TimeRange) => {
      if (!isValidTimeRange(timeRange)) {
        updateState({ errorMessage: 'Earliest date must be before latest date.' })
        return
      }

      const filteredProprietaryDataPoints = filterProprietaryDataPointsByTimeRange(
        allProprietaryDataPoints,
        timeRange,
      )

      updateState({
        earliestDateTime: timeRange.earliestDateTime,
        latestDateTime: timeRange.latestDateTime,
        proprietaryDataPoints: filteredProprietaryDataPoints,
        errorMessage: null,
      })

      if (state.selectedMode === 'proprietary' && state.selectedProprietaryId) {
        const selectedDataPointIsVisible = filteredProprietaryDataPoints.some(
          (dataPoint) => dataPoint.id === state.selectedProprietaryId,
        )

        if (!selectedDataPointIsVisible) {
          updateState({
            coordinates: null,
            external: null,
            proprietary: null,
            selectedProprietaryId: null,
            selectedMode: null,
            isLoadingExpected: false,
            isLoadingObserved: false,
          })
          return
        }

        await selectProprietaryLocation(state.selectedProprietaryId, timeRange)
        return
      }

      if (state.selectedMode === 'map' && state.coordinates) {
        await selectLocation(state.coordinates, timeRange)
      }
    },
    [
      allProprietaryDataPoints,
      selectLocation,
      selectProprietaryLocation,
      state.coordinates,
      state.selectedMode,
      state.selectedProprietaryId,
      updateState,
    ],
  )

  return {
    state,
    selectLocation,
    selectProprietaryLocation,
    setTimeRange,
  }
}
