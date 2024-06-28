import { useNavigation, useRoute } from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
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

import getImage from '~/libs/getImage';

import axios from 'axios';
import {
  RootNavigatorNavProps,
  VoiceLoadingRouteProps,
} from '~/navigation/RootNavigator';

interface VoiceLoadingProps {}

const VoiceLoading = (props: VoiceLoadingProps) => {
  const { t } = useTranslation();
  const route = useRoute<VoiceLoadingRouteProps>();
  const { textInput, selectImage, selectedVoice, voiceName } = route.params;
  const navigation = useNavigation<RootNavigatorNavProps>();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchVoice = async () => {
      const apiUrl = 'https://api.topmediai.com/v1/text2speech';
      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': 'fb4ef60cbc964af4bdecc8b72ae43256',
      };
      const body = {
        text: textInput,
        speaker: selectedVoice,
        emotion: 'Neutral',
      };
      axios
        .post(apiUrl, body, { headers })
        .then((response: any) => {
          const dataDetail = {
            textInput,
            selectImage,
            urlVoice: response.data.data.oss_url,
            voiceName,
          };
          // console.log(response.data.data.oss_url, '2222');
          setTimeout(() => {
            navigation.navigate('VoiceGenerator', dataDetail);
          }, 3000);
        })
        .catch((error: any) => {
          console.error('Error fetching data:', error);
          setShowModal(true);
        });
    };
    fetchVoice();
  }, []);
  return (
    <ImageBackground
      style={styles.container}
      source={getImage('loadingBackground')}>
      <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ fontFamily: 'Inter-Bold', color: '#fff', fontSize: 18 }}>
          {t('AI Voice Generator')}
        </Text>
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
        <View style={{ alignItems: 'center', gap: 4, marginTop: 42 }}>
          <Text style={{ fontFamily: 'Inter', color: '#fff', fontSize: 15 }}>
            {t('Estimated Time to Complete')}
          </Text>
          <Text
            style={{ fontFamily: 'Inter-Bold', color: '#fff', fontSize: 28 }}>
            {t('~ 10 sec')}
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
            {t(
              'Please remain on this page, as it will only take a few seconds. Thank you for your patience!',
            )}
          </Text>
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
              {t('Error loading')}
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
                onPress={() =>
                  navigation.navigate('BottomTabNavigator', {
                    screen: 'HomeNavigator',
                  })
                }
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
                    {t('Cancel')}
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

export default VoiceLoading;

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
