import {
  useEffect,
  useMemo,
  useState,
  type JSX,
} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import InfoIcon from '@mui/icons-material/Info'
import LaunchIcon from '@mui/icons-material/Launch'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import { Badge, Box, Card, Inline, Stack, Text } from '../../styles'
import {
  formatConfidenceScore,
  formatUnixToDisplayDateTime,
} from '../../lib/formatters'
import { getConfidenceTone } from '../Badge/scoreBand'

import { buttonStyle, playbackIconStyle, linkStyle } from './styles'
import type { SpeciesCardInfo } from './types'
import { ExternalIconLink } from './ExternalIconLink'
import { useSpeciesAudio } from '../../hooks/useSpeciesAudio'
import { getInfoUrl } from './utils'
import type { SupportedObservation } from '../../entities'

export const SpeciesGroupCard = ({
  group,
  imageUrl,
  isImageResolving,
}: SpeciesCardInfo): JSX.Element => {
  const [isImageAssetLoading, setIsImageAssetLoading] = useState(false)
  const [hasImageError, setHasImageError] = useState(false)

  const representativeObservation = group.representativeObservation
  const getAudioUrl = (observation: SupportedObservation): string | undefined => 'audioUrl' in observation ? observation.audioUrl : undefined
  const getSourceRecordUrl = (observation: SupportedObservation): string | undefined => 'sourceRecordUrl' in observation ? observation.sourceRecordUrl : undefined
  const getObservationInfoUrl = (observation: SupportedObservation): string | undefined => 'infoUrl' in observation ? observation.infoUrl : undefined
  const sourceAudioObservation = group.observations.find((observation) => Boolean(getAudioUrl(observation)))
  const sourceAudioUrl = sourceAudioObservation ? getAudioUrl(sourceAudioObservation) : undefined
  const scientificName = group.scientificName
  const commonName = group.commonName

  const sourceLabel =
    'source' in representativeObservation
      ? representativeObservation.source
      : undefined

  const observationTypeLabel =
    'soundType' in representativeObservation
      ? representativeObservation.soundType
      : undefined

  const latestSourceRecordUrl = useMemo(() => {
    const sourceRecordObservation = group.observations.find((observation) => Boolean(getSourceRecordUrl(observation)))
    return sourceRecordObservation ? getSourceRecordUrl(sourceRecordObservation) : undefined
  }, [group.observations])

  const infoUrl = useMemo(() => {
    return getInfoUrl(scientificName, getObservationInfoUrl(representativeObservation))
  }, [representativeObservation, scientificName])

  const {
    isAudioPlaying,
    isAudioLoading,
    hasAudioError,
    audioState,
    canAttemptAudioResolution,
    handleAudioClick,
  } = useSpeciesAudio({
    scientificName,
    sourceAudioUrl,
  })

  useEffect(() => {
    if (!imageUrl) {
      setIsImageAssetLoading(false)
      setHasImageError(false)
      return
    }

    setIsImageAssetLoading(true)
    setHasImageError(false)
  }, [imageUrl])

  const showSpinner =
    isImageResolving || (Boolean(imageUrl) && isImageAssetLoading)
  const showImage =
    Boolean(imageUrl) &&
    !isImageResolving &&
    !isImageAssetLoading &&
    !hasImageError
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
                alt={commonName}
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
                aria-label={`Loading image for ${commonName}`}
              />
            ) : null}

            {showFallback ? (
              <Text
                role="label"
                tone="muted"
                style={{ textAlign: 'center', padding: 8 }}
              >
                No image
              </Text>
            ) : null}
          </Box>

          <Box as="div" style={{ flex: 1, minWidth: 0 }}>
            <Stack space={8}>
              <Inline justify="between" align="start" space={8}>
                <Box as="div" style={{ flex: 1, minWidth: 0 }}>
                  <Text role="bodyLarge">{commonName}</Text>
                </Box>
                <Badge tone={getConfidenceTone(group.highestConfidence)}>
                  Peak {formatConfidenceScore(group.highestConfidence)}
                </Badge>
              </Inline>

              <Text role="body" tone="secondary">
                {scientificName}
              </Text>
            </Stack>
          </Box>
        </Inline>

        <Stack space={10}>
          <Inline justify="between" align="center">
            <Text role="body" tone="secondary">
              Species observations
            </Text>
            <Text role="label">{group.observationCount}</Text>
          </Inline>

          <Inline justify="between" align="center">
            <Text role="body" tone="secondary">
              Average confidence
            </Text>
            <Text role="label">
              {formatConfidenceScore(group.averageConfidence)}
            </Text>
          </Inline>

          <Inline justify="between" align="center">
            <Text role="body" tone="secondary">
              Latest observation
            </Text>
            <Text role="label">
              {formatUnixToDisplayDateTime(group.latestTimestamp)}
            </Text>
          </Inline>

          {sourceLabel ? (
            <Inline justify="between" align="center">
              <Text role="body" tone="secondary">
                Source
              </Text>
              <Badge tone="info">{sourceLabel}</Badge>
            </Inline>
          ) : null}

          {observationTypeLabel ? (
            <Inline justify="between" align="center">
              <Text role="body" tone="secondary">
                Observation type
              </Text>
              <Text role="label">{observationTypeLabel}</Text>
            </Inline>
          ) : null}
        </Stack>

        <Stack space={12}>
          <Inline align="center" space={12} wrap>
            {canAttemptAudioResolution ? (
              <Inline align="center" space={10}>
                <IconButton
                  aria-label={
                    isAudioPlaying
                      ? `Pause audio for ${commonName}`
                      : `Play audio for ${commonName}`
                  }
                  onClick={() => {
                    void handleAudioClick()
                  }}
                  disabled={audioState.status === 'unavailable'}
                  sx={buttonStyle}
                >
                  {isAudioLoading ? (
                    <CircularProgress
                      size={20}
                      thickness={5}
                      sx={{ color: 'inherit' }}
                    />
                  ) : isAudioPlaying ? (
                    <PauseCircleIcon sx={playbackIconStyle} />
                  ) : (
                    <PlayCircleIcon sx={playbackIconStyle} />
                  )}
                </IconButton>

                <Stack space={2}>
                  <Text role="label">
                    {isAudioPlaying ? 'Playing audio' : 'Play audio'}
                  </Text>
                  <Text
                    role="caption"
                    tone={
                      audioState.status === 'unavailable' || hasAudioError
                        ? 'danger'
                        : 'secondary'
                    }
                  >
                    {audioState.status === 'unavailable' || hasAudioError
                      ? 'No available audio'
                      : sourceAudioUrl
                        ? 'Source recording'
                        : 'Example sound'}
                  </Text>
                </Stack>
              </Inline>
            ) : null}

            <Inline align="center" space={8}>
              <ExternalIconLink
                href={infoUrl}
                ariaLabel={`More information about ${commonName}`}
              >
                <InfoIcon fontSize="small" />
              </ExternalIconLink>

              <Text
                as="a"
                href={infoUrl}
                target="_blank"
                rel="noreferrer"
                role="label"
                tone="accent"
                style={linkStyle}
              >
                More information
              </Text>
            </Inline>

            {latestSourceRecordUrl ? (
              <Inline align="center" space={8}>
                <ExternalIconLink
                  href={latestSourceRecordUrl}
                  ariaLabel={`Open original record for ${commonName}`}
                >
                  <LaunchIcon fontSize="small" />
                </ExternalIconLink>

                <Text
                  as="a"
                  href={latestSourceRecordUrl}
                  target="_blank"
                  rel="noreferrer"
                  role="label"
                  tone="accent"
                  style={linkStyle}
                >
                  Original record
                </Text>
              </Inline>
            ) : null}
          </Inline>
        </Stack>

        <Accordion
          disableGutters
          elevation={0}
          sx={{
            backgroundColor: 'transparent',
            '&::before': {
              display: 'none',
            },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Text role="label">Observed times and confidences</Text>
          </AccordionSummary>

          <AccordionDetails sx={{ paddingTop: 0 }}>
            <Stack space={10}>
              {group.observations.map((observation, observationIndex) => (
                <Card
                  key={`${group.scientificName}-${observation.timestamp}-${observationIndex}`}
                  tone="elevated"
                  padding="sm"
                >
                  <Stack space={8}>
                    <Inline justify="between" align="center">
                      <Text role="body" tone="secondary">
                        Observed at
                      </Text>
                      <Text role="label">
                        {formatUnixToDisplayDateTime(observation.timestamp)}
                      </Text>
                    </Inline>

                    <Inline justify="between" align="center">
                      <Text role="body" tone="secondary">
                        Confidence
                      </Text>
                      <Badge tone={getConfidenceTone(observation.confidence)}>
                        {formatConfidenceScore(observation.confidence)}
                      </Badge>
                    </Inline>

                    {'ndsiScore' in observation &&
                    typeof observation.ndsiScore === 'number' ? (
                      <Inline justify="between" align="center">
                        <Text role="body" tone="secondary">
                          NDSI
                        </Text>
                        <Text role="label">
                          {observation.ndsiScore.toFixed(3)}
                        </Text>
                      </Inline>
                    ) : null}
                  </Stack>
                </Card>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Card>
  )
}