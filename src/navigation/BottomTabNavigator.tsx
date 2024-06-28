import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Platform, TouchableOpacity, View } from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  useInterstitialAd,
} from 'react-native-google-mobile-ads';

import { useBottomInset } from '~/hooks/useInset';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import getImage from '~/libs/getImage';

import IconHome from '~/resources/Icons/IconBottomBar/IconHome';
import IconLocated from '~/resources/Icons/IconBottomBar/IconLocated';
import IconMusic from '~/resources/Icons/IconBottomBar/IconMusic';
import IconProfile from '~/resources/Icons/IconBottomBar/IconProfile';
import { useAppTheme } from '~/resources/theme';

import { ANDROID_BANNER, IOS_BANNER } from '@env';
import TextGradient from '~/base/TextGradient';

import HomeNavigator, { HomeNavigatorProps } from './HomeNavigator';
import LibraryNavigator, { LibraryNavigatorProps } from './LibraryNavigator';
import NotificationNavigator, {
  NotificationNavigatorProps,
} from './NotificationNavigator';
import ProfileNavigator, { ProfileNavigatorProps } from './ProfileNavigator';
import { RootNavigatorProps } from './RootNavigator';

export type BottomTabNavigatorProps = {
  HomeNavigator: NavigatorScreenParams<HomeNavigatorProps> | undefined;
  LibraryNavigator: NavigatorScreenParams<LibraryNavigatorProps> | undefined;
  NotificationNavigator:
    | NavigatorScreenParams<NotificationNavigatorProps>
    | undefined;
  ProfileNavigator: NavigatorScreenParams<ProfileNavigatorProps> | undefined;
};

export type BottomTabNavigatorRouteProps = RouteProp<BottomTabNavigatorProps>;

export type BottomTabNavigatorNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavigatorProps>,
  StackNavigationProp<RootNavigatorProps>
>;

export type HomeNavigatorNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavigatorProps, 'HomeNavigator'>,
  StackNavigationProp<RootNavigatorProps>
>;

export type HomeNavigatorRouteProps = RouteProp<
  BottomTabNavigatorProps,
  'HomeNavigator'
>;

export type LibraryNavigatorNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavigatorProps, 'LibraryNavigator'>,
  StackNavigationProp<RootNavigatorProps>
>;

export type LibraryNavigatorRouteProps = RouteProp<
  BottomTabNavigatorProps,
  'LibraryNavigator'
>;

export type ProfileNavigatorNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavigatorProps, 'ProfileNavigator'>,
  StackNavigationProp<RootNavigatorProps>
>;

export type ProfileNavigatorRouteProps = RouteProp<
  BottomTabNavigatorProps,
  'ProfileNavigator'
>;

export type NotificationNavigatorNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavigatorProps, 'NotificationNavigator'>,
  StackNavigationProp<RootNavigatorProps>
>;

export type NotificationNavigatorRouteProps = RouteProp<
  BottomTabNavigatorProps,
  'NotificationNavigator'
>;

const ID_ADS_BANNER = Platform?.OS === 'ios' ? IOS_BANNER : ANDROID_BANNER;

const BottomTabNavigator = (): JSX.Element => {
  const resultContext = usePreferenceContext();
  const isShowAds = resultContext.result.adsMobState.Banner;
  const theme = useAppTheme();
  const Tab = createBottomTabNavigator();
  const { t } = useTranslation();
  const bottomInset = useBottomInset();

  // eslint-disable-next-line react/no-unstable-nested-components
  const CustomTabBar = ({ children, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
        height: 90,
      }}>
      <View>{children}</View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 10,
            left: 19,
            right: 19,
            borderTopWidth: 0,
            borderRadius: 10,
            backgroundColor: '#080c1e',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: Platform.OS === 'ios' ? 24 : 10,
            height: Platform.OS === 'android' ? 70 : bottomInset + 44,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: theme.colors.title,
        }}>
        <Tab.Screen
          name='HomeNavigator'
          component={HomeNavigator}
          options={{
            tabBarLabel: t('Home'),
            tabBarIcon: ({ focused }) =>
              focused ? (
                <LottieView
                  source={getImage('homeAnimate')}
                  autoPlay
                  loop
                  style={{ height: 40, width: 40 }}
                />
              ) : (
                <IconHome />
              ),
          }}
        />

        <Tab.Screen
          name='LibraryNavigator'
          component={LibraryNavigator}
          options={{
            tabBarLabel: t('Record'),
            tabBarIcon: () => <Image source={getImage('voidTab')} />,
            tabBarButton: (props) => <CustomTabBar {...props} />,
          }}
        />

        <Tab.Screen
          name='ProfileNavigator'
          component={ProfileNavigator}
          options={{
            tabBarLabel: t('History'),
            tabBarIcon: ({ focused }) =>
              focused ? (
                <LottieView
                  source={getImage('history')}
                  autoPlay
                  loop
                  style={{ height: 50, width: 50 }}
                />
              ) : (
                <IconProfile />
              ),
          }}
        />
      </Tab.Navigator>
      {isShowAds && (
        <BannerAd
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          unitId={ID_ADS_BANNER}
          onAdFailedToLoad={() => console.log(1)}
          onAdLoaded={() => console.log(2)}
        />
      )}
    </View>
  );
};

export default BottomTabNavigator;
