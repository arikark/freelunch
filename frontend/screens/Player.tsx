import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Audio, AVPlaybackStatus } from 'expo-av'
import {
  Box,
  ChevronDownIcon,
  Heading,
  HStack,
  IconButton,
  Image,
  Slider,
  Text,
  VStack,
} from 'native-base'

import { usePlaybackStore } from '../hooks/store'
import { PodcastStackScreenProps } from '../types'

const PlaybackSlider = ({
  setOnChangeValue,
}: {
  setOnChangeValue: (v: number) => void
}) => {
  return (
    <Box alignItems="center" w="100%">
      <Slider
        defaultValue={70}
        colorScheme="cyan"
        onChange={(v) => {
          setOnChangeValue(Math.floor(v))
        }}
      >
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
    </Box>
  )
}

type EpisodeProps = {
  podcastTitle: string
  episodeTitle: string
  description: string
  dateCreated: string
  durationInSeconds: number
  secondsPlayed: number
  image: string
}

const episode: EpisodeProps = {
  podcastTitle: 'The Daily',
  episodeTitle: 'How Democrats Can Win',
  description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. `,
  dateCreated: '2022-11-09 00:00:00',
  durationInSeconds: 7200,
  secondsPlayed: 6023,
  image: 'https://wallpaperaccess.com/full/317501.jpg',
}

export default function Player({
  navigation,
}: PodcastStackScreenProps<'Player'>) {
  const title = 'How Democrats Can Win'
  const author = 'The Daily'
  const audioUrl =
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  const description = `Lorem ipsum do`

  const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] =
    useState<boolean>(false)

  const [isSeeking, setIsSeeking] = useState<boolean>(false)
  const playback = usePlaybackStore()

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
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

  const loadNewPlaybackInstance = async (playing: boolean) => {
    // check if the song that is being played is the same as the one that is being requested
    // if (playback.playbackObject?.sound !== null) {
    //   await playback.playbackObject?.sound.unloadAsync()
    //   playback.setPlaybackObject(null)
    // }

    if (!playback.playbackObject?.sound) {
      const source = { uri: audioUrl }
      const initialStatus = {
        shouldPlay: playing,
        shouldCorrectPitch: playback.shouldCorrectPitch,
      }

      const playbackObject = await Audio.Sound.createAsync(
        source,
        initialStatus,
        onPlaybackStatusUpdate
      )
      playback.setPlaybackObject(playbackObject)
    }
  }

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    })

    loadNewPlaybackInstance(playback.isPlaying)
  }, [])

  const onPlayPausePressed = () => {
    if (playback.playbackObject?.sound != null) {
      if (playback.isPlaying) {
        playback.playbackObject?.sound.pauseAsync().then(() => {
          console.log('paused')
          playback.setIsPlaying(false)
        })
      } else {
        playback.playbackObject.sound.playAsync().then(() => {
          console.log('playing')
          playback.setIsPlaying(true)
        })
      }
    }
  }

  // const onSeekSliderValueChange = () => {
  //   if (playback.playbackInstance != null && !isSeeking) {
  //     setIsSeeking(true)
  //     setShouldPlayAtEndOfSeek(playback.shouldPlay)
  //     playback.playbackInstance.pauseAsync()
  //   }
  // }
  // const onSeekSliderSlidingComplete = async (value: number) => {
  //   if (playback.playbackInstance != null) {
  //     setIsSeeking(false)
  //     const seekPosition = value * playback.playbackInstanceDuration
  //     if (shouldPlayAtEndOfSeek) {
  //       playback.playbackInstance.playFromPositionAsync(seekPosition)
  //     } else {
  //       playback.playbackInstance.setPositionAsync(seekPosition)
  //     }
  //   }
  // }
  // const getSeekSliderPosition = () => {
  //   if (
  //     playback.playbackInstance != null &&
  //     playback.playbackInstancePosition != null &&
  //     playback.playbackInstanceDuration != null
  //   ) {
  //     return (
  //       playback.playbackInstancePosition / playback.playbackInstanceDuration
  //     )
  //   }
  //   return 0
  // }
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

  // const getTimestamp = () => {
  //   if (
  //     playback.playbackInstance != null &&
  //     playback.playbackInstancePosition != null &&
  //     playback.playbackInstanceDuration != null
  //   ) {
  //     return `${getMMSSFromMillis(
  //       playback.playbackInstancePosition
  //     )} / ${getMMSSFromMillis(playback.playbackInstanceDuration)}`
  //   }
  //   return ''
  // }
  const goTenSecondForwardOrBackward = (value: number) => {
    playback.playbackObject?.sound.setStatusAsync({
      positionMillis: playback.playbackInstancePosition + value,
    })
  }

  return (
    <Box h="100%" paddingX={3} safeAreaTop safeAreaX variant="layout">
      <VStack minH="90%" alignItems="center">
        <HStack width="100%" alignItems="center" justifyContent="flex-start">
          <IconButton
            icon={<ChevronDownIcon as="Hide player page" />}
            onPress={() => navigation.goBack()}
            variant="ghost"
            colorScheme="white"
            mr="15%"
          />

          <Box alignItems="center">
            <Text>PLAYING FROM PODCAST</Text>
            <Heading>{episode.podcastTitle}</Heading>
          </Box>
        </HStack>
        <Image
          borderRadius={2}
          source={{
            uri: episode.image,
          }}
          alt="Alternate Text"
          size="2xl"
          alignSelf="center"
          marginTop={15}
        />
        <Box marginTop={6}>
          <Heading>{episode.episodeTitle}</Heading>
          <Text>{episode.podcastTitle}</Text>
        </Box>
        <Box
          flexDirection="row"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <IconButton onPress={() => goTenSecondForwardOrBackward(-10000)}>
            <AntDesign name="stepbackward" size={20} color="white" />
          </IconButton>
          {playback.playbackObject?.status.isLoaded && (
            <IconButton
              onPress={() => onPlayPausePressed()}
              accessibilityLabel="Play"
              icon={
                playback.isPlaying ? (
                  <AntDesign name="pausecircle" size={60} color="white" />
                ) : (
                  <AntDesign name="play" size={60} color="white" />
                )
              }
              size="md"
              _pressed={{ bg: 'coolGray.500' }}
            />
          )}

          <IconButton onPress={() => goTenSecondForwardOrBackward(10000)}>
            <AntDesign name="stepforward" size={20} color="white" />
          </IconButton>
        </Box>
        <PlaybackSlider />
      </VStack>
    </Box>
  )
}
