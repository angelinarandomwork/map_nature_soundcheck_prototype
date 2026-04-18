import { Button } from '@mui/material'
import type { JSX } from 'react'
import { getStatusBannerStyle, playAgainButtonSx } from './styles'
import type { StatusBannerProps } from './types'

const getStatusMessage = (status: StatusBannerProps['status'], answer: string): string | null => {
  if(status === 'won') return 'Yay! Great work'
  if(status === 'lost') return `Almost! The answer was: ${answer}`
  return null
}

export const StatusBanner = ({ status, answer }: StatusBannerProps): JSX.Element | null => {
  const statusMessage = getStatusMessage(status, answer)
  if(!statusMessage) return null

  return (
    <div style={getStatusBannerStyle(status)}>
      {statusMessage}
    </div>
  )
}

export const PlayAgainButton = ({ onClick }: { onClick: () => void }): JSX.Element => (
  <Button onClick={onClick} sx={playAgainButtonSx}>
    Play again
  </Button>
)
