import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AppState,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
  PlayBackType,
} from 'react-native-audio-recorder-player';
import Config from 'react-native-config';
import { useInterstitialAd } from 'react-native-google-mobile-ads';
import LinearGradient from 'react-native-linear-gradient';
import Share from 'react-native-share';
import Slider from 'react-native-slider';

import usePreferenceActionsContext from '~/hooks/usePreferenceActionsContext';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import getImage from '~/libs/getImage';

import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import axios from 'axios';
import dayjs from 'dayjs';
import GradientButton from '~/base/GradientButton';
import {
  RecordVoiceGenerateRouteProps,
  RootNavigatorNavProps,
} from '~/navigation/RootNavigator';

import NextIcon from '../Record/NextIcon';
import Playicon from '../Record/PlayIcon';
import PreIcon from '../Record/PreIcon';
import SpeakerIcon from '../Record/SpeakerIcon';
import Pauseicon from './PauseIcon';

interface RecordVoiceGenerateProps {}
const audioRecorderPlayer = new AudioRecorderPlayer();

const RecordVoiceGenerate = (props: RecordVoiceGenerateProps) => {
  const { t } = useTranslation();
  const [valueVoice, setValueVoice] = useState(0);
  const navigation = useNavigation<RootNavigatorNavProps>();
  const route = useRoute<RecordVoiceGenerateRouteProps>();
  const { dataInput, imageUri, urlVoice, count } = route.params;
  const [pathVoice, setPathVoice] = useState('');
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [durationSec, setDurationSec] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const actionButton = usePreferenceContext();
  const actionMethod = usePreferenceActionsContext();
  const dataHistory = actionButton.result.History;
  const resultContext = usePreferenceContext();
  const [showModal, setShowModal] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const isShowAds = resultContext.result.adsMobState.Inter_History;
  const [countProfile, setCountProfile] = useState(
    actionButton.result.countApp,
  );
  const ID_ADS_SPLASH =
    (Platform?.OS === 'ios'
      ? Config?.IOS_INTER_HISTORY
      : Config?.ANDROID_INTER_HISTORY) || '';
  const { isLoaded, isClosed, load, show, error } = useInterstitialAd(
    ID_ADS_SPLASH,
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );
  React.useEffect(() => {
    load();
  }, [load]);

  const handleSave = async () => {
    const apiUrl = 'https://api.topmediai.com/v1/clone';

    const postData = {
      name: dataInput,
      files: urlVoice,
    };

    const headers = {
      accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      'x-api-key': 'cc654dba9b5047f89f6d8207d7cf28a8',
    };

    axios
      .post(apiUrl, postData, { headers })
      .then((response) => {
        setResponseData(response.data);
        console.log(response.data, '3333');
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    const newProfile = actionButton.result.countApp + 1;
    actionMethod.setActionCountApp?.(newProfile);
    await AsyncStorage.setItem('profile', JSON.stringify(newProfile));
    if (isLoaded) {
      show();
    }
  };

  React.useEffect(() => {
    if (isClosed) {
      navigation.navigate('BottomTabNavigator', { screen: 'HomeNavigator' });
    }
  }, [isClosed]);

  const handleShare = () => {
    const shareOptions = {
      title: 'Share Audio',
      url: urlVoice,
      type: 'audio/mp3',
    };
    Share.open(shareOptions)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const formatName = (inputName: string) => {
    return inputName
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };
  const formattedName = formatName(dataInput);

  const onStartPlay = async (): Promise<void> => {
    try {
      const msg = await audioRecorderPlayer.startPlayer(urlVoice);
      const volume = await audioRecorderPlayer.setVolume(1.0);
      setPathVoice(msg);
      console.log(`path: ${msg}`, `volume: ${volume}`);
      audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
        setCurrentPositionSec(e.currentPosition);
        setDurationSec(e.duration);
        setValueVoice(e.currentPosition / e.duration);

        // Check if audio has finished playing
        if (e.currentPosition >= e.duration) {
          onStopPlay();
        }

        return;
      });
      setIsPlaying(true);
    } catch (e) {
      console.error(e);
    }
  };

  const onPausePlay = async (): Promise<void> => {
    await audioRecorderPlayer.pausePlayer();
    setIsPlaying(false);
  };

  const onStopPlay = async (): Promise<void> => {
    console.log('onStopPlay');
    await audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setIsPlaying(false);
    setValueVoice(1);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      secs < 10 ? '0' : ''
    }${secs}`;
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        onStopPlay();
      };
    }, []),
  );

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background') {
        onPausePlay();
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);
  return (
    <>
      <ImageBackground
        style={styles.container}
        source={getImage('loadingBackground')}>
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 18,
              justifyContent: 'center',
              width: '100%',
            }}>
            <Text
              style={{ fontFamily: 'Inter-Bold', color: '#fff', fontSize: 18 }}>
              {t('AI Voice Generator')}
            </Text>
            <View style={{ width: 34, height: 34 }} />
          </View>
          <View
            style={{
              marginTop: 54,
              marginBottom: 24,
            }}>
            <Image
              style={{ width: 230, height: 230, borderRadius: 20 }}
              source={{ uri: imageUri }}
            />
          </View>
          <View
            style={{
              marginBottom: 28,
            }}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 18,
                color: '#FFFFFF',
              }}>
              {formattedName}
            </Text>
          </View>
          <View style={{ width: SCREEN_WIDTH - 56 }}>
            <Slider
              value={valueVoice}
              onValueChange={(value) => {
                const seekPosition = value * durationSec;
                setCurrentPositionSec(seekPosition);
                audioRecorderPlayer.seekToPlayer(seekPosition);
                setValueVoice(value);
              }}
              minimumTrackTintColor='#ef8cd8'
              thumbTintColor='#ef8cd8'
              trackStyle={{ height: 9, borderRadius: 10 }}
              maximumTrackTintColor='#fff'
              thumbImage={getImage('thumbImage')}
              thumbStyle={{ width: 30, height: 30, borderRadius: 100 }}
            />
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              paddingHorizontal: 28,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Inter',
                fontSize: 15,
              }}>
              {formatTime(durationSec / 1000)}
            </Text>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Inter',
                fontSize: 15,
              }}>
              {formatTime(currentPositionSec / 1000)}
            </Text>
          </View>
          <LinearGradient
            colors={['#F59195', '#9C40BA']}
            style={{
              height: 60,
              flexDirection: 'row',
              width: SCREEN_WIDTH - 118,
              justifyContent: 'space-around',
              alignItems: 'center',
              borderRadius: 10,
              marginTop: 24,
              marginBottom: 24,
            }}>
            <TouchableOpacity>
              <PreIcon />
            </TouchableOpacity>
            {isPlaying ? (
              <TouchableOpacity onPress={onPausePlay}>
                <Pauseicon />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={onStartPlay}>
                <Playicon />
              </TouchableOpacity>
            )}
            <TouchableOpacity>
              <NextIcon />
            </TouchableOpacity>
            <TouchableOpacity>
              <SpeakerIcon />
            </TouchableOpacity>
          </LinearGradient>
          <View
            style={{
              marginTop: 24,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              paddingHorizontal: 19,
            }}>
            <GradientButton
              width={(SCREEN_WIDTH - 80) / 3}
              radius={10}
              height={52}
              onPress={handleSave}>
              <Text style={{ color: '#fff' }}>{t('Save')}</Text>
            </GradientButton>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                height: 52,
                width: (SCREEN_WIDTH - 80) / 3,
                borderRadius: 10,
                borderColor: '#DA77A1',
                borderWidth: 1,
              }}
              onPress={handleShare}>
              <Text style={{ color: '#E9859A' }}>{t('Share')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                height: 52,
                width: (SCREEN_WIDTH - 80) / 3,
                borderRadius: 10,
                borderColor: '#DA77A1',
                borderWidth: 1,
              }}
              onPress={() => setShowModal(true)}>
              <Text style={{ color: '#E9859A' }}>{t('Home')}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
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
              {t('Unsaved this audio?')}
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
                {t('This action cannot be undone')}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderColor: '#82828B',
                borderTopWidth: 1,
              }}>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={{ width: '50%' }}>
                <View
                  style={{
                    width: '100%',
                    borderColor: '#82828B',
                    borderRightWidth: 1,
                    paddingVertical: 12,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'rgba(231, 132, 155, 1)',
                      fontWeight: '700',
                    }}>
                    {t('Cancel')}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ width: '100%' }}
                onPress={() =>
                  navigation.navigate('BottomTabNavigator', {
                    screen: 'HomeNavigator',
                  })
                }>
                <View
                  style={{
                    width: '50%',
                    paddingVertical: 12,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'rgba(217, 9, 9, 1)',
                      fontWeight: '700',
                      paddingLeft: 8,
                    }}>
                    {t('Confirm')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default RecordVoiceGenerate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android: {
        paddingTop: 48,
      },
    }),
  },
});
