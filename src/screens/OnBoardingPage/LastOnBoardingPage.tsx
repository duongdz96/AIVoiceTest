import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import getImage from '~/libs/getImage';

import { useAppTheme } from '~/resources/theme';

import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const LastOnBoardingPage = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const styleContainer = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        paddingTop: 50,
      },
    ],
    [theme],
  );

  const handleSelectLanguage = async () => {
    navigation.navigate('SelectLanguageOnboardingPage');
    AsyncStorage.setItem('isFirstOpen', 'true');
    console.log('111');
  };

  return (
    <ImageBackground
      source={getImage('backgroundCreateNewVoice')}
      style={{ flex: 1 }}>
      <View style={styleContainer}>
        <SafeAreaView style={{ width: '100%' }}>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 24,
            }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={getImage('Logo')}
                style={{ width: 75, height: 75 }}
              />
            </View>
            <View style={{ paddingTop: 12 }}>
              <Image
                source={getImage('TitleLast')}
                style={{ width: '100%', height: 90, resizeMode: 'contain' }}
              />
            </View>
            <View style={{ paddingTop: 12, alignItems: 'center' }}>
              <Image
                source={getImage('LogoBackground')}
                style={{ width: 286, height: 286, resizeMode: 'contain' }}
              />
            </View>
            <View style={{ paddingTop: 12 }}>
              <Image
                source={getImage('time')}
                style={{ width: '100%', height: 90, resizeMode: 'contain' }}
              />
            </View>
            <View style={{ paddingTop: 12 }}>
              <Image
                source={getImage('song')}
                style={{ width: '100%', height: 90, resizeMode: 'contain' }}
              />
            </View>
          </View>
        </SafeAreaView>
        <TouchableOpacity
          onPress={() => handleSelectLanguage()}
          style={{
            position: 'absolute',
            bottom: 33,
            width: '90%',
            alignItems: 'center',
          }}>
          <LinearGradient
            colors={['rgba(244, 144, 149, 1)', 'rgba(159, 66, 185, 1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              width: '90%',
              height: 60,
            }}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>
              {t('Continue ->')}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LastOnBoardingPage;

const styles = StyleSheet.create({});
