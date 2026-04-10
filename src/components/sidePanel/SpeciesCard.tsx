import { useEffect, useState, type JSX } from 'react' // backgroundColor: '#e0f7f7b0'
import CircularProgress from '@mui/material/CircularProgress'
import { Badge, Box, Card, Inline, Stack, Text } from '../../design-system'
import {
  formatConfidenceScore,
  formatUnixToDisplayDateTime,
} from '../../lib/formatters'
import type { SpeciesCardProps } from '../../types/components'
import { getConfidenceTone } from './scoreBand'

export const SpeciesCard = ({
  observation,
  imageUrl,
  isImageResolving,
}: SpeciesCardProps): JSX.Element => {
  const [isImageAssetLoading, setIsImageAssetLoading] = useState(false)
  const [hasImageError, setHasImageError] = useState(false)

  useEffect(() => {
    if (!imageUrl) {
      setIsImageAssetLoading(false)
      setHasImageError(false)
      return
    }

    setIsImageAssetLoading(true)
    setHasImageError(false)
  }, [imageUrl])

  const showSpinner = isImageResolving || (Boolean(imageUrl) && isImageAssetLoading)
  const showImage = Boolean(imageUrl) && !isImageResolving && !isImageAssetLoading && !hasImageError
  const showFallback = !showSpinner && !showImage

  return (
    <Card tone="elevated" padding="md">
      <Stack space={16}>
        <Inline align="start" space={12}>
          <Box
            as="div"
            radius="container"
            style={{
              width: 72,
              minWidth: 72,
              height: 72,
              overflow: 'hidden',
              backgroundColor: '#e0f7f7b0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={observation.commonName}
                onLoad={() => setIsImageAssetLoading(false)}
                onError={() => {
                  setIsImageAssetLoading(false)
                  setHasImageError(true)
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: showImage ? 'block' : 'none',
                }}
              />
            ) : null}

            {showSpinner ? (
              <CircularProgress
                size={24}
                thickness={4}
                sx={{ color: '#059669' }}
                aria-label={`Loading image for ${observation.commonName}`}
              />
            ) : null}

            {showFallback ? (
              <Text
                role="label"
                tone="muted"
                style={{
                  textAlign: 'center',
                  padding: 8,
                }}
              >
                No image
              </Text>
            ) : null}
          </Box>

          <Box
            as="div"
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <Stack space={8}>
              <Inline justify="between" align="start" space={8}>
                <Box
                  as="div"
                  style={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <Text role="bodyLarge">{observation.commonName}</Text>
                </Box>
                <Badge tone={getConfidenceTone(observation.confidence)}>
                  {formatConfidenceScore(observation.confidence)}
                </Badge>
              </Inline>

              <Text role="body" tone="secondary">
                {observation.scientificName}
              </Text>
            </Stack>
          </Box>
        </Inline>

        <Stack space={10}>
          <Inline justify="between" align="centre">
            <Text role="body" tone="secondary">
              Observed at
            </Text>
            <Text role="label">
              {formatUnixToDisplayDateTime(observation.timestamp)}
            </Text>
          </Inline>

          <Inline justify="between" align="centre">
            <Text role="body" tone="secondary">
              File
            </Text>
            <Text role="label">{observation.fileName}</Text>
          </Inline>
        </Stack>
      </Stack>
    </Card>
  )
}