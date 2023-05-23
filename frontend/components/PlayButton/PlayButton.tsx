import { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Button, IconButton, Spinner } from 'native-base'

import { usePlayback } from '../../hooks/usePlayback'
import { Track, usePlaybackStore } from '../../hooks/usePlaybackStore'

const Icon = ({
  isLoading,
  isPlaying,
}: {
  isLoading: boolean
  isPlaying: boolean
}) => {
  if (isLoading) {
    return <Spinner size="sm" color="white" />
  }
  return isPlaying ? (
    <AntDesign name="pausecircle" size={18} color="white" />
  ) : (
    <AntDesign name="play" size={18} color="white" />
  )
}
export function PlayButton({
  track,
  variant,
}: {
  track: Track
  variant?: 'icon' | 'button'
}) {
  const [isLoading, setIsLoading] = useState(false)

  const { isPlaying, playbackInstance } = usePlaybackStore()
  const { onPlayPausePressed } = usePlayback()
  const isLoaded = playbackInstance?.status.isLoaded

  useEffect(() => {
    if (isLoaded) {
      setIsLoading(false)
    }
  }, [isLoaded])

  const onPress = () => {
    if (!isLoaded) {
      setIsLoading(true)
    }
    onPlayPausePressed(track)
  }

  return variant === 'button' ? (
    <Button
      colorScheme="blue"
      rounded="2xl"
      onPress={onPress}
      isLoading={isLoading}
    >
      {isPlaying ? 'Pause' : 'Play'}
    </Button>
  ) : (
    <IconButton
      accessibilityLabel="Play"
      icon={<Icon isLoading={isLoading} isPlaying={isPlaying} />}
      size="md"
      _pressed={{ bg: 'coolGray.500' }}
      onPress={onPress}
    />
  )
}
