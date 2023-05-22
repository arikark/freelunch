import { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { IconButton, Spinner } from 'native-base'

import { usePlayback } from '../../hooks/usePlayback'
import { Track, usePlaybackStore } from '../../hooks/usePlaybackStore'

export function PlayButton({ track }: { track: Track }) {
  const [isLoading, setIsLoading] = useState(false)

  const { isPlaying, playbackInstance } = usePlaybackStore()
  const { onPlayPausePressed } = usePlayback()
  const isLoaded = playbackInstance?.status.isLoaded

  useEffect(() => {
    if (isLoaded) {
      setIsLoading(false)
    }
  }, [isLoaded])
  return isLoading ? (
    <Spinner size="sm" />
  ) : (
    <IconButton
      accessibilityLabel="Play"
      icon={
        isPlaying ? (
          <AntDesign name="pausecircle" size={18} color="white" />
        ) : (
          <AntDesign name="play" size={18} color="white" />
        )
      }
      size="md"
      _pressed={{ bg: 'coolGray.500' }}
      onPress={() => {
        if (!isLoaded) {
          setIsLoading(true)
        }
        onPlayPausePressed(track)
      }}
    />
  )
}
