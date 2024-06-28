/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-empty-interface */
import { useNavigation, useRoute } from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import * as React from 'react';
import { useEffect } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import getImage from '~/libs/getImage';

import {
  CreateVoiceLoadingRouteProps,
  RootNavigatorNavProps,
} from '~/navigation/RootNavigator';

interface CreateVoiceLoadingProps {}

const CreateVoiceLoading = (props: CreateVoiceLoadingProps) => {
  const route = useRoute<CreateVoiceLoadingRouteProps>();
  const { dataInput, imageUri, urlVoice, count } = route.params;
  const dataVoice = {
    dataInput,
    imageUri,
    urlVoice,
    count,
  };
  const navigation = useNavigation<RootNavigatorNavProps>();
  useEffect(() => {
    const LoadingSound = () => {
      setTimeout(() => {
        navigation.navigate('RecordVoiceGenerate', dataVoice);
      }, 3000);
    };
    LoadingSound();
  }, []);
  return (
    <ImageBackground
      style={styles.container}
      source={getImage('loadingBackground')}>
      <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ fontFamily: 'Inter-Bold', color: '#fff', fontSize: 18 }}>
          AI Voice Generator
        </Text>
        <View
          style={{
            marginTop: 60,
            marginBottom: 40,
          }}>
          <Image
            source={{
              uri: imageUri,
            }}
            style={{ width: 230, height: 230, borderRadius: 20 }}
          />
        </View>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <Text style={{ fontFamily: 'Inter', color: '#fff', fontSize: 15 }}>
            Estimated Time to Complete
          </Text>
          <Text
            style={{ fontFamily: 'Inter-Bold', color: '#fff', fontSize: 28 }}>
            ~ 10 sec
          </Text>
        </View>
        <View style={{ paddingHorizontal: 24 }}>
          <AnimatedLottieView
            autoPlay
            speed={0.4}
            style={{ width: '100%' }}
            source={require('~/resources/animation/LotieLoading.json')}
          />
        </View>
        <View style={{ alignItems: 'center', gap: 4, paddingHorizontal: 18 }}>
          <Text
            style={{
              fontFamily: 'Inter',
              color: '#fff',
              fontSize: 15,
              textAlign: 'center',
              fontWeight: '400',
            }}>
            Please remain on this page, as it will only take a few seconds.
            Thank you for your patience!
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CreateVoiceLoading;

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
