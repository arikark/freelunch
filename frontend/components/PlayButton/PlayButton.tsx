import { AntDesign } from '@expo/vector-icons'
import { Button, IconButton, Spinner } from 'native-base'

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
  if (isLoading) {
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
  // const [isLoading, setIsLoading] = useState(false)

  const { playbackInstance, isPaused, loadedSoundURL, isLoading } =
    usePlaybackStore()
  const { onPlayPausePressed } = usePlayback()
  const isTrackLoaded = loadedSoundURL === track.trackURL

  const onPress = () => {
    onPlayPausePressed(track)
  }

  return variant === 'button' ? (
    <Button
      colorScheme="blue"
      rounded="2xl"
      onPress={onPress}
      isLoading={isLoading}
    >
      {isPaused ? 'Play' : 'Pause'}
    </Button>
  ) : (
    <IconButton
      accessibilityLabel="Play"
      icon={
        <Icon
          isLoading={isLoading}
          isTrackLoaded={isTrackLoaded}
          isPaused={isPaused}
        />
      }
      size="md"
      _pressed={{ bg: 'coolGray.500' }}
      onPress={onPress}
    />
  )
}
