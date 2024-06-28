import AsyncStorage from '@react-native-async-storage/async-storage';
import remoteConfig from '@react-native-firebase/remote-config';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import * as RNIap from 'react-native-iap';

import usePreferenceActionsContext from '~/hooks/usePreferenceActionsContext';

import getImage from '~/libs/getImage';

import { useAppTheme } from '~/resources/theme';

import axios from 'axios';
import i18n from 'i18next';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const SplashPage = (): JSX.Element => {
  const navigation = useNavigation<RootNavigatorNavProps>();
  const theme = useAppTheme();
  const actionMethod = usePreferenceActionsContext();

  const [isFirst, setIsFirst] = useState();
  useEffect(() => {
    const FirstOpen = async () => {
      const isFirstState = Boolean(await AsyncStorage.getItem('isFirstOpen'));
      setIsFirst(isFirstState);
    };
    FirstOpen();
  }, []);

  const styleContainer = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        flex: 1,
        top: '20%',
      },
      styles.viewContainer,
    ],
    [theme],
  );

  useEffect(() => {
    const loadLanguage = async () => {
      const language = await AsyncStorage.getItem('languageApp');
      if (language) {
        i18n.changeLanguage(language);
      }
    };
    loadLanguage();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log(isFirst, 'isFirst');
      if (!isFirst) {
        navigation.navigate('FirstOnBoardingPage');
      } else {
        navigation.navigate('BottomTabNavigator', {
          screen: 'HomeNavigator',
        });
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [isFirst]);

  useEffect(() => {
    const data = async () => {
      const dataHistory = await AsyncStorage.getItem('dataHistory');
      if (dataHistory !== null) {
        const dataHistoryNew = JSON.parse(dataHistory);
        actionMethod.setActionHistory?.(dataHistoryNew);
      } else {
        const data: { title: string; description: string; time: string }[] = [];
        actionMethod.setActionHistory?.(data);
      }

      const dataProfile = await AsyncStorage.getItem('profile');
      if (dataProfile !== null) {
        const dataProfileNew = JSON.parse(dataProfile);
        actionMethod.setActionCountApp?.(dataProfileNew);
      } else {
        const data = 0;
        actionMethod.setActionCountApp?.(data);
      }
    };
    data();
  });

  const SUBSCRIPTIONS = {
    ios: [
      'com.triple.weekly_Premium',
      'com.triple.monthly_Premium',
      'com.triple.year_Premium',
    ],
    android: [
      'com.ichime.dev.voiceai.premium',
      'com.ichime.dev.voiceai.premium',
      'com.ichime.dev.voiceai.premium',
    ],
  };

  const checkPurchases = async () => {
    if (Platform.OS === 'ios') {
      const availablePurchases = await RNIap.getAvailablePurchases();
      const sortedAvailablePurchases = availablePurchases.sort(
        (a, b) => b.transactionDate - a.transactionDate,
      );
      const latestAvailableReceipt =
        sortedAvailablePurchases[0].transactionReceipt;

      const isTestEnvironment = __DEV__;

      const data = {
        'receipt-data': latestAvailableReceipt,
        password: 'bcfe3028977e4ced8c9a1e0efc6cc4da',
        'exclude-old-transaction': true,
      };

      const url = isTestEnvironment
        ? 'https://sandbox.itunes.apple.com/verifyReceipt'
        : 'https://buy.itunes.apple.com/verifyReceipt';

      const result = await axios.post(url, data);
      const receiptData = result?.data?.latest_receipt_info[0];
      const expiry = receiptData.expires_date_ms;
      const expired = Date.now() > expiry;
      if (expired) {
        actionMethod.isPremium(false);
        AsyncStorage.setItem('isPremium', JSON.stringify(false));
      }
    }

    const availablePurchases = await RNIap.getAvailablePurchases();

    if (availablePurchases.length > 0 && Platform.OS === 'android') {
      if (SUBSCRIPTIONS.android == availablePurchases[0].productId) {
        actionMethod?.isPremium?.(true);
      } else {
        actionMethod.isPremium(false);
        AsyncStorage.setItem('isPremium', JSON.stringify(false));
      }
    }
  };
  useEffect(() => {
    checkPurchases();
  });

  useEffect(() => {
    const fetchAdsMob = async () => {
      await remoteConfig().setDefaults({
        Banner: 'disabled',
        Inter_ads: 'disabled',
        Inter_Generate_Voice: 'disabled',
        Inter_History: 'disabled',
        Inter_Text_To_Speech: 'disabled',
        Native_Create_Voice: 'disabled',
        Native_Language: 'disabled',
        Resume: 'disabled',
        Rewards: 'disabled',
      });

      await remoteConfig().setConfigSettings({
        minimumFetchIntervalMillis: 1000,
      });

      try {
        await remoteConfig().fetchAndActivate();
        const Inter_splash = remoteConfig().getBoolean('Inter_splash');
        const configKeys = [
          'Banner',
          'Inter_ads',
          'Inter_Generate_Voice',
          'Inter_History',
          'Inter_Text_To_Speech',
          'Native_Create_Voice',
          'Native_Language',
          'Resume',
          'Rewards',
        ];
        const remoteConfigData = {} as any;
        configKeys.forEach((key) => {
          remoteConfigData[key] = remoteConfig().getBoolean(key);
        });
        // set data context
        actionMethod.setStateAdsMob?.(remoteConfigData);
      } catch (error) {
        console.error('Error fetching remote config:', error);
      }
    };

    fetchAdsMob();
  }, []);
  return (
    <ImageBackground
      source={getImage('backgroundCreateNewVoice')}
      style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styleContainer}>
          <View style={styles.viewLogo}>
            <Image
              source={getImage('Logo')}
              style={{ width: 139, height: 139 }}
            />
            <View style={{ paddingTop: 40 }}>
              <Image
                source={getImage('AiVoice')}
                style={{ width: 246, height: 42 }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewLogo: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default SplashPage;
