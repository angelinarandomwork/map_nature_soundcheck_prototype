import type { BiodiversitySelectionState, TimeRange } from "../entities"

export type Score = {
  label: string
  value: number
}

export type SidePanelProps = {
  state: BiodiversitySelectionState
  minDateTime: number
  maxDateTime: number
  onTimeRangeChange: (timeRange: TimeRange) => void | Promise<void>
}
