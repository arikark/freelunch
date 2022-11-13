/* eslint-disable no-nested-ternary */
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import {
  HStack,
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

  return (
    <Pressable maxW="96" {...props}>
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <VStack
            mt={2}
            borderBottomColor="gray.600"
            pb="12px"
            borderBottomWidth={1}
            h="136px"
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
            <Text fontSize={10}>
              {`${formattedDate} • ${formattedDuration}`}
            </Text>
          </VStack>
        )
      }}
    </Pressable>
  )
}
