import { useEffect, useMemo, useState } from 'react'
import { fetchJson } from '../lib/fetcher'
import type { TaxonSearchResponse, SpeciesImageMap, SpeciesImageLoadingMap, UseSpeciesImagesResult } from '../types/data'


const speciesImageCache = new Map<string, string | null>()

const getBestPhotoUrl = (response: TaxonSearchResponse): string | null => {
  const firstResult = response.results?.[0]

  if (!firstResult?.default_photo) {
    return null
  }

  return firstResult.default_photo.square_url ?? firstResult.default_photo.medium_url ?? null
}

const fetchSpeciesImage = async (scientificName: string): Promise<string | null> => {
  const payload = await fetchJson<TaxonSearchResponse>(
    `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(scientificName)}&rank=species`,
  )

  return getBestPhotoUrl(payload)
}

const buildImageMap = (scientificNames: string[]): SpeciesImageMap => {
  return scientificNames.reduce<SpeciesImageMap>((accumulator, scientificName) => {
    accumulator[scientificName] = speciesImageCache.get(scientificName) ?? null
    return accumulator
  }, {})
}

const buildLoadingMap = (
  scientificNames: string[],
  unresolvedScientificNames: Set<string>,
): SpeciesImageLoadingMap => {
  return scientificNames.reduce<SpeciesImageLoadingMap>((accumulator, scientificName) => {
    accumulator[scientificName] = unresolvedScientificNames.has(scientificName)
    return accumulator
  }, {})
}

export const useSpeciesImages = (
  scientificNames: string[],
): UseSpeciesImagesResult => {
  const scientificNamesKey = useMemo(() => {
    return [...new Set(scientificNames.filter(Boolean))].sort().join('|')
  }, [scientificNames])

  const uniqueScientificNames = useMemo(() => {
    if (!scientificNamesKey)return []
    return scientificNamesKey.split('|')
  }, [scientificNamesKey])

  const [imageMap, setImageMap] = useState<SpeciesImageMap>({})
  const [loadingMap, setLoadingMap] = useState<SpeciesImageLoadingMap>({})

  useEffect(() => {
    let isCancelled = false

    const unresolvedScientificNames = uniqueScientificNames.filter(
      (scientificName) => !speciesImageCache.has(scientificName),
    )

    setImageMap(buildImageMap(uniqueScientificNames))
    setLoadingMap(
      buildLoadingMap(uniqueScientificNames, new Set(unresolvedScientificNames)),
    )

    if (unresolvedScientificNames.length === 0) {
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

      if (isCancelled) return

      for (const [scientificName, imageUrl] of entries) {
        speciesImageCache.set(scientificName, imageUrl)
      }

      setImageMap(buildImageMap(uniqueScientificNames))
      setLoadingMap(buildLoadingMap(uniqueScientificNames, new Set()))
    }

    void loadImages()

    return () => {
      isCancelled = true
    }
  }, [scientificNamesKey])

  return {
    imageMap,
    loadingMap,
  }
}