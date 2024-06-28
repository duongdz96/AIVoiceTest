import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import React, {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  PurchaseError,
  initConnection,
  useIAP,
  withIAPContext,
} from 'react-native-iap';
import LinearGradient from 'react-native-linear-gradient';

import usePreferenceActionsContext from '~/hooks/usePreferenceActionsContext';

import getImage from '~/libs/getImage';

import IconCheck from '~/resources/Icons/Premium/IconCheck';
import IconClose from '~/resources/Icons/Premium/IconClose';

import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';
import GradientButton from '~/base/GradientButton';
import RadioButton from '~/base/RadioButton';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const PremiumPage = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const [price, setPrice] = useState(0);
  const [dataKeyPremium, setDataKeyPremium] = useState('');
  const [dataPremiumProduct, setDataPremiumProduct] = useState(
    Platform.select({
      ios: 'com.triple.weekly_Premium',
      android: 'com.triple.voiceai.weekly',
    }),
  );
  const {
    currentPurchase,
    finishTransaction,
    getSubscriptions,
    subscriptions,
    requestSubscription,
  } = useIAP();
  const actionMethod = usePreferenceActionsContext();
  const slideDataImages = [
    getImage('SlidePremium1'),
    getImage('SlidePremium2'),
    getImage('SlidePremium3'),
    getImage('SlidePremium4'),
    getImage('SlidePremium5'),
    getImage('SlidePremium6'),
    getImage('SlidePremium7'),
    getImage('SlidePremium8'),
    getImage('SlidePremium9'),
    getImage('SlidePremium10'),
    getImage('SlidePremium11'),
    getImage('SlidePremium12'),
  ];
  const dataPrice = [
    {
      id: 0,
      time: 'Weekly',
      price: '5.99$ / Week ',
    },
    {
      id: 1,
      time: 'Monthly',
      price: ' 11.99$ / Month ',
    },
    {
      id: 2,
      time: 'Yearly',
      price: '99.99$ / Month ',
    },
  ];
  const dataContent = [
    'All voices accessible.',
    'Unlimited recording time.',
    'No text generation limits',
    'Unlimited voice cloning',
    'AI Voices in 100+ Languages',
    'No Ads',
  ];
  const dataPremium = [
    { name: 'Weekly', key: 'com.ichime.dev.voiceai.premium' },
    { name: 'Monthly', key: 'com.ichime.dev.voiceai.premium' },
    { name: 'Yearly', key: 'com.ichime.dev.voiceai.premium' },
  ];
  const productWeekPremium = Platform.select({
    ios: 'com.triple.Weekly_Premium',
    android: 'com.ichime.dev.voiceai.premium',
  }) as string;
  const productMonthPremium = Platform.select({
    ios: 'com.triple.Monthly_Premium',
    android: 'com.ichime.dev.voiceai.premium',
  }) as string;
  const productYearPremium = Platform.select({
    ios: 'com.triple.Year_Premium',
    android: 'com.ichime.dev.voiceai.premium',
  }) as string;

  const handleGetSubscription = async () => {
    try {
      await initConnection().then(async () => {
        return await getSubscriptions({
          skus: [productWeekPremium, productMonthPremium, productYearPremium],
        }).then((item) => console.log('item', item));
      });
    } catch (error) {
      console.log('Error Weekly:', error);
    }
  };
  useEffect(() => {
    handleGetSubscription();
  }, []);
  useEffect(() => {
    if (price === 1) {
      setDataPremiumProduct(productMonthPremium),
        setDataKeyPremium(dataPremium[1].key);
    } else {
      if (price === 2) {
        setDataPremiumProduct(productYearPremium),
          setDataKeyPremium(dataPremium[2].key);
      } else {
        setDataPremiumProduct(productWeekPremium),
          setDataKeyPremium(dataPremium[0].key);
      }
    }
  }, [price]);
  const handleSuccess = () => {
    const dateIAP = dayjs();
    const dateIAPWeek = dateIAP.add(7, 'day');
    const dateIAPMonth = dateIAP.add(30, 'day');
    const dateIAPYear = dateIAP.add(365, 'day');

    if (price === 1) {
      AsyncStorage.setItem('dateIAP', JSON.stringify(dateIAPMonth));
    }
    if (price === 2) {
      AsyncStorage.setItem('dateIAP', JSON.stringify(dateIAPYear));
    } else {
      AsyncStorage.setItem('dateIAP', JSON.stringify(dateIAPWeek));
      AsyncStorage.setItem('isPremium', JSON.stringify(true));
    }
    actionMethod.isPremium(true);
  };
  const handleSubscriptions = async (productId: string, offerToken: string) => {
    try {
      const subscriptionOptions = {
        sku: productId,
        ...(Platform.OS === 'android' && offerToken
          ? { subscriptionOffers: [{ sku: productId, offerToken }] }
          : {}),
      };
      console.log(subscriptionOptions, '5555');
      await requestSubscription(subscriptionOptions);
    } catch (error) {
      if (error instanceof PurchaseError) {
        console.log(error);
      } else {
        console.log(error);
      }
    }
    console.log(productId, '2222');
    console.log(offerToken, '3333');
  };
  const handlePremium = () => {
    switch (price) {
      case 0:
        console.log('1W');
        handleSubscriptions(
          productWeekPremium,
          Platform.OS === 'android'
            ? subscriptions[0]?.subscriptionOfferDetails[0]?.offerToken
            : '',
        );
        console.log(productWeekPremium);
        break;
      case 1:
        console.log('1M');
        handleSubscriptions(
          productMonthPremium,
          Platform.OS === 'android'
            ? subscriptions[0]?.subscriptionOfferDetails[1]?.offerToken
            : '',
        );
        console.log(productMonthPremium);
        break;
      case 2:
        console.log('1Y');
        handleSubscriptions(
          productYearPremium,
          Platform.OS === 'android'
            ? subscriptions[0]?.subscriptionOfferDetails[2]?.offerToken
            : '',
        );
        console.log(productYearPremium);
        break;
    }
    // navigation.navigate('BottomTabNavigator', {
    //   screen: 'HomeNavigator',
    // });
  };
  useEffect(() => {
    console.log('9999', JSON.stringify(subscriptions, undefined, 2));
  }, []);

  useEffect(() => {
    const checkCurrentPurchase = async () => {
      try {
        if (currentPurchase) {
          if (Platform.OS === 'ios') {
            await finishTransaction({
              purchase: currentPurchase,
              isConsumable: true,
            });
            if (currentPurchase?.productId === dataKeyPremium) {
              handleSuccess();
            }
          }
          if (Platform.OS === 'android') {
            await finishTransaction({
              purchase: currentPurchase,
              isConsumable: false,
            });
            if (currentPurchase?.productId === dataKeyPremium) {
              console.log('Purchase extras successful---', currentPurchase);
              handleSuccess();
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkCurrentPurchase();
  }, [currentPurchase, finishTransaction]);
  return (
    <LinearGradient colors={['#243247', '#12121a']} style={styles.main}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ zIndex: 1, marginHorizontal: 18 }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '100%',
              alignItems: 'flex-end',
              marginBottom: 22,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#525B74',
                alignItems: 'center',
                justifyContent: 'center',
                width: 25,
                height: 25,
                borderRadius: 100,
              }}
              onPress={() => {
                navigation.goBack();
              }}>
              <IconClose />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              gap: 16,
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginHorizontal: 15,
              marginBottom: 22,
            }}>
            {slideDataImages.map((item) => (
              <Image
                source={item}
                style={{ width: (SCREEN_WIDTH - 146) / 6 }}
                style={{ width: (SCREEN_WIDTH - 146) / 6 }}
              />
            ))}
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 14,
              marginBottom: 22,
              marginHorizontal: 15,
            }}>
            <Image
              source={getImage('imageIconHome')}
              style={{ width: 38, height: 38 }}
            />
            <Text
              style={{
                fontFamily: 'Inter-Bold',
                fontSize: 22,
                color: '#FEFBFF',
              }}>
              {t('Upgrade to Premium')}
            </Text>
          </View>
          <View style={{ gap: 13, marginBottom: 22, marginHorizontal: 15 }}>
            {dataContent.map((item) => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 20,
                }}>
                <IconCheck />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 15,
                    fontFamily: 'Inter-Regular',
                  }}>
                  {item}
                </Text>
              </View>
            ))}
          </View>

          <View style={{ gap: 19, marginBottom: 22, marginHorizontal: 15 }}>
            {dataPrice.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  setPrice(index);
                }}
                style={{
                  width: '100%',
                  height: 63,
                  borderWidth: 1,
                  borderColor: '#AC4FB3',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 10,
                  paddingLeft: 12,
                }}>
                <RadioButton
                  onPressIn={() => {
                    setPrice(index);
                  }}
                  state={price === index ? true : false}
                  color={'#AC4FB3'}
                  // onPress={() => {
                  //   console.log(1);
                  // }}
                />
                <View style={{ gap: 4 }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 15,
                      fontFamily: 'Inter-Bold',
                    }}>
                    {item.time}
                  </Text>
                  <Text style={{ color: '#fff', fontFamily: 'Inter-Regular' }}>
                    {item.price}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View
          style={{
            gap: 19,
            marginBottom: 20,
            paddingTop: 12,
            marginHorizontal: 15,
            alignItems: 'center',
          }}>
          <GradientButton
            height={52}
            radius={10}
            width={SCREEN_WIDTH - 66}
            style={{ alignSelf: 'center' }}
            onPress={() => handlePremium()}>
            <Text
              style={{ color: '#FFF', fontFamily: 'Inter-Bold', fontSize: 18 }}>
              {t('Continue')}
            </Text>
          </GradientButton>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 7,
              justifyContent: 'center',
              width: '100%',
            }}>
            <TouchableOpacity>
              <Text style={styles.textFooter}>Terms of Use</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderEndWidth: 2,
                borderEndColor: '#7D859B',
                borderStartWidth: 2,
                borderStartColor: '#7D859B',
                paddingLeft: 7,
                paddingRight: 7,
              }}>
              <Text style={styles.textFooter}>{t('Privacy Policy')}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.textFooter}>{t('Restore')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Image
          source={getImage('BgPremium')}
          style={{ position: 'absolute', zIndex: 0, top: '40%' }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    ...Platform.select({
      android: {
        paddingTop: 48,
      },
    }),
  },
  textFooter: {
    color: '#7D859B',
    fontFamily: 'Inter-Bold',
  },
});

export default withIAPContext(PremiumPage);
