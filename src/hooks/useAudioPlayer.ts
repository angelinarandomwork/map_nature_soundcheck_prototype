import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { UseAudioPlayerOptions, UseAudioPlayerResult, PlaybackStatus } from "./types"

let activeAudioElement: HTMLAudioElement | null = null

const stopOtherAudio = (audioElement: HTMLAudioElement): void => {
    if (!activeAudioElement || activeAudioElement === audioElement) return
    activeAudioElement.pause()
    activeAudioElement.currentTime = 0
}

export const useAudioPlayer = ({
    src,
    autoplay = false,
    onPlayFailure,
}: UseAudioPlayerOptions): UseAudioPlayerResult => {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [status, setStatus] = useState<PlaybackStatus>("idle")

    const teardownAudioElement = useCallback((): void => {
        const audioElement = audioRef.current

        if (!audioElement) return

        audioElement.pause()
        audioElement.src = ""

        if (activeAudioElement === audioElement) activeAudioElement = null

        audioRef.current = null
    }, [])

    const play = useCallback(async (): Promise<void> => {
        const audioElement = audioRef.current

        if (!audioElement) {
            setStatus("unavailable")
            onPlayFailure?.()
            return
        }

        try {
            setStatus("loading")
            stopOtherAudio(audioElement)
            activeAudioElement = audioElement
            await audioElement.play()
        } catch {
            if (activeAudioElement === audioElement)  activeAudioElement = null

            setStatus("error")
            onPlayFailure?.()
        }
    }, [onPlayFailure])

    const pause = useCallback((): void => {
        audioRef.current?.pause()
    }, [])

    const reset = useCallback((): void => {
        teardownAudioElement()
        setStatus("idle")
    }, [teardownAudioElement])

    useEffect(() => {
        if (!src) {
            teardownAudioElement()
            setStatus("idle")
            return
        }

        const audioElement = new Audio(src)
        audioElement.preload = "none"

        const handlePlay = (): void => setStatus("playing")
        const handlePause = (): void => setStatus("ready")
        const handleEnded = (): void => {
            if (activeAudioElement === audioElement) activeAudioElement = null
            setStatus("ready")
        }

        const handleWaiting = (): void => setStatus("loading")

        const handleCanPlay = (): void => {
            setStatus((currentStatus) =>
                currentStatus === "playing" ? currentStatus : "ready",
            )
        }

        const handleError = (): void => {
            if (activeAudioElement === audioElement) activeAudioElement = null
            setStatus("error")
        }

        audioElement.addEventListener("play", handlePlay)
        audioElement.addEventListener("pause", handlePause)
        audioElement.addEventListener("ended", handleEnded)
        audioElement.addEventListener("waiting", handleWaiting)
        audioElement.addEventListener("canplay", handleCanPlay)
        audioElement.addEventListener("error", handleError)

        audioRef.current = audioElement
        setStatus("ready")

        if (autoplay) void play()

        return () => {
            audioElement.pause()
            audioElement.removeEventListener("play", handlePlay)
            audioElement.removeEventListener("pause", handlePause)
            audioElement.removeEventListener("ended", handleEnded)
            audioElement.removeEventListener("waiting", handleWaiting)
            audioElement.removeEventListener("canplay", handleCanPlay)
            audioElement.removeEventListener("error", handleError)

            if (activeAudioElement === audioElement) activeAudioElement = null
        }
    }, [autoplay, play, src, teardownAudioElement])

    return useMemo(
        () => ({
            status,
            isPlaying: status === "playing",
            isLoading: status === "loading",
            hasError: status === "error" || status === "unavailable",
            canPlay: status !== "unavailable",
            play,
            pause,
            reset,
        }),
        [pause, play, reset, status],
    )
}