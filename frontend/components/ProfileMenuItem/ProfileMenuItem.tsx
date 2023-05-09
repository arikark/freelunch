import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Box, HStack, Icon, Pressable } from 'native-base'

type ProfileMenuItemProps = {
  label: string
  iconName: typeof AntDesign['name']
  onPress: () => void
}

export function ProfileMenuItem({
  label,
  iconName,
  onPress,
}: ProfileMenuItemProps) {
  return (
    <Pressable
      h="25%"
      borderColor="white"
      borderBottomWidth={1}
      justifyContent="center"
      onPress={onPress}
    >
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <HStack
            alignItems="center"
            style={{
              transform: [
                {
                  scale: isPressed ? 0.98 : 1,
                },
              ],
            }}
          >
            <Box>
              <Icon
                as={AntDesign}
                name={iconName}
                color="white"
                size={7}
                marginX={2}
              />
            </Box>
            <Box>{label}</Box>
          </HStack>
        )
      }}
    </Pressable>
  )
}
