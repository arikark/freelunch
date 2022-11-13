/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import {
  HStack,
  IconButton,
  Image,
  IPressableProps,
  Pressable,
  Text,
  VStack,
} from 'native-base'

export interface EpisodeMenuItemProps extends IPressableProps {
  title: string
  description: string
  image: string
  dateCreated: string
  durationInSeconds: number
}

export function EpisodeMenuItem({
  title,
  description,
  image,
  dateCreated,
  durationInSeconds,
  ...props
}: EpisodeMenuItemProps) {
  const formattedDuration = moment
    .duration(durationInSeconds, 'seconds')
    .humanize()

  // Get relative date
  const formattedDate = moment(dateCreated).fromNow()
  const { navigate } = useNavigation()
  const [isPlaying, setIsPlaying] = useState(false)

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
                  uri: image,
                }}
                alt="Alternate Text"
                size="xs"
                mr="12px"
              />
              <Text fontWeight="medium" fontSize="md" flex={1}>
                {title}
              </Text>
            </HStack>
            <Text mt="2" fontSize="sm" numberOfLines={2} isTruncated>
              {description}
            </Text>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize={10}>
                {`${formattedDate} • ${formattedDuration}`}
              </Text>
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
                onPress={() => setIsPlaying(!isPlaying)}
              />
            </HStack>
          </VStack>
        )
      }}
    </Pressable>
  )
}
