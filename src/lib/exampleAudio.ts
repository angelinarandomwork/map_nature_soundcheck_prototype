import type { ExampleAudioResult, XenoCantoRecording, XenoCantoResponse } from "../hooks/types";

const exampleAudioCache = new Map<string, ExampleAudioResult | null>()

const normaliseScientificName = (scientificName: string): string =>
  scientificName.trim().replace(/\s+/g, ' ')

const splitBinomial = (
  scientificName: string,
): { genus: string; species: string } | null => {
  const normalisedName = normaliseScientificName(scientificName)
  const [genus, species] = normalisedName.split(' ')

  if (!genus || !species) return null

  return { genus, species }
}

const buildCandidateQueries = (scientificName: string): string[] => {
  const binomial = splitBinomial(scientificName)
  const normalisedName = normaliseScientificName(scientificName)
  if (!binomial) return []

  const { genus, species } = binomial

  return [
    `gen:${genus}+sp:${species}+grp:birds+q:A`,
    `gen:${genus}+sp:${species}+grp:birds`,
    `sp:"${normalisedName}"+grp:birds`,
    `sp:"${normalisedName}"`,
  ]
}

const toAbsoluteUrl = (value?: string): string | undefined => {
  if (!value) return undefined
  if (value.startsWith('http://') || value.startsWith('https://')) return value
  if (value.startsWith('//')) return `https:${value}`

  return undefined
}

const isPlayableRecording = (
  recording: XenoCantoRecording,
): recording is XenoCantoRecording & { file: string; url: string } =>
  Boolean(recording.file && recording.url)

const fetchQuery = async (
  query: string,
  apiKey: string,
): Promise<Array<XenoCantoRecording>> => {
  const url = new URL('https://xeno-canto.org/api/3/recordings')
  url.searchParams.set('query', query)
  url.searchParams.set('key', apiKey)

  const response = await fetch(url.toString())

  if (!response.ok) {
    const errorText = await response.text()
    console.warn('xeno-canto HTTP error', response.status, query, errorText)
    return []
  }

  const json = (await response.json()) as XenoCantoResponse
  if (json.error) {
    console.warn('xeno-canto API error', query, json.error)
    return []
  }

  if (!Array.isArray(json.recordings)) return []

  return json.recordings
}

const pickBestRecording = (
  recordings: Array<XenoCantoRecording>,
): ExampleAudioResult | null => {
  const playableRecordings = recordings.filter(isPlayableRecording)

  if (playableRecordings.length === 0) return null

  const preferredRecording =
    playableRecordings.find((recording) => recording.q === 'A') ??
    playableRecordings.find((recording) => recording.q === 'B') ??
    playableRecordings[0]

  const audioUrl = toAbsoluteUrl(preferredRecording.file)
  const attributionUrl = toAbsoluteUrl(preferredRecording.url)
  const sonogramUrl = toAbsoluteUrl(preferredRecording.sono?.small)

  if (!audioUrl || !attributionUrl) return null

  return {
    audioUrl,
    attributionUrl,
    sonogramUrl,
  }
}

export const canResolveExampleAudio = (scientificName: string): boolean =>
  splitBinomial(scientificName) !== null

export const resolveExampleAudio = async (
  scientificName: string,
): Promise<ExampleAudioResult | null> => {
  const cacheKey = normaliseScientificName(scientificName)

  if (exampleAudioCache.has(cacheKey)) return exampleAudioCache.get(cacheKey) ?? null

  const apiKey = import.meta.env.VITE_XENO_CANTO_API_KEY

  if (!apiKey) {
    console.error('Missing VITE_XENO_CANTO_API_KEY')
    exampleAudioCache.set(cacheKey, null)
    return null
  }

  const queries = buildCandidateQueries(cacheKey)

  for (const query of queries) {
    const recordings = await fetchQuery(query, apiKey)
    const result = pickBestRecording(recordings)

    if (result) {
      exampleAudioCache.set(cacheKey, result)
      return result
    }
  }

  console.warn('No xeno-canto recordings resolved for', scientificName)
  exampleAudioCache.set(cacheKey, null)
  return null
}