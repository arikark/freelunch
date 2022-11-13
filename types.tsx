/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type PodcastStackParamList = {
  Podcasts: undefined
  Episodes: { title: string }
  Player: undefined
  Episode: { title: string }
}

export type RootTabParamList = {
  PodcastStack: NavigatorScreenParams<PodcastStackParamList> | undefined
  ProfileTab: undefined
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  Modal: undefined
  NotFound: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >

export type PodcastStackScreenProps<
  Screen extends keyof PodcastStackParamList
> = CompositeScreenProps<
  NativeStackScreenProps<PodcastStackParamList, Screen>,
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, 'PodcastStack'>,
    NativeStackScreenProps<RootStackParamList>
  >
>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}

    interface RootParamList extends RootTabParamList {}

    interface RootParamList extends PodcastStackParamList {}
  }
}
