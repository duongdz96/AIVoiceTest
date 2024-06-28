import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';

import LoginPage from '~/screens/Authentication/LoginPage';
import SignUpPage from '~/screens/Authentication/SignUpPage';
import DetailHistory from '~/screens/History/DetailHistory';
import LibraryPage from '~/screens/LibraryPage/LibraryPage';
import RecordVoice from '~/screens/LibraryPage/RecordVoice';
import NotificationPage from '~/screens/NotificationPage/NotificationPage';
import FirstOnBoardingPage from '~/screens/OnBoardingPage/FirstOnBoardingPage';
import LastOnBoardingPage from '~/screens/OnBoardingPage/LastOnBoardingPage';
import OnBoardingPage from '~/screens/OnBoardingPage/OnBoardingPage';
import SelectLanguageOnboardingPage from '~/screens/OnBoardingPage/SelectLanguageOnboardingPage';
import PremiumPage from '~/screens/PremiumPage';
import CreateNewVoice from '~/screens/Record/CreateNewVoice';
import CreateVoiceLoading from '~/screens/Record/CreateVoiceLoading';
import RecordVoiceCreate from '~/screens/Record/RecordVoiceCreate';
import RecordVoiceGenerate from '~/screens/Record/RecordVoiceGenerate';
import SearchVoice from '~/screens/SearchVoice/SearchVoice';
import VoiceGenerator from '~/screens/SearchVoice/VoiceGenerator';
import VoiceLoading from '~/screens/SearchVoice/VoiceLoading';
import SelectLanguagePage from '~/screens/SettingPage/SelectLanguagePage';
import SettingPage from '~/screens/SettingPage/SettingPage';
import SplashPage from '~/screens/SplashPage/SplashPage';
import TestPage from '~/screens/TestPage';
import TestPremium from '~/screens/TestPremium';
import CreateText from '~/screens/TextToVoice/CreateText';
import WebViewPage from '~/screens/WebViewPage';

import BottomTabNavigator, {
  BottomTabNavigatorProps,
} from './BottomTabNavigator';

export type RootNavigatorProps = {
  navigate(arg0: string): unknown;
  SplashPage: undefined;
  TestPage: undefined;
  BottomTabNavigator: NavigatorScreenParams<BottomTabNavigatorProps>;
  OnBoardingPage: undefined;
  FirstOnBoardingPage: undefined;
  LastOnBoardingPage: undefined;
  SettingPage: undefined;
  LoginPage: undefined;
  SignUpPage: undefined;
  SelectLanguagePage: undefined;
  NotificationPage: undefined;
  SelectLanguageOnboardingPage: undefined;
  WebViewPage: { uri: string } | undefined;
  CreateNewVoice: undefined;
  PremiumPage: undefined;
  CreateText: undefined;
  SearchVoice: undefined;
  RecordVoice: undefined;
  VoiceGenerator: undefined;
  VoiceLoading: undefined;
  RecordVoiceCreate: undefined;
  DetailHistory: undefined;
  LibraryPage: undefined;
  CreateVoiceLoading: undefined;
  RecordVoiceGenerate: undefined;
  TestPremium: undefined;
};

export type RootNavigatorNavProps = StackNavigationProp<RootNavigatorProps>;

export type BottomTabNavigatorNavProps = StackNavigationProp<
  RootNavigatorProps,
  'BottomTabNavigator'
>;
export type DetailHistoryRouteProps = RouteProp<
  RootNavigatorProps,
  'DetailHistory'
>;
export type VoiceLoadingRouteProps = RouteProp<
  RootNavigatorProps,
  'VoiceLoading'
>;
export type VoiceGeneratorRouteProps = RouteProp<
  RootNavigatorProps,
  'VoiceGenerator'
>;
export type RecordVoiceCreateRouteProps = RouteProp<
  RootNavigatorProps,
  'RecordVoiceCreate'
>;
export type CreateVoiceLoadingRouteProps = RouteProp<
  RootNavigatorProps,
  'CreateVoiceLoading'
>;
export type RecordVoiceGenerateRouteProps = RouteProp<
  RootNavigatorProps,
  'RecordVoiceGenerate'
>;

export type RootRouteProps<RouteName extends keyof RootNavigatorProps> =
  RouteProp<RootNavigatorProps, RouteName>;

const StackNavigator = createStackNavigator<RootNavigatorProps>();
const screenOptions = { headerShown: false };

const RootNavigator = (): JSX.Element => {
  return (
    <StackNavigator.Navigator
      screenOptions={screenOptions}
      initialRouteName='SplashPage'>
      <StackNavigator.Screen name='SplashPage' component={SplashPage} />
      <StackNavigator.Screen name='TestPage' component={TestPage} />
      <StackNavigator.Screen
        name='BottomTabNavigator'
        component={BottomTabNavigator}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='OnBoardingPage'
        component={OnBoardingPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='FirstOnBoardingPage'
        component={FirstOnBoardingPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='LastOnBoardingPage'
        component={LastOnBoardingPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='SelectLanguageOnboardingPage'
        component={SelectLanguageOnboardingPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='SettingPage'
        component={SettingPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='NotificationPage'
        component={NotificationPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='LoginPage'
        component={LoginPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='SignUpPage'
        component={SignUpPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='SelectLanguagePage'
        component={SelectLanguagePage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='WebViewPage'
        component={WebViewPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='CreateNewVoice'
        component={CreateNewVoice}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='PremiumPage'
        component={PremiumPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='DetailHistory'
        component={DetailHistory}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='SearchVoice'
        component={SearchVoice}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='CreateText'
        component={CreateText}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='RecordVoice'
        component={RecordVoice}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='RecordVoiceCreate'
        component={RecordVoiceCreate}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='VoiceGenerator'
        component={VoiceGenerator}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='VoiceLoading'
        component={VoiceLoading}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='LibraryPage'
        component={LibraryPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='CreateVoiceLoading'
        component={CreateVoiceLoading}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='RecordVoiceGenerate'
        component={RecordVoiceGenerate}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='TestPremium'
        component={TestPremium}
        options={{ gestureEnabled: false }}
      />
    </StackNavigator.Navigator>
  );
};

export default RootNavigator;
