import { useCallback, useEffect, useMemo, useState } from 'react'
import { useBiodiversityData } from './useBiodiversityData'
import {
  filterProprietaryDataPointsByTimeRange,
  getProprietaryDataPointById,
} from '../lib/proprietarySelectors'
import { initialState } from '../lib/initialStates'
import { getApplicationTimeBounds, getInitialRangeWithinBounds, isValidTimeRange } from '../lib/formatters'
import type { BiodiversitySelectionState, Coordinates, TimeRange } from '../entities'
import { useProprietary } from './useProprietaryData'

export const useSelectLocationBiodiversity = () => {
  const [state, setState] = useState<BiodiversitySelectionState>(initialState)
  const allProprietaryPoints = useProprietary()
  const referenceDateTime = useMemo(() => Date.now(), [])

  const updateState = useCallback((patch: Partial<BiodiversitySelectionState>) => {
    setState((current) => ({ ...current, ...patch }))
  }, [])

  useEffect(() => {
    updateState({ isLoadingMapPoints: true, errorMessage: null })

    try {
      const { minDateTime, maxDateTime } = getApplicationTimeBounds(
        allProprietaryPoints,
        referenceDateTime,
      )
      const initialRange = getInitialRangeWithinBounds(
        minDateTime,
        maxDateTime,
        referenceDateTime,
      )
      const filteredProprietaryPoints = filterProprietaryDataPointsByTimeRange(
        allProprietaryPoints,
        initialRange,
      )

      setState((current) => ({
        ...current,
        proprietaryDataPoints: filteredProprietaryPoints,
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
  }, [allProprietaryPoints, referenceDateTime, updateState])

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
          allProprietaryPoints,
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
    [allProprietaryPoints, finishExternalError, updateState],
  )

  const selectProprietaryLocation = useCallback(
    async (proprietaryId: string, timeRange: TimeRange) => {
      if (!isValidTimeRange(timeRange)) {
        updateState({ errorMessage: 'Earliest date must be before latest date.' })
        return
      }

      const existing = allProprietaryPoints.find((dataPoint) => dataPoint.id === proprietaryId)

      if (!existing) {
        updateState({ errorMessage: 'The selected proprietary point could not be found.' })
        return
      }

      const filteredProprietaryPoints = filterProprietaryDataPointsByTimeRange(
        allProprietaryPoints,
        timeRange,
      )

      updateState({
        coordinates: existing.coordinates,
        proprietary: null,
        selectedProprietaryId: existing.id,
        selectedMode: 'proprietary',
        earliestDateTime: timeRange.earliestDateTime,
        latestDateTime: timeRange.latestDateTime,
        proprietaryDataPoints: filteredProprietaryPoints,
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
          proprietaryDataPoints: filteredProprietaryPoints,
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
    [allProprietaryPoints, updateState],
  )

  const setTimeRange = useCallback(
    async (timeRange: TimeRange) => {
      if (!isValidTimeRange(timeRange)) {
        updateState({ errorMessage: 'Earliest date must be before latest date.' })
        return
      }

      const filteredProprietaryPoints = filterProprietaryDataPointsByTimeRange(
        allProprietaryPoints,
        timeRange,
      )

      updateState({
        earliestDateTime: timeRange.earliestDateTime,
        latestDateTime: timeRange.latestDateTime,
        proprietaryDataPoints: filteredProprietaryPoints,
        errorMessage: null,
      })

      if (state.selectedMode === 'proprietary' && state.selectedProprietaryId) {
        const selectedDataPointIsVisible = filteredProprietaryPoints.some(
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
      allProprietaryPoints,
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
