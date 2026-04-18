import type { ReactNode } from "react"
import type { Coordinates, ExternalSourceSummary, 
  ProprietaryObservation, SidePanelState, SpeciesBreakdownItem, SpeciesObservationGroup } from "../../entities"

export type MetricRowProps = {
  label: string
  value: ReactNode
}



export type SpeciesGroupListInfo = {
  groups: Array<SpeciesObservationGroup>
  imageMap: Record<string, string | null | undefined>
  loadingMap: Record<string, boolean | undefined>
  emptyMessage: string
}

export type ExternalSectionProps = {
  state: SidePanelState
  speciesGroups: Array<SpeciesObservationGroup>
  speciesBreakdown: Array<SpeciesBreakdownItem>
  imageMap: Record<string, string | null | undefined>
  loadingMap: Record<string, boolean | undefined>
}

export type SourceSummaryProps = {
  summaries: Array<ExternalSourceSummary>
}

export type ProprietarySectionProps = {
  state: SidePanelState
  observations: Array<ProprietaryObservation>
  speciesGroups: Array<SpeciesObservationGroup>
  speciesBreakdown: Array<SpeciesBreakdownItem>
  highestConfidenceObservation: ProprietaryObservation | null
  averageNdsiScore: number | null
  ndsiScores: Array<number>
  imageMap: Record<string, string | null | undefined>
  loadingMap: Record<string, boolean | undefined>
}

export type SelectedLocationSectionProps = {
  coordinates: Coordinates | null
}

export type MapStatusInfo = {
  isLoadingMapPoints: boolean
  proprietaryDataPointCount: number
  pointLabel: string
}


