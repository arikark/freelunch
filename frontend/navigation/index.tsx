/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import * as React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  Box,
  HStack,
  Image,
  PresenceTransition,
  Pressable,
  Text,
  VStack,
} from 'native-base'

import { PlayButton } from '../components/PlayButton/PlayButton'
import { usePlaybackStore } from '../hooks/usePlaybackStore'
import Episode from '../screens/Episode'
import Episodes from '../screens/Episodes'
import Favourites from '../screens/Favourites'
import { LoginScreen } from '../screens/Login'
import NotFoundScreen from '../screens/NotFoundScreen'
import Player from '../screens/Player'
import Podcasts from '../screens/Podcasts'
import Profile from '../screens/Profile'
import {
  AuthStackParamList,
  PodcastStackParamList,
  ProfileStackParamList,
  RootStackParamList,
  RootTabParamList,
} from '../types'
import LinkingConfiguration from './LinkingConfiguration'

const PodcastNavigator = createNativeStackNavigator<PodcastStackParamList>()
const AuthNavigator = createNativeStackNavigator<AuthStackParamList>()

function PlaceHolder() {
  return <Text>PlaceHolder</Text>
}

function AuthStack() {
  return (
    <AuthNavigator.Navigator initialRouteName="Login">
      <AuthNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthNavigator.Screen
        name="Register"
        component={PlaceHolder}
        options={{ headerShown: false }}
      />
    </AuthNavigator.Navigator>
  )
}
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
  const { track, isLoading } = usePlaybackStore()

  return (
    <>
      <PresenceTransition
        visible={!!track && !isLoading}
        initial={{
          scaleY: 0,
        }}
        animate={{
          scaleY: 1,
          transition: {
            duration: 450,
          },
        }}
      >
        {track && (
          <Pressable
            w="100%"
            bgColor="gray.800"
            onPress={() => navigation.navigate('Player')}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            py={3}
            px={4}
            position="absolute"
            bottom={71}
          >
            <HStack justifyContent="space-between">
              <Image
                source={{ uri: track.trackImageURL }}
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
            <PlayButton track={track} variant="icon" />
          </Pressable>
        )}
      </PresenceTransition>
      <HStack
        w="100%"
        bgColor="purple.900"
        position="absolute"
        bottom={0}
        paddingTop={2}
        paddingBottom={4}
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
              key={route.key}
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
const signedIn = false

function RootNavigator() {
  if (signedIn) {
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
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{ headerShown: false }}
      />
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
