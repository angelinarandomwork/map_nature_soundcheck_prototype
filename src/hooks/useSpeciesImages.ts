import { useEffect, useMemo, useState } from 'react'

type TaxonSearchResponse = {
  results?: Array<{
    name?: string
    default_photo?: {
      square_url?: string | null
      medium_url?: string | null
    } | null
  }>
}

type SpeciesImageMap = Record<string, string | null>

const speciesImageCache = new Map<string, string | null>()

const getBestPhotoUrl = (response: TaxonSearchResponse): string | null => {
  const firstResult = response.results?.[0]

  if (!firstResult?.default_photo) {
    return null
  }

  return firstResult.default_photo.square_url ?? firstResult.default_photo.medium_url ?? null
}

const fetchSpeciesImage = async (scientificName: string): Promise<string | null> => {
  const response = await fetch(
    `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(scientificName)}&rank=species`,
  )

  if (!response.ok) {
    return null
  }

  const payload = (await response.json()) as TaxonSearchResponse

  return getBestPhotoUrl(payload)
}

export const useSpeciesImages = (scientificNames: string[]): SpeciesImageMap => {
  const uniqueScientificNames = useMemo(() => {
    return [...new Set(scientificNames.filter(Boolean))].sort()
  }, [scientificNames])

  const scientificNamesKey = uniqueScientificNames.join('|')

  const [imageMap, setImageMap] = useState<SpeciesImageMap>(() => {
    return uniqueScientificNames.reduce<SpeciesImageMap>((accumulator, scientificName) => {
      if (speciesImageCache.has(scientificName)) {
        accumulator[scientificName] = speciesImageCache.get(scientificName) ?? null
      }

      return accumulator
    }, {})
  })

  useEffect(() => {
    let isCancelled = false

    const unresolvedScientificNames = uniqueScientificNames.filter(
      (scientificName) => !speciesImageCache.has(scientificName),
    )

    if (unresolvedScientificNames.length === 0) {
      setImageMap(
        uniqueScientificNames.reduce<SpeciesImageMap>((accumulator, scientificName) => {
          accumulator[scientificName] = speciesImageCache.get(scientificName) ?? null
          return accumulator
        }, {}),
      )
      return
    }

    const loadImages = async () => {
      const entries = await Promise.all(
        unresolvedScientificNames.map(async (scientificName) => {
          try {
            const imageUrl = await fetchSpeciesImage(scientificName)
            return [scientificName, imageUrl] as const
          } catch {
            return [scientificName, null] as const
          }
        }),
      )

      if (isCancelled) {
        return
      }

      entries.forEach(([scientificName, imageUrl]) => {
        speciesImageCache.set(scientificName, imageUrl)
      })

      setImageMap(
        uniqueScientificNames.reduce<SpeciesImageMap>((accumulator, scientificName) => {
          accumulator[scientificName] = speciesImageCache.get(scientificName) ?? null
          return accumulator
        }, {}),
      )
    }

    void loadImages()

    return () => {
      isCancelled = true
    }
  }, [scientificNamesKey, uniqueScientificNames])

  return imageMap
}
