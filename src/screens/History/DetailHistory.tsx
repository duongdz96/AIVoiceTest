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

import getImage from '~/libs/getImage';

import IconBack from '~/resources/Icons/CreateNewVoice/IconBack';

import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';
import GradientButton from '~/base/GradientButton';
import TextGradient from '~/base/TextGradient';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

import NextIcon from '../Record/NextIcon';
import PauseIcon from '../Record/PauseIcon';
import Playicon from '../Record/PlayIcon';
import PreIcon from '../Record/PreIcon';
import SpeakerIcon from '../Record/SpeakerIcon';

interface VoiceGeneratorProps {}

const DetailHistory = (props: VoiceGeneratorProps) => {
  const [valueVoice, setValueVoice] = useState(0);
  const { t } = useTranslation();
  const route = useRoute();
  const { data } = route.params;
  const navigation = useNavigation<RootNavigatorNavProps>();
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = React.useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const intervalRef = React.useRef(null);

  const handleLoadSound = () => {
    const sound = new Sound(data.urlVoice, null, (error) => {
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
      url: data.urlVoice,
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
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <IconBack />
          </TouchableOpacity>
          <Text
            style={{ fontFamily: 'Inter-Bold', color: '#fff', fontSize: 18 }}>
            {t('AI Voice Generator')}
          </Text>
          <View style={{ width: 34, height: 34 }} />
        </View>
        <Image
          style={{
            width: '60%',
            height: 274,
            resizeMode: 'contain',
            marginTop: 24,
            borderRadius: 20,
            borderWidth: 0.75,
          }}
          source={{ uri: data.image }}
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
          <TextGradient
            style={{ fontWeight: '700', fontSize: 15 }}
            colors={['#ED8A99', '#A044B8']}>
            {data.description}
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
            width={(SCREEN_WIDTH - 80) / 2}
            radius={10}
            height={52}
            onPress={handleShare}>
            <Text style={{ fontWeight: '700', fontSize: 18, color: '#fff' }}>
              {t('Share')}
            </Text>
          </GradientButton>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateText')}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              height: 52,
              width: (SCREEN_WIDTH - 80) / 2,
              borderRadius: 10,
              borderColor: '#DA77A1',
              borderWidth: 1,
            }}>
            <Text style={{ color: '#E9859A' }}>{t('Create New')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DetailHistory;

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
