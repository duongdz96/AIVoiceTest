import { useNavigation, useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
// eslint-disable-next-line no-duplicate-imports
import AnimatedLottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
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
} from 'react-native-audio-recorder-player';
import type {
  AudioSet,
  PlayBackType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import Config from 'react-native-config';
import { useRewardedAd } from 'react-native-google-mobile-ads';
import LinearGradient from 'react-native-linear-gradient';
import { PERMISSIONS, RESULTS, check } from 'react-native-permissions';

import IconBack from '~/resources/Icons/CreateNewVoice/IconBack';
import LoadingVoice from '~/resources/Icons/Record/LoadingVoice';
import Pausing from '~/resources/Icons/Record/Pausing';

import axios from 'axios';
import GradientButton from '~/base/GradientButton';
import GradientText from '~/base/TextGradient';
import {
  RecordVoiceCreateRouteProps,
  RootNavigatorNavProps,
} from '~/navigation/RootNavigator';

import HeaderVoice from '../LibraryPage/component/HeaderVoice';

const audioRecorderPlayer = new AudioRecorderPlayer();

const RecordVoiceCreate = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const [playLotie, setPlayLotie] = useState(false);
  const route = useRoute<RecordVoiceCreateRouteProps>();
  const { dataInput, imageUri } = route.params;
  const animationRef = useRef<LottieView>(null);
  const [count, setCount] = useState<number>(30);
  const [recordTime, setRecordTime] = useState<string>('00:00:00');
  const [urlVoice, setUrlVoice] = useState('');
  const path = Platform.select({
    ios: undefined,
    android: undefined,
  });
  const [showModal, setShowModal] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const dataVoice = {
    dataInput,
    imageUri,
    urlVoice,
    count,
  };
  const ID_BANNER_ALL =
    (Platform?.OS === 'ios' ? Config?.IOS_REWARD : Config?.ANDROID_REWARD) ||
    '';

  const { isLoaded, isClosed, load, show, error } = useRewardedAd(
    ID_BANNER_ALL,
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );
  useEffect(() => {
    load();
  }, [load, isClosed]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (playLotie && count > 0) {
        setCount((prevCount) => prevCount - 1);
      }
    }, 1000);
    if (count === 0) {
      onStopRecord();
      animationRef.current?.pause();
      setPlayLotie(false);
    }

    return () => clearInterval(interval);
  }, [count, playLotie]);
  const onStartRecord = async (): Promise<void> => {
    if (Platform.OS === 'android') {
      try {
        const androidVersion = Platform.Version;
        let permissionsToRequest = [];

        if (androidVersion >= 33) {
          permissionsToRequest = [
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ];
        } else {
          permissionsToRequest = [
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ];
        }

        const grants = await PermissionsAndroid.requestMultiple(
          permissionsToRequest,
        );
        console.log('Permissions response:', grants);

        const hasAllPermissions = permissionsToRequest.every(
          (permission) =>
            grants[permission] === PermissionsAndroid.RESULTS.GRANTED,
        );

        if (hasAllPermissions) {
          console.log('All required permissions granted');
        } else {
          console.log('Not all required permissions were granted');
          return;
        }
      } catch (err) {
        console.warn('Error requesting permissions:', err);
        return;
      }
    } else if (Platform.OS === 'ios') {
      try {
        const microphonePermission = await check(PERMISSIONS.IOS.MICROPHONE);

        if (microphonePermission === RESULTS.GRANTED) {
          console.log('Microphone permission granted');
        } else {
          console.log('Microphone permission not granted');
          return;
        }
      } catch (err) {
        console.warn('Error checking permissions:', err);
        return;
      }
    }
    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
    };
    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
    setUrlVoice(uri);
    audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
      // setCount(e.currentPosition);
      setRecordTime(audioRecorderPlayer.mmssss(Math.round(e.currentPosition)));
    });
    setPlayLotie(true);
    console.log('uri:', uri);
  };

  const onPauseRecord = async (): Promise<void> => {
    try {
      const r = await audioRecorderPlayer.pauseRecorder();
      setPlayLotie(false);
      console.log(r);
    } catch (e) {
      console.log('pause error', e);
    }
  };
  const onResumeRecord = async (): Promise<void> => {
    await audioRecorderPlayer.resumeRecorder();
  };
  const onStopRecord = async (): Promise<void> => {
    const res = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    // setCount(0);
    console.log(res, 'This is result');
  };
  const handlePlay = () => {
    setShowModal(false);
    setIsShow(true);
    onStartRecord();
  };
  const handleGenerate = () => {
    onStopRecord();
    if (isLoaded) {
      show();
    } else if (error) {
      navigation.navigate('CreateVoiceLoading', dataVoice);
    }
  };
  const handleRestart = async () => {
    await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setCount(30);
    setShowModal(false);
    setIsShow(false);
  };
  React.useEffect(() => {
    if (isClosed) {
      navigation.navigate('CreateVoiceLoading', dataVoice);
    }
  }, [isClosed]);
  const handleGoBack = async () => {
    onStopRecord();
    navigation.goBack();
  };

  const [responseData, setResponseData] = useState(null);

  // useEffect(() => {
  //   const apiUrl = 'https://api.topmediai.com/v1/clone';

  //   const postData = {
  //     name: 'NameVoiceClone',
  //     files: 'files voice clone',
  //   };

  //   const headers = {
  //     accept: 'application/json',
  //     'Content-Type': 'multipart/form-data',
  //     'x-api-key': 'ed1cd96cc80a44d19c9a1258d3cad0cc',
  //   };

  //   axios
  //     .post(apiUrl, postData, { headers })
  //     .then((response) => {
  //       setResponseData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);
  return (
    <LinearGradient colors={['#243247', '#12121a']} style={styles.main}>
      <SafeAreaView style={{ flex: 1, marginHorizontal: 18 }}>
        <ScrollView
          style={{ flex: 1 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 20,
            }}>
            <TouchableOpacity onPress={handleGoBack}>
              <IconBack />
            </TouchableOpacity>
            <Text
              style={{ fontFamily: 'Inter-Bold', color: '#fff', fontSize: 16 }}>
              {t('Create New Vocie')}
            </Text>
            <View />
          </View>
          <Text
            style={{
              color: '#ffffff',
              fontFamily: 'Inter-Bold',
              fontSize: 14,
              marginBottom: 30,
            }}>
            {t(
              'Once upon a time, in a small village, there lived a brave young girl named Lily. One day, she found a mysterious book that transported  her into a magical realm. There, she encountered talking animals,  solved riddles, and learned valuable lessons about courage and friendship. With her newfound knowledge, she helped restore balance to the realm and became a legend in her village.',
            )}
          </Text>
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
              00:{count < 10 ? `0${count}` : count}
            </Text>
            <View
              style={{
                alignItems: 'center',
                width: '100%',
                overflow: 'hidden',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  marginTop: 50,
                  marginBottom: 55,
                  width: '100%',
                  overflow: 'hidden',
                }}>
                <LoadingVoice />
              </View>
            </View>
          </LinearGradient>
          {isShow ? (
            <>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}>
                <View />
                <TouchableOpacity
                  style={{ width: 150, height: 150 }}
                  onPress={() => {
                    if (playLotie) {
                      animationRef.current?.pause();
                      onPauseRecord();
                      setPlayLotie(false);
                    } else {
                      animationRef.current?.play();
                      onResumeRecord();
                      setPlayLotie(true);
                    }
                  }}>
                  {playLotie ? (
                    <LottieView
                      autoPlay
                      style={{ width: '100%', height: '100%' }}
                      source={require('~/resources/animation/pause.json')}
                    />
                  ) : (
                    <Pausing />
                  )}
                </TouchableOpacity>
              </View>
              {!playLotie && (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{ width: '45%' }}>
                    <View
                      style={{
                        height: 60,
                        width: '100%',
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <TouchableOpacity onPress={handleRestart}>
                        <Text
                          style={{
                            color: 'rgba(243, 143, 149, 1)',
                            fontSize: 18,
                            fontFamily: 'Inter-Bold',
                          }}>
                          Restart
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ width: '45%' }}>
                    <GradientButton
                      height={60}
                      width={'100%'}
                      radius={10}
                      onPress={handleGenerate}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 18,
                          fontFamily: 'Inter-Bold',
                        }}>
                        {t('Generate')}
                      </Text>
                    </GradientButton>
                  </View>
                </View>
              )}
            </>
          ) : (
            <>
              <View style={{ alignItems: 'center', paddingTop: 30 }}>
                <TouchableOpacity onPress={handlePlay}>
                  <LottieView
                    loop={false}
                    style={{ width: 150, height: 150 }}
                    source={require('~/resources/animation/voiceRecord.json')}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    alignItems: 'center',
                    paddingTop: 12,
                    flexDirection: 'row',
                  }}>
                  <GradientText
                    style={{
                      fontSize: 15,
                      fontWeight: '400',
                      textAlign: 'center',
                    }}
                    colors={[
                      'rgba(244, 144, 149, 1)',
                      'rgba(159, 66, 185, 1)',
                    ]}>
                    {t('Please press the "Microphone" button')}
                  </GradientText>
                  <TouchableOpacity onPress={() => setShowModal(true)}>
                    <LinearGradient
                      colors={[
                        'rgba(235, 136, 153, 1)',
                        'rgba(157, 65, 186, 1)',
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 50,
                        marginLeft: 10,
                        paddingBottom: 4,
                      }}>
                      <Text
                        style={{
                          fontWeight: '700',
                          fontSize: 18,
                          color: 'rgba(255, 255, 255, 1)',
                          textAlign: 'center',
                        }}>
                        i
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
      {showModal && (
        <View
          style={{
            width: '100%',
            position: 'absolute',
            top: '20%',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '85%',
              borderRadius: 20,
            }}>
            <View style={{ paddingHorizontal: 12, paddingVertical: 12 }}>
              <GradientText
                style={{
                  fontSize: 15,
                  fontWeight: '700',
                }}
                colors={['rgba(244, 144, 149, 1)', 'rgba(159, 66, 185, 1)']}>
                {t(
                  'Please press the "Microphone" button and read the paragraph aloud in your natural voice, keeping the recording within a maximum of 30 seconds. Remember to ensure you are close to the microphone and in a quiet environment. ',
                )}
              </GradientText>
              <View style={{ alignItems: 'center', paddingTop: 10 }}>
                <GradientText
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                  }}
                  colors={['rgba(244, 144, 149, 1)', 'rgba(159, 66, 185, 1)']}>
                  {t('Thank you!')}
                </GradientText>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  paddingTop: 10,
                  paddingBottom: 10,
                }}>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <LinearGradient
                    colors={['#F89393', '#9A3EBB']}
                    style={{
                      borderRadius: 20,
                      width: 151,
                      height: 42,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontFamily: 'Inter-Bold',
                        fontSize: 18,
                      }}>
                      {t('Close')}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
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

export default RecordVoiceCreate;
