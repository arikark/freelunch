/* eslint-disable no-nested-ternary */
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import {
  Badge,
  Card,
  HStack,
  Image,
  IPressableProps,
  Pressable,
  Spacer,
  Text,
  VStack,
} from 'native-base'

export interface PodcastMenuItemProps extends IPressableProps {
  title: string
  category: string
  description: string
  image: string
  latestEpisodeDurationInSeconds: number
  latestEpisodeDateCreated: string
}

export function PodcastMenuItem({
  title,
  category,
  description,
  image,
  latestEpisodeDurationInSeconds,
  latestEpisodeDateCreated,
  ...props
}: PodcastMenuItemProps) {
  const formattedDuration = moment
    .duration(latestEpisodeDurationInSeconds, 'seconds')
    .humanize()

  // Get relative date
  const formattedDate = moment(latestEpisodeDateCreated).fromNow()
  const { navigate } = useNavigation()

  return (
    <Pressable onPress={() => navigate('Episodes', { title })} {...props}>
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <Card
            bgColor={
              isPressed
                ? 'coolGray.200'
                : isHovered
                ? 'coolGray.200'
                : 'coolGray.100'
            }
            style={{
              transform: [
                {
                  scale: isPressed ? 0.96 : 1,
                },
              ],
            }}
            justifyContent="space-between"
            mt={4}
          >
            <HStack alignItems="center">
              <Badge colorScheme="darkBlue" variant="solid" rounded={8} mb={4}>
                {category}
              </Badge>
              <Spacer />
              <Text fontSize={10} color="coolGray.800">
                {`${formattedDate} • ${formattedDuration}`}
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Image
                borderRadius={8}
                source={{
                  uri: image,
                }}
                alt="Alternate Text"
                size="xl"
                mr={3}
              />
              <VStack justifyContent="space-between" flex={1}>
                <Text color="coolGray.800" fontWeight="medium" fontSize="xl">
                  {title}
                </Text>
                <Text
                  maxW="200px"
                  fontSize="sm"
                  color="coolGray.700"
                  numberOfLines={4}
                  isTruncated
                >
                  {description}
                </Text>
              </VStack>
            </HStack>
          </Card>
        )
      }}
    </Pressable>
  )
}
