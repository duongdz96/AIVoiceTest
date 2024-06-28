import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import getImage from '~/libs/getImage';

import LoadingVoice from '~/resources/Icons/Record/LoadingVoice';
import IconDropDown from '~/resources/Icons/SearchVoice/IconDropDown';

import { dataCountry } from '~/dummyData/dataCountry';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

import HeaderVoice from './component/HeaderVoice';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const LibraryPage = () => {
  const navigation = useNavigation<RootNavigatorNavProps>();
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState(getImage('USAFlag'));
  const [selectLanguageCode, setSelectLanguageCode] = useState('en-US');
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };
  const handleLanguageSelect = (language: any, flag: any, countryCode: any) => {
    setSelectedLanguage(language);
    setSelectedFlag(flag);
    setSelectLanguageCode(countryCode);
    setShowDropDown(false);
  };
  return (
    <LinearGradient colors={['#243247', '#12121a']} style={styles.main}>
      <SafeAreaView style={{ flex: 1, marginHorizontal: 18 }}>
        <ScrollView
          style={{ flex: 1 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <HeaderVoice title='AI Voice Generator' />

          <TouchableOpacity
            onPress={toggleDropDown}
            style={{
              width: '100%',
              zIndex: 8,
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
          {showDropDown && (
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
                top: 100,
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
                      handleLanguageSelect(
                        item.language,
                        item.flag,
                        item.countryCode,
                      )
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
          )}

          <LinearGradient
            colors={['#F89393', '#9A3EBB']}
            style={{
              borderRadius: 20,
              paddingTop: 23,
              paddingHorizontal: 10,
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{
                color: '#000',
                fontFamily: 'Inter-Bold',
                fontSize: 20,
              }}>
              00:00
            </Text>
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
          </LinearGradient>

          <Text
            style={{
              color: '#525B74',
              fontFamily: 'Inter-Bold',
              fontSize: 26,
              textAlign: 'center',
              marginTop: 60,
              marginBottom: 60,
            }}>
            {t('Start Recording')}
          </Text>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                width: 59,
                height: 27,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('RecordVoice', {
                  inputLanguage: selectLanguageCode,
                });
              }}>
              <LottieView
                autoPlay
                style={{ width: 150, height: 150 }}
                source={require('~/resources/animation/voiceRecord.json')}
              />
            </TouchableOpacity>
            <LinearGradient
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
                45s
              </Text>
            </LinearGradient>
          </View>
        </ScrollView>
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
});

export default LibraryPage;
