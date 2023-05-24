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
  Episodes: { podcastId: string }
  Player: undefined
  Episode: { title: string; episodeId: string }
}
export type ProfileStackParamList = {
  Profile: undefined
  Favourites: undefined
}

export type AuthStackParamList = {
  Login: undefined
  Register: undefined
}

export type RootTabParamList = {
  PodcastStack: NavigatorScreenParams<PodcastStackParamList> | undefined
  ProfileStack: NavigatorScreenParams<ProfileStackParamList> | undefined
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  AuthStack: NavigatorScreenParams<AuthStackParamList> | undefined
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
export type ProfileStackScreenProps<
  Screen extends keyof ProfileStackParamList
> = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, Screen>,
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, 'ProfileStack'>,
    NativeStackScreenProps<RootStackParamList>
  >
>

// There will be no tab bar if the user is not logged in
export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, Screen>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}

    interface RootParamList extends RootTabParamList {}

    interface RootParamList extends PodcastStackParamList {}

    interface RootParamList extends AuthStackParamList {}
  }
}
