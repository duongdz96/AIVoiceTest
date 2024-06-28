import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import i18n from 'i18next';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const Logo = (): JSX.Element => {
  return (
    <>
      <View style={{ alignItems: 'center', paddingTop: 20 }}>
        <LinearGradient
          colors={['rgba(244, 144, 149, 1)', 'rgba(159, 66, 185, 1)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            width: 185,
            height: 185,
          }}></LinearGradient>
      </View>
    </>
  );
};

export default Logo;
