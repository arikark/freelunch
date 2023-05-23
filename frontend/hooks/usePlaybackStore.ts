import { Audio } from 'expo-av'
import { create } from 'zustand'

export type Track = {
  trackName: string
  trackURL: string
  trackId: string
  trackImageURL: string
  collectionName: string
}

interface Playback {
  setPlaybackInstance: (playbackInstance: Audio.SoundObject | null) => void
  playbackInstance: Audio.SoundObject | null
  muted: boolean
  playbackInstancePosition: number
  playbackInstanceDuration: number
  shouldPlay: boolean
  shouldCorrectPitch: boolean
  volume: number
  setMuted: (muted: boolean) => void
  setPlaybackInstancePosition: (playbackInstancePosition: number) => void
  setPlaybackInstanceDuration: (playbackInstanceDuration: number) => void
  setShouldPlay: (shouldPlay: boolean) => void
  setShouldCorrectPitch: (shouldCorrectPitch: boolean) => void
  setVolume: (volume: number) => void
  setIsBuffering: (isBuffering: boolean) => void
  isBuffering: boolean
  track: Track | null
  setTrack: (track: Track) => void
  isPaused: boolean
  setIsPaused: (isPaused: boolean) => void
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
  loadedSoundURL: string | null
  setLoadedSoundURL: (url: string) => void
}

export const usePlaybackStore = create<Playback>((set, get) => ({
  playbackInstance: null,
  muted: false,
  playbackInstancePosition: 0,
  playbackInstanceDuration: 0,
  shouldPlay: false,
  isPlaying: false,
  isBuffering: false,
  isLoading: false,
  shouldCorrectPitch: false,
  volume: 1.0,
  setIsBuffering: (isBuffering: boolean) => set({ isBuffering }),
  isPaused: false,
  setIsPaused: (isPaused: boolean) => set({ isPaused }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setMuted: (muted: boolean) => set({ muted }),
  setPlaybackInstancePosition: (playbackInstancePosition: number) =>
    set({ playbackInstancePosition }),
  setPlaybackInstanceDuration: (playbackInstanceDuration: number) =>
    set({ playbackInstanceDuration }),
  setShouldPlay: (shouldPlay: boolean) => set({ shouldPlay }),
  setShouldCorrectPitch: (shouldCorrectPitch: boolean) =>
    set({ shouldCorrectPitch }),
  setVolume: (volume: number) => set({ volume }),
  setPlaybackInstance: (playbackInstance: Audio.SoundObject | null) => {
    set({ playbackInstance })
  },
  loadedSoundURL: null,
  setLoadedSoundURL: (loadedSoundURL: string) => {
    set({ loadedSoundURL })
  },

  track: null,
  setTrack: (track: Track) => set({ track }),
}))
