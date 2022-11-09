/* eslint-disable no-nested-ternary */
import React from 'react'
import moment from 'moment'
import {
  Badge,
  Box,
  HStack,
  IBoxProps,
  Image,
  Pressable,
  Spacer,
  Text,
  VStack,
} from 'native-base'

export interface PodcastMenuItemProps extends IBoxProps {
  title: string
  category: string
  description: string
  image: string
  dateCreated: string
  durationInSeconds: number
}

export function PodcastMenuItem({
  title,
  category,
  description,
  image,
  dateCreated,
  durationInSeconds,
  ...props
}: PodcastMenuItemProps) {
  const formattedDuration = moment
    .duration(durationInSeconds, 'seconds')
    .humanize()

  // Get relative date
  const formattedDate = moment(dateCreated).fromNow()

  return (
    <Box alignItems="center" mt={4} {...props}>
      <Pressable maxW="96">
        {({ isHovered, isFocused, isPressed }) => {
          return (
            <Box
              bg={
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
              p="5"
              rounded="8"
              shadow={3}
              borderWidth="1"
              borderColor="coolGray.300"
            >
              <HStack alignItems="center">
                <Badge colorScheme="darkBlue" variant="solid" rounded="4">
                  {category}
                </Badge>
                <Spacer />
                <Text fontSize={10} color="coolGray.800">
                  {`${formattedDate} • ${formattedDuration}`}
                </Text>
              </HStack>
              <HStack mt={2}>
                <Image
                  borderRadius={8}
                  source={{
                    uri: image,
                  }}
                  alt="Alternate Text"
                  size="xl"
                />
                <VStack ml="4" maxW="60%">
                  <Text color="coolGray.800" fontWeight="medium" fontSize="xl">
                    {title}
                  </Text>
                  <Text
                    mt="2"
                    fontSize="sm"
                    color="coolGray.700"
                    numberOfLines={4}
                    isTruncated
                  >
                    {description}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          )
        }}
      </Pressable>
    </Box>
  )
}
