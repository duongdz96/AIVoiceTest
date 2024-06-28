import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import LinearGradient from 'react-native-linear-gradient';

import { useTopInset } from '~/hooks/useInset';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import { useAppTheme } from '~/resources/theme';

import SelectLanguage from '~/screens/components/SelectLanguage';

import i18n from 'i18next';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

import NativeAdsLanguage from '../components/NativeADS/NativeAdsLanguage';

const SelectLanguageOnboardingPage = (): JSX.Element => {
  const theme = useAppTheme();
  const resultContext = usePreferenceContext();
  const isShowAds = resultContext.result.adsMobState.Native_Language;
  const ID_Language =
    (Platform?.OS === 'ios'
      ? Config?.IOS_NATIVE_LANGUAGE
      : Config?.ANDROID_NATIVE_LANGUAGE) || '';
  const { t } = useTranslation();
  const topInsets = useTopInset();
  const [Language, setLanguage] = useState('');
  console.log(
    '🚀 ~ file: SelectLanguagePage.tsx:28 ~ SelectLanguagePage ~ Language:',
    Language,
  );
  const navigation = useNavigation<RootNavigatorNavProps>();

  const acpBtn = () => {
    navigation.navigate('BottomTabNavigator', {
      screen: 'HomeNavigator',
    });
  };

  return (
    <LinearGradient colors={['#1E2E4C', '#020204']} style={{ flex: 1 }}>
      <View style={[styles.container, { paddingTop: topInsets }]}>
        <SafeAreaView style={styles.Area}>
          <View style={styles.content}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                paddingBottom: 24,
                marginTop: 10,
              }}>
              <Image
                source={require('~/resources/Icons/Setting/LanguageIcon.png')}
                style={{ width: 31, height: 29, marginRight: 10 }}
              />
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 18,
                  color: '#FFFFFF',
                }}>
                {t('Language')}
              </Text>
              <View />
            </View>
            <View
              style={{
                width: '100%',
                position: 'relative',
                top: -55,
                flexDirection: 'row-reverse',
              }}>
              <LinearGradient
                colors={['#A245B8', '#F79394']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  width: 38,
                  height: 32,
                  left: 10,
                  borderRadius: 6,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => acpBtn()}
                  style={{
                    width: 38,
                    height: 32,
                    position: 'absolute',
                    zIndex: 5,
                  }}
                />

                <Image
                  source={require('~/resources/Icons/OnBroading/CheckIcon.png')}
                  style={{ width: 23, height: 20 }}
                />
              </LinearGradient>
            </View>

            <SelectLanguage
              selectLanguage={(language) => setLanguage(language)}
            />
          </View>
        </SafeAreaView>
        {isShowAds && (
          <View
            style={{
              backgroundColor: '#fff',
              width: '100%',
              paddingBottom: 20,
            }}>
            <NativeAdsLanguage dataAds={ID_Language} />
          </View>
        )}
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  Area: {
    flex: 1,
  },
  content: {
    paddingLeft: 21,
    paddingRight: 21,
  },
});

export default SelectLanguageOnboardingPage;
