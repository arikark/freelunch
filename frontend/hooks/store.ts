import { Audio } from 'expo-av'
import { create } from 'zustand'

interface Playback {
  playbackInstance: Audio.Sound | null
  playbackInstanceName: string
  muted: boolean
  playbackInstancePosition: number
  playbackInstanceDuration: number
  shouldPlay: boolean
  isPlaying: boolean
  isBuffering: boolean
  isLoading: boolean
  shouldCorrectPitch: boolean
  volume: number
  setPlaybackInstance: (playbackInstance: Audio.Sound | null) => void
  setPlaybackInstanceName: (playbackInstanceName: string) => void
  setMuted: (muted: boolean) => void
  setPlaybackInstancePosition: (playbackInstancePosition: number) => void
  setPlaybackInstanceDuration: (playbackInstanceDuration: number) => void
  setShouldPlay: (shouldPlay: boolean) => void
  setIsPlaying: (isPlaying: boolean) => void
  setIsBuffering: (isBuffering: boolean) => void
  setIsLoading: (isLoading: boolean) => void
  setShouldCorrectPitch: (shouldCorrectPitch: boolean) => void
  setVolume: (volume: number) => void
}

export const usePlaybackStore = create<Playback>((set, get) => ({
  playbackInstance: null,
  playbackInstanceName: 'LOADING_STRING',
  muted: false,
  playbackInstancePosition: 0,
  playbackInstanceDuration: 0,
  shouldPlay: false,
  isPlaying: false,
  isBuffering: false,
  isLoading: false,
  shouldCorrectPitch: false,
  volume: 1.0,
  setPlaybackInstanceName: (playbackInstanceName: string) =>
    set({ playbackInstanceName }),
  setMuted: (muted: boolean) => set({ muted }),
  setPlaybackInstancePosition: (playbackInstancePosition: number) =>
    set({ playbackInstancePosition }),
  setPlaybackInstanceDuration: (playbackInstanceDuration: number) =>
    set({ playbackInstanceDuration }),
  setShouldPlay: (shouldPlay: boolean) => set({ shouldPlay }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setIsBuffering: (isBuffering: boolean) => set({ isBuffering }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setShouldCorrectPitch: (shouldCorrectPitch: boolean) =>
    set({ shouldCorrectPitch }),
  setVolume: (volume: number) => set({ volume }),
  setPlaybackInstance: (playbackInstance: Audio.Sound | null) => {
    set({ playbackInstance })
  },
}))
