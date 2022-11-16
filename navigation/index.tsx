/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useColorModeValue } from 'native-base'

import Episode from '../screens/Episode'
import Episodes from '../screens/Episodes'
import NotFoundScreen from '../screens/NotFoundScreen'
import Player from '../screens/Player'
import Podcasts from '../screens/Podcasts'
import ProfileTab from '../screens/Profile'
import {
  PodcastStackParamList,
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types'
import LinkingConfiguration from './LinkingConfiguration'

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

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const backgroundColor = useColorModeValue('#312e81', '#312e81')
  return (
    <BottomTab.Navigator
      initialRouteName="PodcastStack"
      screenOptions={{
        tabBarStyle: {
          backgroundColor,
          opacity: 0.9,
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarActiveTintColor: 'white',
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="PodcastStack"
        component={PodcastsStack}
        options={({ navigation }: RootTabScreenProps<'PodcastStack'>) => ({
          title: 'Podcasts',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="podcast" color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={{
          title: 'My Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
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
