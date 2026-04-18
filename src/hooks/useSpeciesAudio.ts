import { useEffect, useRef, useState } from 'react'
import type { AudioState } from '../components/SpeciesCards/types'
import { canResolveExampleAudio, resolveExampleAudio } from '../lib/exampleAudio'
import type { UseSpeciesAudioOptions, UseSpeciesAudioResult } from './types'

let activeAudioElement: HTMLAudioElement | null = null

export const useSpeciesAudio = ({
  scientificName,
  sourceAudioUrl,
}: UseSpeciesAudioOptions): UseSpeciesAudioResult => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [isAudioLoading, setIsAudioLoading] = useState(false)
  const [hasAudioError, setHasAudioError] = useState(false)
  const [audioState, setAudioState] = useState<AudioState>({ status: 'idle' })

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const shouldAutoplayOnResolveRef = useRef(false)

  const resolvedExampleAudioUrl =
    audioState.status === 'ready' ? audioState.url : undefined
  const audioUrl = sourceAudioUrl ?? resolvedExampleAudioUrl
  const canAttemptAudioResolution =
    Boolean(sourceAudioUrl) || canResolveExampleAudio(scientificName)

  useEffect(() => {
    if (!audioUrl) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
        audioRef.current = null
      }

      setIsAudioPlaying(false)
      setIsAudioLoading(false)
      return
    }

    const audioElement = new Audio(audioUrl)
    audioElement.preload = 'none'

    const handlePlay = (): void => {
      setIsAudioPlaying(true)
      setIsAudioLoading(false)
      setHasAudioError(false)
    }

    const handlePause = (): void => {
      setIsAudioPlaying(false)
      setIsAudioLoading(false)
    }

    const handleEnded = (): void => {
      setIsAudioPlaying(false)
      setIsAudioLoading(false)

      if (activeAudioElement === audioElement) {
        activeAudioElement = null
      }
    }

    const handleCanPlay = (): void => {
      setIsAudioLoading(false)
      setHasAudioError(false)
    }

    const handleWaiting = (): void => {
      setIsAudioLoading(true)
    }

    const handleError = (): void => {
      setIsAudioPlaying(false)
      setIsAudioLoading(false)
      setHasAudioError(true)

      if (activeAudioElement === audioElement) {
        activeAudioElement = null
      }
    }

    audioElement.addEventListener('play', handlePlay)
    audioElement.addEventListener('pause', handlePause)
    audioElement.addEventListener('ended', handleEnded)
    audioElement.addEventListener('canplay', handleCanPlay)
    audioElement.addEventListener('waiting', handleWaiting)
    audioElement.addEventListener('error', handleError)

    audioRef.current = audioElement

    if (shouldAutoplayOnResolveRef.current) {
      shouldAutoplayOnResolveRef.current = false

      void (async () => {
        try {
          setIsAudioLoading(true)
          setHasAudioError(false)

          if (activeAudioElement && activeAudioElement !== audioElement) {
            activeAudioElement.pause()
            activeAudioElement.currentTime = 0
          }

          activeAudioElement = audioElement
          await audioElement.play()
        } catch {
          setIsAudioPlaying(false)
          setIsAudioLoading(false)
          setHasAudioError(true)
          setAudioState({ status: 'unavailable' })

          if (activeAudioElement === audioElement) {
            activeAudioElement = null
          }
        }
      })()
    }

    return () => {
      audioElement.pause()
      audioElement.removeEventListener('play', handlePlay)
      audioElement.removeEventListener('pause', handlePause)
      audioElement.removeEventListener('ended', handleEnded)
      audioElement.removeEventListener('canplay', handleCanPlay)
      audioElement.removeEventListener('waiting', handleWaiting)
      audioElement.removeEventListener('error', handleError)

      if (activeAudioElement === audioElement) {
        activeAudioElement = null
      }

      if (audioRef.current === audioElement) {
        audioRef.current = null
      }
    }
  }, [audioUrl])

  const playCurrentAudio = async (): Promise<void> => {
    const audioElement = audioRef.current

    if (!audioElement) {
      setHasAudioError(true)
      setIsAudioLoading(false)
      setAudioState({ status: 'unavailable' })
      return
    }

    try {
      setIsAudioLoading(true)
      setHasAudioError(false)

      if (activeAudioElement && activeAudioElement !== audioElement) {
        activeAudioElement.pause()
        activeAudioElement.currentTime = 0
      }

      activeAudioElement = audioElement
      await audioElement.play()
    } catch {
      setIsAudioPlaying(false)
      setIsAudioLoading(false)
      setHasAudioError(true)
      setAudioState({ status: 'unavailable' })

      if (activeAudioElement === audioElement) {
        activeAudioElement = null
      }
    }
  }

  const handleAudioClick = async (): Promise<void> => {
    if (isAudioPlaying) {
      audioRef.current?.pause()
      return
    }

    setHasAudioError(false)

    if (audioRef.current) {
      await playCurrentAudio()
      return
    }

    if (sourceAudioUrl) {
      shouldAutoplayOnResolveRef.current = true
      setAudioState({ status: 'ready', url: sourceAudioUrl })
      return
    }

    setIsAudioLoading(true)
    setAudioState({ status: 'loading' })

    try {
      const result = await resolveExampleAudio(scientificName)

      if (!result) {
        shouldAutoplayOnResolveRef.current = false
        setIsAudioLoading(false)
        setIsAudioPlaying(false)
        setHasAudioError(true)
        setAudioState({ status: 'unavailable' })
        return
      }

      shouldAutoplayOnResolveRef.current = true
      setAudioState({ status: 'ready', url: result.audioUrl })
    } catch {
      shouldAutoplayOnResolveRef.current = false
      setIsAudioLoading(false)
      setIsAudioPlaying(false)
      setHasAudioError(true)
      setAudioState({ status: 'unavailable' })
    }
  }

  return {
    isAudioPlaying,
    isAudioLoading,
    hasAudioError,
    audioState,
    canAttemptAudioResolution,
    handleAudioClick,
  }
}