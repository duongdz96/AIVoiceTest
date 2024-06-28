import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import { useInterstitialAd } from 'react-native-google-mobile-ads';
import LinearGradient from 'react-native-linear-gradient';
import Share from 'react-native-share';
import Slider from 'react-native-slider';
import Sound from 'react-native-sound';

import usePreferenceActionsContext from '~/hooks/usePreferenceActionsContext';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import getImage from '~/libs/getImage';

import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';
import GradientButton from '~/base/GradientButton';
import TextGradient from '~/base/TextGradient';
import {
  RootNavigatorNavProps,
  VoiceGeneratorRouteProps,
} from '~/navigation/RootNavigator';

import NextIcon from '../Record/NextIcon';
import PauseIcon from '../Record/PauseIcon';
import Playicon from '../Record/PlayIcon';
import PreIcon from '../Record/PreIcon';
import SpeakerIcon from '../Record/SpeakerIcon';

interface VoiceGeneratorProps {}

const VoiceGenerator = (props: VoiceGeneratorProps) => {
  const { t } = useTranslation();
  const [valueVoice, setValueVoice] = useState(0); // This state manages the slider value
  const resultContext = usePreferenceContext();
  const isShowAds = resultContext.result.adsMobState.Inter_ads;
  const navigation = useNavigation<RootNavigatorNavProps>();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const actionButton = usePreferenceContext();
  const actionMethod = usePreferenceActionsContext();
  const dataHistory = actionButton.result.History;
  const [showModal, setShowModal] = useState(false);

  const route = useRoute<VoiceGeneratorRouteProps>();
  const { textInput, selectImage, urlVoice, voiceName } = route.params;
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
  React.useEffect(() => {
    load();
  }, [load]);
  const handleSave = async () => {
    const dataTimeSave = dayjs();
    const dateSaveTime = dayjs(dataTimeSave).format('DD/MM/YYYY');
    const idHistory = dayjs();
    const timeData = idHistory.unix();
    const ID = String(timeData);
    const newDataHistory = {
      title: voiceName,
      description: textInput,
      time: dateSaveTime,
      id: ID,
      urlVoice: urlVoice,
      image: selectImage,
      selected: false,
    };
    if (!actionButton.isPremium) {
      if (dataHistory.length < 10) {
        const newHistory = dataHistory.push(newDataHistory);
        console.log(newHistory, 'History');
        await AsyncStorage.setItem('dataHistory', JSON.stringify(dataHistory));
        if (isLoaded) {
          show();
        } else if (error) {
          navigation.navigate('BottomTabNavigator', {
            screen: 'ProfileNavigator',
          });
        }
      } else {
        navigation.navigate('PremiumPage');
      }
    } else {
      const newHistory = dataHistory.push(newDataHistory);
      console.log(newHistory, 'History');
      await AsyncStorage.setItem('dataHistory', JSON.stringify(dataHistory));
      navigation.navigate('BottomTabNavigator', { screen: 'ProfileNavigator' });
    }
  };
  React.useEffect(() => {
    if (isClosed) {
      navigation.navigate('BottomTabNavigator', { screen: 'ProfileNavigator' });
    }
  }, [isClosed]);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = React.useRef(null);
  const intervalRef = React.useRef(null);

  const handleLoadSound = () => {
    const sound = new Sound(urlVoice, null, (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      soundRef.current = sound;
      setDuration(sound.getDuration());
    });
  };

  useEffect(() => {
    handleLoadSound();
    return () => {
      if (soundRef.current) {
        soundRef.current.release();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handlePlayVoice = () => {
    if (soundRef.current) {
      setIsPlaying(true);
      soundRef.current.play((success) => {
        if (!success) {
          console.log('Playback failed due to audio decoding errors');
        } else {
          console.log('play success');
        }
        setIsPlaying(false);
        setCurrentTime(duration);
        setValueVoice(1);
        clearInterval(intervalRef.current);
      });

      intervalRef.current = setInterval(() => {
        soundRef.current.getCurrentTime((seconds) => {
          setCurrentTime(seconds);
          setValueVoice(seconds / duration);
        });
      }, 1000);
    }
  };

  const handlePause = () => {
    if (soundRef.current) {
      soundRef.current.pause();
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      console.log('pause success');
    }
  };

  const handleShare = () => {
    const shareOptions = {
      title: 'Share Audio',
      url: urlVoice,
      type: 'audio/wav',
    };
    Share.open(shareOptions)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
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
            style={{
              fontFamily: 'Inter-Bold',
              color: '#fff',
              fontSize: 18,
              alignItems: 'center',
            }}>
            {t('AI Voice Generator')}
          </Text>
          <View style={{ width: 34, height: 34 }} />
        </View>
        <Image
          style={{
            width: '70%',
            height: 274,
            resizeMode: 'contain',
            marginTop: 50,
            borderRadius: 20,
            borderWidth: 0.75,
          }}
          source={{ uri: selectImage }}
        />
        <View style={{ width: SCREEN_WIDTH - 56, marginTop: 42 }}>
          <Slider
            value={valueVoice}
            onValueChange={(value) => {
              setCurrentTime(value * duration);
              if (soundRef.current) {
                soundRef.current.setCurrentTime(value * duration);
              }
            }}
            minimumTrackTintColor='#ef8cd8'
            thumbTintColor='#ef8cd8'
            trackStyle={{ height: 9, borderRadius: 10 }}
            maximumTrackTintColor='#fff'
            thumbImage={getImage('thumbImage')}
            thumbStyle={{ width: 30, height: 30, borderRadius: 100 }}
            maximumValue={1}
            minimumValue={0}
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
            {dayjs(duration * 1000).format('mm:ss')}
          </Text>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Inter',
              fontSize: 15,
            }}>
            {dayjs(currentTime * 1000).format('mm:ss')}
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
            <TouchableOpacity onPress={handlePause}>
              <PauseIcon />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handlePlayVoice}>
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
            borderRadius: 20,
            backgroundColor: '#fff',
            padding: 20,
            borderWidth: 3,
            borderColor: '#DA78A0',
            marginHorizontal: 18,
          }}>
          <TextGradient colors={['#ED8A99', '#A044B8']}>
            {textInput}
          </TextGradient>
        </View>
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
            <Text style={{ color: '#fff' }}>Save</Text>
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
            <Text style={{ color: '#E9859A' }}>Share</Text>
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
    </ImageBackground>
  );
};

export default VoiceGenerator;

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
