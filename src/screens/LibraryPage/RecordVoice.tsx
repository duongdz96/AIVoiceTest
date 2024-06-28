import Voice from '@react-native-voice/voice';
import { useNavigation, useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AnimatedLottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import { useInterstitialAd } from 'react-native-google-mobile-ads';
import LinearGradient from 'react-native-linear-gradient';

import usePreferenceContext from '~/hooks/usePreferenceContext';

import Pausing from '~/resources/Icons/Record/Pausing';

import GradientButton from '~/base/GradientButton';
import GradientText from '~/base/TextGradient';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

import HeaderVoice from './component/HeaderVoice';

const RecordVoice = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const [playLotie, setPlayLotie] = useState(true);
  const animationRef = useRef<LottieView>(null);
  const [count, setCount] = useState(45);
  const [recognizedText, setRecognizedText] = useState('');
  const resultContext = usePreferenceContext();
  const isShowAds = resultContext.result.adsMobState.Native_Language;
  const route = useRoute();
  const { inputLanguage } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [started, setStarted] = useState(false);
  const ID_ADS_SPLASH =
    (Platform?.OS === 'ios'
      ? Config?.IOS_INTER_SPLASH
      : Config?.ANDROID_INTER_SPLASH) || '';
  const { isLoaded, isClosed, load, show, error } = useInterstitialAd(
    ID_ADS_SPLASH,
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );
  useEffect(() => {
    load();
  }, [load]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (playLotie && count > 0) {
        setCount((prevCount) => prevCount - 1);
      }
    }, 1000);
    if (count === 0) {
      animationRef.current?.pause();
      setPlayLotie(false);
      stopRecord();
    }

    return () => clearInterval(interval);
  }, [count, playLotie]);
  const handleSelectVoice = () => {
    if (isLoaded && isShowAds) {
      show();
    } else if (error) {
      navigation.navigate('SearchVoice', { textInput: recognizedText });
    }
  };
  useEffect(() => {
    if (isClosed) {
      navigation.navigate('SearchVoice', { textInput: recognizedText });
    }
  }, [isClosed]);
  const startRecord = async () => {
    await Voice.start(inputLanguage);
    setRecognizedText('');
  };

  const stopRecord = async () => {
    await Voice.stop();
  };
  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  const onSpeechResults = (e) => {
    const spokenText = e.value[0];
    setRecognizedText(spokenText);
  };
  const onSpeechStart = (e: any) => {
    setStarted(true);
  };

  const onSpeechEnd = (e: any) => {
    setStarted(false);
  };

  useEffect(() => {
    startRecord();
  }, []);
  return (
    <LinearGradient colors={['#243247', '#12121a']} style={styles.main}>
      <SafeAreaView style={{ flex: 1, marginHorizontal: 18 }}>
        <ScrollView
          style={{ flex: 1 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <HeaderVoice title='AI Voice Generator' />

          {/* <TouchableOpacity
            style={{
              backgroundColor: '#141928',
              width: '100%',
              height: 45,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: '#393E4F',
              justifyContent: 'center',
              marginTop: 29,
              marginBottom: 29,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 14,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View style={{ paddingRight: 9.74 }}>
                  <Image source={getImage('USAFlag')} />
                </View>
                <View style={{ paddingTop: 2 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: 'Inter-Bold',
                      color: '#ffffff',
                    }}>
                    {t('English (USA)')}
                  </Text>
                </View>
              </View>
              <View>
                <IconDropDown />
              </View>
            </View>
          </TouchableOpacity> */}

          <LinearGradient
            colors={['#F89393', '#9A3EBB']}
            style={{
              borderRadius: 20,
              paddingTop: 23,
              paddingHorizontal: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#000',
                fontFamily: 'Inter-Bold',
                fontSize: 20,
              }}>
              {recognizedText ? 'Recognized Text' : 'Recording ...'}
            </Text>
            <View
              style={{
                alignItems: 'center',
                width: '100%',
                overflow: 'hidden',
              }}>
              <AnimatedLottieView
                ref={animationRef}
                autoPlay
                speed={0.4}
                style={{ width: '100%' }}
                source={require('~/resources/animation/playing.json')}
              />
            </View>
          </LinearGradient>

          <Text
            style={{
              color: '#ffffff',
              fontFamily: 'Inter-Bold',
              fontSize: 20,
              textAlign: 'center',
              marginTop: 30,
              marginBottom: 64,
            }}>
            {recognizedText}
          </Text>
          <View
            style={{
              alignItems: 'center',
              // flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 20,
            }}>
            <View
              style={{
                width: 59,
                height: 27,
              }}
            />
            {!recognizedText && (
              <TouchableOpacity>
                <LottieView
                  autoPlay
                  style={{ width: 150, height: 150 }}
                  source={require('~/resources/animation/voiceRecord.json')}
                  speed={1.5}
                />
              </TouchableOpacity>
            )}

            {/* <LinearGradient
              colors={['#F89393', '#9A3EBB']}
              style={{
                width: 59,
                height: 27,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 13,
                  fontFamily: 'Inter-Bold',
                }}>
                {count}s
              </Text>
            </LinearGradient> */}
          </View>
          {recognizedText && (
            <GradientButton
              height={60}
              width={'100%'}
              radius={10}
              onPress={() => handleSelectVoice()}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontFamily: 'Inter-Bold',
                }}>
                {t('Select Voice')}
              </Text>
            </GradientButton>
          )}
        </ScrollView>
      </SafeAreaView>
      {showModal && (
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              position: 'absolute',
              width: '70%',
              borderRadius: 12,
              top: '40%',
              left: 70,
              backgroundColor: 'rgba(37, 49, 74, 1)',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: '#fff',
                paddingVertical: 12,
                textAlign: 'center',
              }}>
              {t('Error Voice Recognition')}
            </Text>
            <View
              style={{
                alignItems: 'center',
                paddingBottom: 12,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#fff',
                }}>
                {t('Please try again')}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderColor: '#82828B',
                borderTopWidth: 1,
              }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ width: '100%' }}>
                <View
                  style={{
                    width: '100%',
                    borderColor: '#82828B',
                    paddingVertical: 12,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'rgba(231, 132, 155, 1)',
                      fontWeight: '700',
                    }}>
                    {t('Close')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
});

export default RecordVoice;
