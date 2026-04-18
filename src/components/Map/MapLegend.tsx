import { Card, Inline, Stack, Text } from '../../styles'
import { swatchCircle, legendCardStyle } from './mapStyles'
import type { BiodiversityBand } from './types'

export const biodiversityBands: Array<BiodiversityBand> = [
  { label: 'Low', style: { backgroundColor: 'var(--reddish-dark-low)' } },
  { label: 'Moderate', style: { backgroundColor: 'var(--amber-dark-low)' } },
  { label: 'High', style: { backgroundColor: 'var(--green-dark-low)' } },
]

export const renderBand = (band: BiodiversityBand) => (
  <Inline key={band.label} justify="between" align="center">
    <Text role="caption" tone="secondary">
      {band.label}
    </Text>
    <span style={{...swatchCircle, ...band.style}} />
  </Inline>
)

export const MapLegend = () => {
  return (
    <Card
      padding="md"
      style={legendCardStyle}
    >
      <Stack space={12}>
        <Text role="featureLabel">Biodiversity bands</Text>

        <Text role="body" tone="secondary">
          What the scores mean...
        </Text>

        <Stack space={4}>
          {biodiversityBands.map(renderBand)}
        </Stack>
      </Stack>
    </Card>
  )
}