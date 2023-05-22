import { useEffect, useState } from 'react'
import {
  Audio,
  AVPlaybackStatus,
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from 'expo-av'

import { Track, usePlaybackStore } from './usePlaybackStore'

export const usePlayback = () => {
  const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] =
    useState<boolean>(false)

  const [isSeeking, setIsSeeking] = useState<boolean>(false)
  const playback = usePlaybackStore()

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      playback.setIsBuffering(status.isBuffering)
      playback.setPlaybackInstancePosition(status.positionMillis)
      playback.setPlaybackInstanceDuration(status.durationMillis as number)
      playback.setShouldPlay(status.shouldPlay)
      playback.setMuted(status.isMuted)
      playback.setVolume(status.volume)
      playback.setShouldCorrectPitch(status.shouldCorrectPitch)
    } else if (status.error) {
      console.log(`FATAL PLAYER ERROR: ${status.error}`)
    }
  }

  const loadNewPlaybackInstance = async (
    playing: boolean,
    audioURL: string
  ) => {
    // check if the song that is being played is the same as the one that is being requested
    // if so, do nothing
    // if not, unload the current song and load the new one
    if (
      playback.playbackInstance?.sound !== null &&
      audioURL !== null &&
      playback.playbackInstance?.status.isLoaded
    ) {
      const currentTrackURL = playback.playbackInstance?.status.uri
      if (currentTrackURL !== playback.track?.trackURL) {
        await playback.playbackInstance?.sound.unloadAsync()
        playback.setPlaybackInstance(null)
      }
    }

    // if (playback.playbackInstance?.sound !== null) {
    //   await playback.playbackInstance?.sound.unloadAsync()
    //   playback.setPlaybackInstance(null)
    // }

    if (!playback.playbackInstance?.sound) {
      console.log('loading new playback instance')
      const source = {
        uri: audioURL,
      }
      const initialStatus = {
        shouldPlay: playing,
        shouldCorrectPitch: playback.shouldCorrectPitch,
      }

      const playbackInstance = await Audio.Sound.createAsync(
        source,
        initialStatus,
        onPlaybackStatusUpdate
      )
      playback.setPlaybackInstance(playbackInstance)
    }
  }

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      playThroughEarpieceAndroid: false,
    })
    // if (playback.trackURL) {
    //   loadNewPlaybackInstance(playback.isPlaying, playback.trackURL)
    // }
  }, [playback.isPlaying, playback.track])

  const onPlayPausePressed = async (track: Track) => {
    playback.setTrack(track)
    if (playback.playbackInstance?.sound != null) {
      if (playback.isPlaying) {
        await playback.playbackInstance?.sound.pauseAsync()
        playback.setIsPlaying(false)
      } else {
        await playback.playbackInstance.sound.playAsync()
        playback.setTrack(track)
        playback.setIsPlaying(true)
      }
    } else {
      loadNewPlaybackInstance(true, track.trackURL).then(async () => {
        await playback.playbackInstance?.sound.playAsync()
        playback.setIsPlaying(true)
      })
    }
  }

  const onSliderValueChange = () => {
    if (playback.playbackInstance?.sound != null && !isSeeking) {
      setIsSeeking(true)
      setShouldPlayAtEndOfSeek(playback.isPlaying)
      playback.playbackInstance?.sound.pauseAsync()
    }
  }
  const onSliderValueChangeComplete = (value: number) => {
    if (playback.playbackInstance?.sound != null) {
      setIsSeeking(false)
      const seekPosition = value * playback.playbackInstanceDuration
      if (shouldPlayAtEndOfSeek) {
        playback.playbackInstance.sound.playFromPositionAsync(seekPosition)
      } else {
        playback.playbackInstance.sound.setPositionAsync(seekPosition)
      }
    }
  }
  const getPlaybackSliderPosition = () => {
    if (
      playback.playbackInstance?.sound != null &&
      playback.playbackInstancePosition != null &&
      playback.playbackInstanceDuration != null
    ) {
      const position =
        playback.playbackInstancePosition / playback.playbackInstanceDuration
      return position
    }
    return 0
  }
  const getMMSSFromMillis = (millis: number) => {
    const totalSeconds = millis / 1000
    const seconds = Math.floor(totalSeconds % 60)
    const minutes = Math.floor(totalSeconds / 60)

    const padWithZero = (number: number) => {
      const string = number.toString()
      if (number < 10) {
        return `0${string}`
      }
      return string
    }
    return `${padWithZero(minutes)}:${padWithZero(seconds)}`
  }

  const goTenSecondForwardOrBackward = (value: number) => {
    playback.playbackInstance?.sound.setStatusAsync({
      positionMillis: playback.playbackInstancePosition + value,
    })
  }

  const timeElapsed = getMMSSFromMillis(playback.playbackInstancePosition)
  const timeRemaining = getMMSSFromMillis(
    playback.playbackInstanceDuration - playback.playbackInstancePosition
  )

  return {
    onPlayPausePressed,
    onSliderValueChange,
    onSliderValueChangeComplete,
    getPlaybackSliderPosition,
    getMMSSFromMillis,
    goTenSecondForwardOrBackward,
    timeElapsed,
    timeRemaining,
  }
}
