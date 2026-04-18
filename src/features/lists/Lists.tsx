import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { buildPreparationSection, hardwareSection, wiringSection } from './data'
import type { ListSectionViewProps } from './types'

function ListSectionView({ section }: ListSectionViewProps) {
  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'grid', gap: 0.75 }}>
        <Typography sx={{ color: 'var(--color-text-primary)', fontWeight: 700, fontSize: '1.35rem' }}>
          {section.title}
        </Typography>
        {section.subtitle ? (
          <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
            {section.subtitle}
          </Typography>
        ) : null}
      </Box>


    </Stack>
  )
}

export function Step0List() {
  return <ListSectionView section={hardwareSection} />
}

export function Step1ListStepper() {
  return <ListSectionView section={buildPreparationSection} />
}

export function Step2ListOfSteppers() {
  return <ListSectionView section={wiringSection} />
}

export function CompleteListGuide() {
  return (
    <Stack spacing={4}>
      <Step0List />
      <Step1ListStepper />
      <Step2ListOfSteppers />
    </Stack>
  )
}

export default CompleteListGuide
