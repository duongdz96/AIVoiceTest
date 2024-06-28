import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';

import HistoryPage from '~/screens/History/HistoryPage'

const StackNavigator = createStackNavigator<ProfileNavigatorProps>();
const screenOptions = { headerShown: false };

export type ProfileNavigatorProps = {
  HistoryPage: { isProfile: boolean };
};

export type SettingPageNavProps = StackNavigationProp<
  ProfileNavigatorProps,
  'HistoryPage'
>;

export type SettingPageRouteProps = RouteProp<
  ProfileNavigatorProps,
  'HistoryPage'
>;

const ProfileNavigator = (): JSX.Element => {
  return (
    <StackNavigator.Navigator
      screenOptions={screenOptions}
      initialRouteName='HistoryPage'>
      <StackNavigator.Screen
        name='HistoryPage'
        component={HistoryPage}
        options={{ gestureEnabled: false }}
      />
    </StackNavigator.Navigator>
  );
};

export default ProfileNavigator;
