import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
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

const FirstOnboardingPage = (): JSX.Element => {
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
            <View style={{ paddingTop: 40 }}>
              <Image
                source={getImage('VoiceFirst')}
                style={{ width: '100%', height: 90, resizeMode: 'contain' }}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 39,
              }}>
              <Image source={getImage('Voice')} style={{ height: 61 }} />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={getImage('IconVoice')} />
            </View>
            <View>
              <View
                style={{
                  alignItems: 'flex-end',
                  position: 'absolute',
                  right: 0,
                  top: -20,
                }}>
                <Image
                  source={getImage('VoiceIcon1')}
                  style={{ width: 129, height: 40 }}
                />
              </View>
              <Image
                source={getImage('VoiceIcon2')}
                style={{ width: 115, height: 46 }}
              />
              <View style={{ alignItems: 'center', paddingTop: 20 }}>
                <Image
                  source={getImage('VoiceIcon3')}
                  style={{ width: 154, height: 54 }}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
        <TouchableOpacity
          onPress={() => navigation.navigate('OnBoardingPage')}
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
              {t('Get Started')}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default FirstOnboardingPage;

const styles = StyleSheet.create({});
