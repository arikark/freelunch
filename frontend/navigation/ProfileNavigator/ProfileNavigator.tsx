import { Animated, View } from 'react-native'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs'
import { Center, Pressable, Text } from 'native-base'

import { Layout } from '../../components/Layout'

function TopTabBar({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label = options.title !== undefined ? options.title : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate(route.name, { merge: true })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            flexGrow={1}
            alignItems="center"
            backgroundColor={isFocused ? 'teal.100' : 'transparent'}
            rounded="lg"
            p={1}
          >
            <Animated.Text>
              <Text
                color={isFocused ? 'gray.800' : 'muted.100'}
                opacity={isFocused ? 1 : 0.5}
              >
                {label}
              </Text>
            </Animated.Text>
          </Pressable>
        )
      })}
    </View>
  )
}
const Overview = () => (
  <Center h="100%">
    <Text>Overview</Text>
  </Center>
)
const CPDRecord = () => (
  <Center h="100%">
    <Text>Record</Text>
  </Center>
)

const Certificates = () => (
  <Center h="100%">
    <Text>Certificates</Text>
  </Center>
)

const Compliance = () => (
  <Center h="100%">
    <Text>Compliance</Text>
  </Center>
)

const Tab = createMaterialTopTabNavigator()
export function ProfileNavigator() {
  return (
    <Layout px={2} py={2}>
      <Tab.Navigator
        tabBar={(props) => <TopTabBar {...props} />}
        initialRouteName="Overview"
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
      >
        <Tab.Screen name="Overview" component={Overview} />
        <Tab.Screen name="Record" component={CPDRecord} />
        <Tab.Screen name="Certificates" component={Certificates} />
        <Tab.Screen name="Compliance" component={Compliance} />
      </Tab.Navigator>
    </Layout>
  )
}
