import type { TimeRange } from '../types/data'

export const isWithinTimeRange = (
  timestamp: number | string,
  timeRange: TimeRange,
): boolean => {
  const recordUnix =
    typeof timestamp === 'number' ? timestamp : new Date(timestamp).getTime()

  return (
    recordUnix >= timeRange.earliestDateTime &&
    recordUnix <= timeRange.latestDateTime
  )
}

export const filterRecordsByTimeWindow = <TRecord>(
  records: TRecord[],
  timeRange: TimeRange,
  getTimestamp: (record: TRecord) => number | string,
): TRecord[] => {
  return records.filter((record) =>
    isWithinTimeRange(getTimestamp(record), timeRange),
  )
}
