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
  acknowledgePurchaseAndroid,
  initConnection,
  isIosStorekit2,
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

const TestPremium = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const [price, setPrice] = useState(0);
  const [dataKeyPremium, setDataKeyPremium] = useState('');
  const [dataPremiumProduct, setDataPremiumProduct] = useState([]);
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
    // {
    //   time: 'Weekly',
    //   price: '5.99$ / Week ',
    // },
    {
      time: 'Monthly',
      price: ' 11.99$ / Month ',
    },
    {
      time: 'Yearly',
      price: '99.99$ / Year ',
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
  // const productWeekPremium = Platform.select({
  //   ios: 'com.triple.Weekly_Premium',
  //   android: 'com.ichime.dev.voiceai.premium',
  // }) as string;
  const productMonthPremium = Platform.select({
    ios: 'com.triple.Monthly_Premium',
    android: 'com.ichime.dev.voiceai.premium',
    default: '',
  }) as string;
  const productYearPremium = Platform.select({
    ios: 'com.triple.Year_Premium',
    android: 'com.ichime.dev.voiceai.premium',
    default: '',
  }) as string;
  const getCurrentTimePlusDay = (days: number) => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime());
    futureDate.setDate(futureDate.getDate() + days);
    return futureDate;
  };
  const handleSuccess = () => {
    const timeNext =
      price === 0 ? getCurrentTimePlusDay(30) : getCurrentTimePlusDay(365);
    actionMethod.isPremium(true);
    AsyncStorage.setItem('dateIAP', JSON.stringify(timeNext));
  };
  useEffect(() => {
    console.log('PremiumPage', JSON.stringify(subscriptions, undefined, 2));
  }, [subscriptions]);
  const handleGetSubscription = async () => {
    try {
      await initConnection().then(async () => {
        await getSubscriptions({
          skus: [productMonthPremium, productYearPremium],
        });
      });
    } catch (error) {
      console.log('Get Subscription Error', error);
    }
  };
  useEffect(() => {
    handleGetSubscription();
  }, []);

  useEffect(() => {
    const checkCurrentPurchase = async () => {
      try {
        if (
          (isIosStorekit2() && currentPurchase?.transactionId) ||
          currentPurchase?.transactionReceipt
        ) {
          if (Platform.OS === 'ios') {
            await finishTransaction({
              purchase: currentPurchase,
              isConsumable: true,
            });
          } else {
            if (Platform.OS === 'android' && currentPurchase.purchaseToken) {
              acknowledgePurchaseAndroid({
                token: currentPurchase.purchaseToken,
                developerPayload: currentPurchase.developerPayloadAndroid,
              })
                .then(() => {
                  finishTransaction({
                    purchase: currentPurchase,
                    isConsumable: true,
                    developerPayloadAndroid:
                      currentPurchase.developerPayloadAndroid,
                  }).catch((err) => {
                    console.error(err.code + ' finish', err.message);
                  });
                  handleSuccess();
                })
                .catch((err) => {
                  console.error(err.code + ' acknowledge', err.message);
                });
            } else {
              await finishTransaction({
                purchase: currentPurchase,
                isConsumable: true,
              });
            }
          }
        }
      } catch (error) {
        if (error instanceof PurchaseError) {
          console.log(error.message);
        } else {
          console.log(error);
        }
      }
    };

    checkCurrentPurchase();
  }, [currentPurchase, finishTransaction]);

  const handleSubscriptions = async (productId: string, offerToken: string) => {
    try {
      const subscriptionOptions = {
        sku: productId,
        ...(Platform.OS === 'android' && offerToken
          ? { subscriptionOffers: [{ sku: productId, offerToken }] }
          : {}),
      };

      await requestSubscription(subscriptionOptions);
    } catch (error) {
      if (error instanceof PurchaseError) {
        console.log(error.message);
      } else {
        console.log(error);
      }
    }
  };
  const handlePremium = () => {
    switch (price) {
      case 0:
        console.log('1M');
        handleSubscriptions(
          productMonthPremium,
          Platform.OS === 'android'
            ? subscriptions[0]?.subscriptionOfferDetails[1]?.offerToken
            : '',
        );
        break;
      case 1:
        console.log('1Y');
        handleSubscriptions(
          productYearPremium,
          Platform.OS === 'android'
            ? subscriptions[0]?.subscriptionOfferDetails[0]?.offerToken
            : '',
        );
        break;
      default:
        console.log('Purchase successfully Premium');
    }
  };
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

export default withIAPContext(TestPremium);
