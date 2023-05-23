import { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Button, Spinner } from 'native-base'

import { usePlayback } from '../../hooks/usePlayback'
import { Track, usePlaybackStore } from '../../hooks/usePlaybackStore'

const Icon = ({
  isLoading,
  isTrackLoaded,
  isPaused,
}: {
  isLoading: boolean
  isTrackLoaded: boolean
  isPaused: boolean
}) => {
  if (isLoading && !isTrackLoaded) {
    return <Spinner size="sm" color="white" />
  }
  return !isPaused && isTrackLoaded ? (
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
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)

  const { playbackInstance, isPaused, loadedSoundURL, isLoading } =
    usePlaybackStore()
  const { onPlayPausePressed } = usePlayback()
  const isTrackLoaded = loadedSoundURL === track.trackURL

  const onPress = () => {
    onPlayPausePressed(track)
  }

  // check if the specific button was clicked

  return (
    <Button
      variant={variant === 'icon' ? 'ghost' : 'solid'}
      accessibilityLabel={track.trackURL}
      colorScheme="blue"
      rounded="2xl"
      onPress={onPress}
      isLoading={isLoading}
      leftIcon={
        !isPaused && isTrackLoaded ? (
          <AntDesign name="pausecircle" size={18} color="white" />
        ) : (
          <AntDesign name="play" size={18} color="white" />
        )
      }
    />
  )
}
