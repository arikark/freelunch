/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import {
  HStack,
  IconButton,
  Image,
  IPressableProps,
  Pressable,
  Spinner,
  Text,
  VStack,
} from 'native-base'

import { usePlayback } from '../../hooks/usePlayback'
import { usePlaybackStore } from '../../hooks/usePlaybackStore'

export interface EpisodeMenuItemProps extends IPressableProps {
  name: string
  description: string
  imageURL: string
  dateCreated?: string
  durationInSeconds?: number
  audioURL: string
}

export function EpisodeMenuItem({
  name,
  description,
  imageURL,
  dateCreated,
  durationInSeconds,
  audioURL,
  ...props
}: EpisodeMenuItemProps) {
  const formattedDuration = moment
    .duration(durationInSeconds, 'seconds')
    .humanize()
  const [isLoading, setIsLoading] = useState(false)

  const { setTrackURL, isPlaying, playbackInstance } = usePlaybackStore()
  const { onPlayPausePressed } = usePlayback()
  const isLoaded = playbackInstance?.status.isLoaded

  useEffect(() => {
    if (isLoaded) {
      setIsLoading(false)
    }
  }, [isLoaded])

  // Get relative date
  const formattedDate = moment(dateCreated).fromNow()
  const { navigate } = useNavigation()

  return (
    <Pressable {...props}>
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <VStack
            mt={2}
            minH="136px"
            justifyContent="space-between"
            color="white"
            style={{
              transform: [
                {
                  scale: isPressed ? 0.98 : 1,
                },
              ],
            }}
          >
            <HStack mt={2} alignItems="center" textAlign="left">
              <Image
                borderRadius={8}
                source={{
                  uri: imageURL,
                }}
                alt="Alternate Text"
                size="xs"
                mr="12px"
              />
              <Text fontWeight="medium" fontSize="md" flex={1}>
                {name}
              </Text>
            </HStack>
            <Text mt="2" fontSize="sm" numberOfLines={2} isTruncated>
              {description}
            </Text>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize={10}>
                {`${formattedDate} • ${formattedDuration}`}
              </Text>

              {isLoading ? (
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
                    onPlayPausePressed(audioURL)
                  }}
                />
              )}
            </HStack>
          </VStack>
        )
      }}
    </Pressable>
  )
}
