/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import * as React from 'react'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  Box,
  HStack,
  IconButton,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base'

import Episode from '../screens/Episode'
import Episodes from '../screens/Episodes'
import NotFoundScreen from '../screens/NotFoundScreen'
import Player from '../screens/Player'
import Podcasts from '../screens/Podcasts'

import {
  PodcastStackParamList,
  ProfileStackParamList,
  RootStackParamList,
  RootTabParamList,
} from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import Profile from '../screens/Profile'
import Favourites from '../screens/Favourites'

const PodcastNavigator = createNativeStackNavigator<PodcastStackParamList>()

function PodcastsStack() {
  return (
    <PodcastNavigator.Navigator initialRouteName="Podcasts">
      <PodcastNavigator.Screen
        name="Podcasts"
        component={Podcasts}
        options={{ headerShown: false }}
      />
      <PodcastNavigator.Screen
        name="Episodes"
        component={Episodes}
        options={{ headerShown: false }}
      />
      <PodcastNavigator.Screen
        name="Episode"
        component={Episode}
        options={{ headerShown: false }}
      />
    </PodcastNavigator.Navigator>
  )
}
const ProfileNavigator = createNativeStackNavigator<ProfileStackParamList>()

function ProfileStack() {
  return (
    <ProfileNavigator.Navigator initialRouteName="Profile">
      <ProfileNavigator.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <ProfileNavigator.Screen
        name="Favourites"
        component={Favourites}
        options={{
          headerShown: false,
        }}
      />
    </ProfileNavigator.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
  opacity?: number
}) {
  const { color, opacity } = props
  return (
    <FontAwesome
      size={30}
      style={{
        marginBottom: 3,
        opacity,
        color,
      }}
      {...props}
    />
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

const BottomTab = createBottomTabNavigator<RootTabParamList>()

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <>
      <Pressable
        w="100%"
        bgColor="gray.800"
        onPress={() => navigation.navigate('Player')}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        py={1}
        px={4}
        position="absolute"
        bottom={70}
      >
        <HStack justifyContent="space-between">
          <Image
            source={{ uri: 'https://wallpaperaccess.com/full/317501.jpg' }}
            alt="image base"
            borderRadius={8}
            size="xs"
            mr={4}
          />
          <VStack>
            <Text bold>How Democrats Can Win</Text>
            <Text color="gray.300">The Daily</Text>
          </VStack>
        </HStack>
        <IconButton
          p="0"
          accessibilityLabel="Play"
          icon={
            true ? (
              <AntDesign name="play" size={24} color="white" />
            ) : (
              <AntDesign name="pause" size={24} color="white" />
            )
          }
          size="md"
          _pressed={{ bg: 'coolGray.500' }}
        />
      </Pressable>

      <HStack
        w="100%"
        bgColor="purple.900"
        position="absolute"
        bottom={0}
        py={2}
        opacity="0.9"
        justifyContent="space-evenly"
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]

          const isFocused = state.index === index

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }

          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={{ flex: 1 }}
            >
              <Box
                alignItems="center"
                justifyContent="center"
                h="100%"
                w="100%"
              >
                {options.tabBarIcon &&
                  options.tabBarIcon({
                    color: 'white',
                    focused: isFocused,
                    size: 30,
                  })}

                <Text opacity={isFocused ? 1 : 0.5}>{options.title}</Text>
              </Box>
            </Pressable>
          )
        })}
      </HStack>
    </>
  )
}

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="PodcastStack"
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="PodcastStack"
        options={{
          title: 'Podcasts',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="podcast"
              color={color}
              opacity={focused ? 1 : 0.5}
            />
          ),
        }}
        component={PodcastsStack}
      />
      <BottomTab.Screen
        name="ProfileStack"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="user" color={color} opacity={focused ? 1 : 0.5} />
          ),
        }}
        component={ProfileStack}
      />
    </BottomTab.Navigator>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <PodcastNavigator.Group screenOptions={{ presentation: 'modal' }}>
        <PodcastNavigator.Screen
          name="Player"
          component={Player}
          options={{ headerShown: false }}
        />
      </PodcastNavigator.Group>
    </Stack.Navigator>
  )
}

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  )
}
