/* eslint-disable no-nested-ternary */
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import {
  Box,
  HStack,
  Image,
  IPressableProps,
  Pressable,
  Text,
  VStack,
} from 'native-base'

import { PlayButton } from '../PlayButton/PlayButton'

export interface EpisodeMenuItemProps extends IPressableProps {
  name: string
  description: string
  imageURL: string
  dateCreated: string
  durationInSeconds: number
  audioURL: string
  _id: string
  podcastName: string
}

export function EpisodeMenuItem({
  name,
  description,
  imageURL,
  dateCreated,
  durationInSeconds,
  audioURL,
  _id: audioId,
  podcastName,
  ...props
}: EpisodeMenuItemProps) {
  const formattedDuration = moment
    .duration(durationInSeconds, 'seconds')
    .humanize()

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
              <Box minH="40px" justifyContent="center" alignItems="center">
                <PlayButton
                  variant="icon"
                  track={{
                    trackURL: audioURL,
                    trackName: name,
                    trackId: audioId,
                    trackImageURL: imageURL,
                    collectionName: podcastName,
                  }}
                />
              </Box>
            </HStack>
          </VStack>
        )
      }}
    </Pressable>
  )
}
