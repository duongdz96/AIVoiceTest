import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import IconBack from '~/resources/Icons/CreateNewVoice/IconBack';
import { useAppTheme } from '~/resources/theme';

import i18n from 'i18next';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const SettingPage = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();

  const dataLanguage = i18n.language.slice(3);

  const styleContainer = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    ],
    [theme],
  );

  const imageList = [
    { id: '1', source: require('~/resources/images/Setting/image1.png') },
    { id: '2', source: require('~/resources/images/Setting/image2.png') },
    { id: '3', source: require('~/resources/images/Setting/image3.png') },
    { id: '4', source: require('~/resources/images/Setting/image4.png') },
    { id: '5', source: require('~/resources/images/Setting/image5.png') },
    { id: '6', source: require('~/resources/images/Setting/image6.png') },
    { id: '7', source: require('~/resources/images/Setting/image7.png') },
    { id: '8', source: require('~/resources/images/Setting/image8.png') },
    { id: '9', source: require('~/resources/images/Setting/image9.png') },
    { id: '10', source: require('~/resources/images/Setting/image10.png') },
    { id: '11', source: require('~/resources/images/Setting/image11.png') },
    { id: '12', source: require('~/resources/images/Setting/image12.png') },
  ];

  const renderItem = (item: any) => (
    <Image source={item.source} style={{ width: 50, height: 50, margin: 3 }} />
  );

  return (
    <LinearGradient colors={['#243247', '#12121a']} style={{ flex: 1 }}>
      <SafeAreaView style={styleContainer}>
        <View
          style={{
            flex: 1,
            width: '100%',
            paddingHorizontal: 24,
            paddingTop: Platform.OS === 'ios' ? 0 : 36,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconBack style={{ width: 33, height: 33 }} />
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                paddingBottom: 24,
                top: 10,
                marginLeft: -30,
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 18,
                  color: '#FFFFFF',
                }}>
                {t('Setting')}
              </Text>
              <View />
            </View>
            <View />
          </View>

          {/* Upgrade to Premium */}
          <LinearGradient
            colors={['#E8859A', '#AD50B3']}
            style={{
              marginTop: 20,
              width: '100%',
              height: 188,
              borderRadius: 10,
            }}>
            <ImageBackground
              source={require('~/resources/images/Setting/imageBackgroundPre.png')}
              style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <View style={{ width: '100%' }}>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <FlatList
                      style={{}}
                      data={imageList}
                      numColumns={6}
                      renderItem={({ item }) => renderItem(item)}
                      keyExtractor={(item) => item.id}
                    />
                  </View>
                </View>

                <LinearGradient
                  colors={['#E8859A', '#AD50B3']}
                  style={{
                    backgroundColor: 'red',
                    width: '100%',
                    height: 62,
                    borderRadius: 10,
                  }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() => navigation.navigate('PremiumPage')}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        source={require('~/resources/Icons/Setting/blingIcon.png')}
                        style={{ width: 20, height: 25, marginLeft: 20 }}
                      />
                      <Text
                        style={{
                          fontWeight: '700',
                          fontSize: 25,
                          color: '#FFFFFF',
                          marginLeft: 10,
                        }}>
                        {t('Upgrade to Premium')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </ImageBackground>
          </LinearGradient>

          {/* Buttons of Setting */}

          {/* Select language */}
          <TouchableOpacity
            onPress={() => navigation.navigate('SelectLanguagePage')}
            style={{
              backgroundColor: '#25314A',
              width: '100%',
              height: 49,
              borderRadius: 10,
              borderColor: 'rgba(255, 255, 255, 0.15)',
              borderWidth: 1,
              marginTop: 30,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('~/resources/Icons/Setting/LanguageIcon.png')}
                style={{ width: 31, height: 29, marginLeft: 20 }}
              />
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 14,
                  color: '#FFFFFF',
                  marginLeft: 10,
                }}>
                {t('Language')}
              </Text>
            </View>

            <View
              style={{
                width: 100,
                marginRight: 20,
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#868EA2',
                  fontWeight: '700',
                  fontSize: 14,
                }}>
                {dataLanguage}
              </Text>
              <Image
                source={require('~/resources/Icons/Setting/NextIcon.png')}
                style={{ width: 12, height: 20, marginLeft: 20 }}
              />
            </View>
          </TouchableOpacity>

          {/* Rate Us */}
          <TouchableOpacity
            style={{
              backgroundColor: '#25314A',
              width: '100%',
              height: 49,
              borderRadius: 10,
              borderColor: 'rgba(255, 255, 255, 0.15)',
              borderWidth: 1,
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('~/resources/Icons/Setting/RateUsIcon.png')}
                style={{ width: 21, height: 20, marginLeft: 20 }}
              />
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 14,
                  color: '#FFFFFF',
                  marginLeft: 10,
                }}>
                {t('Rate Us')}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Share with Friends */}
          <TouchableOpacity
            style={{
              backgroundColor: '#25314A',
              width: '100%',
              height: 49,
              borderRadius: 10,
              borderColor: 'rgba(255, 255, 255, 0.15)',
              borderWidth: 1,
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('~/resources/Icons/Setting/ShareIcon.png')}
                style={{ width: 17, height: 18, marginLeft: 20 }}
              />
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 14,
                  color: '#FFFFFF',
                  marginLeft: 10,
                }}>
                {t('Share with Friends')}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Privacy Policy */}
          <TouchableOpacity
            style={{
              backgroundColor: '#25314A',
              width: '100%',
              height: 49,
              borderRadius: 10,
              borderColor: 'rgba(255, 255, 255, 0.15)',
              borderWidth: 1,
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('~/resources/Icons/Setting/PolicyIcon.png')}
                style={{ width: 16, height: 20, marginLeft: 20 }}
              />
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 14,
                  color: '#FFFFFF',
                  marginLeft: 10,
                }}>
                {t('Privacy Policy')}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Terms of Use */}
          <TouchableOpacity
            style={{
              backgroundColor: '#25314A',
              width: '100%',
              height: 49,
              borderRadius: 10,
              borderColor: 'rgba(255, 255, 255, 0.15)',
              borderWidth: 1,
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('~/resources/Icons/Setting/TermsIcon.png')}
                style={{ width: 15, height: 18, marginLeft: 20 }}
              />
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 14,
                  color: '#FFFFFF',
                  marginLeft: 10,
                }}>
                {t('Terms of Use')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SettingPage;
