import React, { useState } from 'react'
import { Animated, Dimensions, Pressable, StatusBar } from 'react-native'
import {
  NavigationState,
  Route,
  SceneMap,
  SceneRendererProps,
  TabView,
} from 'react-native-tab-view'
import { Box, Center, Text } from 'native-base'

import { Layout } from '../components/Layout'
import { ProfileStackScreenProps } from '../types'

const FirstRoute = () => (
  <Center flex={1} my="4">
    This is Tab 1
  </Center>
)

const SecondRoute = () => (
  <Center flex={1} my="4">
    This is Tab 2
  </Center>
)

const ThirdRoute = () => (
  <Center flex={1} my="4">
    This is Tab 3
  </Center>
)

const FourthRoute = () => (
  <Center flex={1} my="4">
    This is Tab 4{' '}
  </Center>
)

const initialLayout = {
  width: Dimensions.get('window').width,
}
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
})

const renderTabBar = (
  props: SceneRendererProps & {
    navigationState: NavigationState<Route>
  }
) => {
  return (
    <Box flexDirection="row">
      {props.navigationState.routes.map((route, i) => {
        const opacity = i === props.navigationState.index ? 1 : 0.5
        const fontSize = i === props.navigationState.index ? 'md' : 'sm'

        return (
          <Box
            key={route.key}
            alignItems="center"
            pt={2}
            pb={1}
            flexGrow={1}
            opacity={opacity}
            borderColor="gray.300"
            justifyContent="center"
          >
            <Pressable
              onPress={() => {
                props.jumpTo(route.key)
              }}
            >
              <Animated.Text>
                <Text fontSize={fontSize}>{route.title}</Text>
              </Animated.Text>
            </Pressable>
          </Box>
        )
      })}
    </Box>
  )
}

export default function Profile({
  navigation,
}: ProfileStackScreenProps<
  'Overview' | 'Record' | 'Certificates' | 'Compliance'
>) {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    {
      key: 'first',
      title: 'Overview',
    },
    {
      key: 'second',
      title: 'Record',
    },
    {
      key: 'third',
      title: 'Certificates',
    },
    {
      key: 'fourth',
      title: 'Compliance',
    },
  ])

  return (
    <Layout paddingX={0}>
      <TabView
        navigationState={{
          index,
          routes,
        }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={{
          marginTop: StatusBar.currentHeight,
        }}
      />
    </Layout>
  )
}
