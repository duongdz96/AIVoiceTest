import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Config from 'react-native-config';
import { useInterstitialAd } from 'react-native-google-mobile-ads';
import { launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';

import usePreferenceContext from '~/hooks/usePreferenceContext';

import getImage from '~/libs/getImage';

import IconBack from '~/resources/Icons/CreateNewVoice/IconBack';
import IconCamera from '~/resources/Icons/CreateNewVoice/IconCamera';
import IconStar from '~/resources/Icons/CreateNewVoice/IconStar';
import { useAppTheme } from '~/resources/theme';

import GradientText from '~/base/TextGradient';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

import NativeAdsLanguage from '../components/NativeADS/NativeAdsLanguage';

const CreateNewVoice = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const [dataInput, setDataInput] = useState('');
  const [imageUri, setImageUri] = useState('');
  const navigation = useNavigation<RootNavigatorNavProps>();
  const resultContext = usePreferenceContext();
  const isShowAds = resultContext.result.adsMobState.Native_Create_Voice;
  const profile = resultContext.result.countApp;
  const isShowInter = resultContext.result.adsMobState.Inter_Generate_Voice;
  const dataVoice = {
    dataInput,
    imageUri,
  };
  const ID_ADS_SPLASH =
    (Platform?.OS === 'ios'
      ? Config?.IOS_INTER_GENERATE
      : Config?.ANDROID_INTER_GENERATE) || '';
  const { isLoaded, isClosed, load, show, error } = useInterstitialAd(
    ID_ADS_SPLASH,
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );
  const ID_Language =
    (Platform?.OS === 'ios'
      ? Config?.IOS_NATIVE_CREATE_VOICE
      : Config?.ANDROID_NATIVE_CREATE_VOICE) || '';

  useEffect(() => {
    load();
  }, [load]);
  const styleContainer = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
      },
    ],
    [theme],
  );
  const handleCreateNewVoice = () => {
    if (!resultContext.isPremium) {
      if (profile < 2) {
        if (isLoaded && isShowInter) {
          show();
        } else if (error) {
          navigation.navigate('RecordVoiceCreate', dataVoice);
        }
      } else {
        navigation.navigate('PremiumPage');
      }
    } else {
      navigation.navigate('RecordVoiceCreate', dataVoice);
    }
  };
  useEffect(() => {
    if (isClosed) {
      navigation.navigate('RecordVoiceCreate', dataVoice);
    }
  }, [isClosed]);

  const handleSelectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri };
        setImageUri(source.uri);
      }
    });
  };

  return (
    <ImageBackground
      source={getImage('backgroundCreateNewVoice')}
      style={{ flex: 1 }}>
      <SafeAreaView style={styleContainer}>
        <View
          style={{
            flex: 1,
            width: '100%',
            paddingHorizontal: 12,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <IconBack />
              </TouchableOpacity>
            </View>
            <View style={{ paddingLeft: 50 }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#ffffff',
                  fontWeight: '700',
                }}>
                {t('Create New Voice')}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('PremiumPage')}>
                <LinearGradient
                  colors={['rgba(244, 144, 149, 1)', 'rgba(159, 66, 185, 1)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 92,
                    height: 32,
                    flexDirection: 'row',
                  }}>
                  <IconStar />
                  <Text
                    style={{
                      color: 'white',
                      paddingLeft: 4,
                      fontWeight: '700',
                    }}>
                    {t('Premium')}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={{ paddingTop: 5, alignItems: 'center' }}>
              <LinearGradient
                colors={['rgba(244, 144, 149, 1)', 'rgba(159, 66, 185, 1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: 57,
                  height: 29,
                }}>
                <Text
                  style={{ fontSize: 15, fontWeight: '700', color: '#fff' }}>
                  {profile}/2
                </Text>
              </LinearGradient>
            </View>
          </View>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '400' }}>
                {t('Name your voice')}
              </Text>
              <Text style={{ color: 'red', top: 4, left: 3 }}>*</Text>
            </View>
          </View>
          <View style={{ paddingTop: 10 }}>
            <TextInput
              style={{
                borderColor: 'rgba(184, 89, 174, 1)',
                borderWidth: 1,
                borderRadius: 10,
                height: 40,
                color: '#fff',
                paddingHorizontal: 16,
              }}
              onChangeText={(e) => setDataInput(e)}
              value={dataInput}
              cursorColor={'#fff'}
            />
          </View>
          <View>
            <View style={{ flexDirection: 'row', paddingTop: 15 }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '400' }}>
                {t('Select a profile photo')}
              </Text>
              <Text style={{ color: 'red', top: 4, left: 3 }}>*</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={handleSelectImage}
              style={{ alignItems: 'center', paddingTop: 20 }}>
              <LinearGradient
                colors={['rgba(244, 144, 149, 1)', 'rgba(159, 66, 185, 1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: 185,
                  height: 185,
                }}>
                {imageUri ? (
                  <Image
                    source={{ uri: imageUri }}
                    style={{ width: 160, height: 160, borderRadius: 20 }}
                  />
                ) : (
                  <IconCamera />
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', paddingTop: 12 }}>
            <GradientText
              style={{
                fontSize: 15,
                fontWeight: '400',
                textAlign: 'center',
              }}
              colors={['rgba(244, 144, 149, 1)', 'rgba(159, 66, 185, 1)']}>
              {t('Please fill in all the required information')}
            </GradientText>
          </View>
          <View>
            <View style={{ alignItems: 'center', paddingTop: 20 }}>
              <TouchableOpacity
                onPress={() => handleCreateNewVoice()}
                style={{ width: '100%', alignItems: 'center' }}
                disabled={!dataInput || !imageUri}>
                <LinearGradient
                  colors={['rgba(244, 144, 149, 1)', 'rgba(159, 66, 185, 1)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '90%',
                    height: 60,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>
                    {t('Continue ->')}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
      {isShowAds && (
        <View
          style={{ backgroundColor: '#fff', width: '100%', paddingBottom: 20 }}>
          <NativeAdsLanguage dataAds={ID_Language} />
        </View>
      )}
    </ImageBackground>
  );
};

export default CreateNewVoice;
