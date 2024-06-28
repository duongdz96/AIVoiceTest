import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Config from 'react-native-config';
import {
  AdsConsentPrivacyOptionsRequirementStatus,
  useInterstitialAd,
} from 'react-native-google-mobile-ads';
import GradientText from 'react-native-gradient-texts';
import LinearGradient from 'react-native-linear-gradient';
import Textarea from 'react-native-textarea';

import usePreferenceContext from '~/hooks/usePreferenceContext';

import getImage from '~/libs/getImage';

import IconBack from '~/resources/Icons/CreateNewVoice/IconBack';
import IconDropDown from '~/resources/Icons/SearchVoice/IconDropDown';
import IconStar from '~/resources/Icons/TextToVoice/IconStar';
import { useAppTheme } from '~/resources/theme';

import TextGradient from '~/base/TextGradient';
import { dataCountry } from '~/dummyData/dataCountry';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const CreateText = (): JSX.Element => {
  const { t } = useTranslation();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const theme = useAppTheme();
  const [textInput, setTextInput] = useState('');
  const [countWord, setWordCount] = useState(0);
  const [hasInput, setHasInput] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState(getImage('USAFlag'));
  const resultContext = usePreferenceContext();
  const isShowAds = resultContext.result.adsMobState.Inter_Text_To_Speech;
  const ID_ADS_SPLASH =
    (Platform?.OS === 'ios'
      ? Config?.IOS_TEXT_TO_SPEECH
      : Config?.ANDROID_TEXT_TO_SPEECH) || '';
  const { isLoaded, isClosed, load, show, error } = useInterstitialAd(
    ID_ADS_SPLASH,
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );
  useEffect(() => {
    load();
  }, [load]);
  const onChangeInput = (e: any) => {
    if (!resultContext.result.isPremium) {
      if (e.length > 150) {
        navigation.navigate('PremiumPage');
        return;
      }
    }
    setTextInput(e);
    setWordCount(e.length);
    setHasInput(e.length === 0);
  };
  const handleGenerateText = (e: any) => {
    e = "Choose a voice, create content. Let's make magic!";
    setTextInput(e);
    setHasInput(e.length === 0);
    setWordCount(e.length);
  };
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };
  const handleLanguageSelect = (language: any, flag: any) => {
    setSelectedLanguage(language);
    setSelectedFlag(flag);
    setShowDropDown(false);
  };
  const styleContainer = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#25314A',
      },
    ],
    [theme],
  );
  const handleSelect = () => {
    if (isLoaded && isShowAds) {
      show();
    } else if (error) {
      navigation.navigate('SearchVoice', { textInput: textInput });
    }
  };
  useEffect(() => {
    if (isClosed) {
      navigation.navigate('SearchVoice', { textInput: textInput });
    }
  }, [isClosed]);
  return (
    <LinearGradient colors={['#1E2E4C', '#020204']} style={{ flex: 1 }}>
      <SafeAreaView style={styleContainer}>
        <View
          style={{
            flex: 1,
            width: '100%',
            paddingHorizontal: 15,
            paddingTop: Platform.select({
              ios: 0,
              android: 60,
            }),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('BottomTabNavigator', {
                  screen: 'HomeNavigator',
                })
              }>
              <IconBack />
            </TouchableOpacity>
            <View style={{ paddingLeft: 50, justifyContent: 'center' }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#ffffff',
                  fontWeight: '700',
                }}>
                {t('Text to Speech')}
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
          <View style={{ paddingTop: 20, paddingHorizontal: 5 }}>
            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* <View style={{ alignItems: 'center', zIndex: 8 }}>
                  <TouchableOpacity
                    onPress={toggleDropDown}
                    style={{
                      width: '100%',
                    }}
                    activeOpacity={1}>
                    {showDropDown ? (
                      <LinearGradient
                        colors={['#F49095', '#A245B8']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                          height: 45,
                          borderRadius: 10,
                          borderWidth: 2,
                          borderColor: '#393E4F',
                          justifyContent: 'center',
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
                            <View style={{ paddingRight: 10 }}>
                              <Image source={selectedFlag} />
                            </View>
                            <View style={{ paddingTop: 2 }}>
                              <Text
                                style={{
                                  fontSize: 15,
                                  fontWeight: '700',
                                  color: '#ffffff',
                                }}>
                                {t(selectedLanguage)}
                              </Text>
                            </View>
                          </View>
                          <View>
                            <IconDropDown />
                          </View>
                        </View>
                      </LinearGradient>
                    ) : (
                      <View
                        style={{
                          backgroundColor: '#141928',
                          height: 45,
                          borderRadius: 10,
                          borderWidth: 2,
                          borderColor: '#393E4F',
                          justifyContent: 'center',
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
                            <View style={{ paddingRight: 10 }}>
                              <Image source={selectedFlag} />
                            </View>
                            <View style={{ paddingTop: 2 }}>
                              <Text
                                style={{
                                  fontSize: 15,
                                  fontWeight: '700',
                                  color: '#ffffff',
                                }}>
                                {t(selectedLanguage)}
                              </Text>
                            </View>
                          </View>
                          <View>
                            <IconDropDown />
                          </View>
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                </View> */}
                {/* {showDropDown && (
                  <View
                    style={{
                      width: '100%',
                      height: SCREEN_HEIGHT * 0.6,
                      position: 'absolute',
                      zIndex: 4,
                      borderBottomRightRadius: 10,
                      borderBottomLeftRadius: 10,
                      borderRightWidth: 2,
                      borderBottomWidth: 2,
                      borderLeftWidth: 2,
                      borderBottomColor: '#393E4F',
                      borderRightColor: '#393E4F',
                      borderLeftColor: '#393E4F',
                      backgroundColor: '#141928',
                      paddingTop: 20,
                      padding: 16,
                      top: 40,
                    }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {dataCountry.map((item) => (
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            borderColor: '#B859AE',
                            borderWidth: 2,
                            backgroundColor: '#25314A',
                            borderRadius: 10,
                            width: '100%',
                            height: 45,
                            alignItems: 'center',
                            paddingLeft: 18,
                            marginBottom: 15,
                          }}
                          onPress={() =>
                            handleLanguageSelect(item.language, item.flag)
                          }>
                          <View
                            style={{
                              paddingRight: 10,
                            }}>
                            <Image source={item.flag} style={{}} />
                          </View>
                          <View>
                            <Text
                              style={{
                                fontWeight: '700',
                                fontSize: 15,
                                color: '#fff',
                              }}>
                              {item.language}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )} */}
                <View>
                  <View style={{ paddingTop: 22 }}>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: '#FFFFFF',
                        paddingHorizontal: 19,
                        borderRadius: 20,
                        paddingVertical: 24,
                        height: SCREEN_HEIGHT * 0.6,
                        justifyContent: 'space-between',
                      }}>
                      <Textarea
                        containerStyle={styles.textareaContainer}
                        onChangeText={onChangeInput}
                        underlineColorAndroid={'transparent'}
                        value={textInput}
                        placeholder={t('Write your text here')}
                        placeholderTextColor={'#cc6ba6'}
                        style={{
                          color: '#C667A8',
                          fontWeight: '700',
                          fontSize: textInput ? 15 : 25,
                          // lineHeight: 20,
                          flex: 1,
                          textAlignVertical: 'top',
                          paddingBottom: 0,
                          paddingTop: 0,
                        }}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}>
                        {hasInput && (
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '100%',
                              position: 'absolute',
                              bottom: 24,
                            }}>
                            <TouchableOpacity
                              activeOpacity={1}
                              onPress={handleGenerateText}>
                              <LinearGradient
                                colors={[
                                  'rgba(242, 142, 150, 1)',
                                  'rgba(160, 67, 185, 1)',
                                ]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{
                                  width: 191,
                                  height: 58,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  borderRadius: 10,
                                  shadowColor: '#000000',
                                  shadowOpacity: 0.25,
                                  shadowOffset: { width: 0, height: 4 },
                                  shadowRadius: 4,
                                  elevation: 4,
                                }}>
                                <Text
                                  style={{
                                    fontWeight: '700',
                                    fontSize: 18,
                                    textAlign: 'center',
                                    color: '#ffffff',
                                  }}>
                                  {t('Surprise Me 🤔')}
                                </Text>
                              </LinearGradient>
                            </TouchableOpacity>
                          </View>
                        )}
                        {!resultContext.isPremium && (
                          <View
                            style={{
                              position: 'absolute',
                              bottom: 29,
                              right: 1,
                            }}>
                            <Text
                              style={{
                                fontWeight: '700',
                                fontSize: 15,
                                color: '#ED8A99',
                              }}>
                              {countWord}/150
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                  <View style={{ paddingTop: 27 }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TextGradient
                        colors={['#ED8A99', '#A74AB7']}
                        style={{ fontSize: 15, fontWeight: '400' }}>
                        {t('Please enter text before selecting')}
                      </TextGradient>
                      <TextGradient
                        colors={['#ED8A99', '#A74AB7']}
                        style={{ fontSize: 15, fontWeight: '400' }}>
                        {t('a voice for generation')}
                      </TextGradient>
                    </View>
                  </View>
                  <View
                    style={{
                      paddingTop: 15,
                      marginBottom: 34,
                    }}>
                    {!textInput ? (
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: 10,
                          borderWidth: 3,
                          borderColor: '#B859AE',
                          shadowColor: '#000000',
                          shadowOpacity: 0.25,
                          shadowOffset: { width: 0, height: 4 },
                          shadowRadius: 4,
                          elevation: 4,
                          height: 63,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        activeOpacity={1}
                        disabled>
                        <TextGradient
                          colors={[
                            'rgba(237, 138, 153, 1)',
                            'rgba(237, 138, 153, 1)',
                          ]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={{ fontSize: 18, fontWeight: '700' }}>
                          {t('Select Voice ->')}
                        </TextGradient>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => handleSelect()}>
                        <LinearGradient
                          colors={[
                            'rgba(233, 134, 154, 1)',
                            'rgba(167, 74, 183, 1)',
                          ]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={{
                            height: 63,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            shadowColor: '#000000',
                            shadowOpacity: 0.25,
                            shadowOffset: { width: 0, height: 4 },
                            shadowRadius: 4,
                            elevation: 4,
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: '700',
                              color: '#FFFFFF',
                            }}>
                            {t('Select Voice ->')}
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </ScrollView>
            </>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CreateText;

const styles = StyleSheet.create({
  textareaContainer: {
    height: SCREEN_HEIGHT * 0.3,
    padding: 0,
    margin: 0,
  },
});
