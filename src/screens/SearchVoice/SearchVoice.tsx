import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Dimensions,
  FlatList,
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
import { useRewardedAd } from 'react-native-google-mobile-ads';
import LinearGradient from 'react-native-linear-gradient';
import { Searchbar } from 'react-native-paper';

import usePreferenceContext from '~/hooks/usePreferenceContext';

import getImage from '~/libs/getImage';

import IconBack from '~/resources/Icons/CreateNewVoice/IconBack';
import IconVideo from '~/resources/Icons/Record/IconVideo';
import IconDropDown from '~/resources/Icons/SearchVoice/IconDropDown';
import { useAppTheme } from '~/resources/theme';

import axios from 'axios';
import GradientButton from '~/base/GradientButton';
import TextGradient from '~/base/TextGradient';
import { dataVoice } from '~/dummyData/dataVoice';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
type Voice = {
  Languagename: string;
  classification: string;
  classnamearray: string;
  name: string;
  plan: number;
  speaker: string;
};

const SearchVoice = (): JSX.Element => {
  const { t } = useTranslation();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const theme = useAppTheme();
  const [search, setSearch] = useState('');
  const [checkPremium, setCheckPremium] = useState(false);
  const onChangeSearch = (query: string) => {
    setSearch(query);
  };
  const [dataListVoice, setDataListVoice] = useState<Voice[]>([]);
  const [dataListClone, setDataListClone] = useState();
  const [selected, setSelected] = useState('All ✅');
  const [selectedVoice, setSelectedVoice] = useState('');
  const [selectedGender, setSelectedGender] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const [voiceName, setVoiceName] = useState('');
  const route = useRoute();
  const resultContext = usePreferenceContext();
  const isShowAds = resultContext.result.adsMobState.Rewards;
  const textInput = route.params?.textInput;
  const [selectImage, setSelectImage] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const dataDetail = {
    textInput,
    selectImage,
    selectedVoice,
    voiceName,
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

  const categories = useMemo(() => {
    const allCategories = [
      'All ✅',
      ...new Set(dataVoice.map((voice) => voice.classification)),
    ];
    return allCategories.map((classification) => ({
      classification: classification,
    }));
  }, [dataVoice]);

  const genders = useMemo(() => {
    const allGenders = ['All', 'Male', 'Female', 'Kids'];
    const gendersFromData = new Set(
      dataVoice.flatMap((voice) =>
        voice.classnamearray
          .split(',')
          .filter((item) => allGenders.includes(item)),
      ),
    );
    return ['All', ...gendersFromData].map((gender) => ({ gender }));
  }, [dataVoice]);

  const filteredVoices = useMemo(() => {
    return dataVoice
      .filter((voice) => {
        const matchesCategory =
          selected === 'All ✅' || voice.classification === selected;
        const matchesGender =
          selectedGender === 'All' ||
          voice.classnamearray.includes(selectedGender);
        const matchesSearch = voice.name
          .toLowerCase()
          .includes(search.toLowerCase());
        return matchesCategory && matchesSearch && matchesGender && voice.name;
      })
      .slice(0, 9);
  }, [selected, selectedGender, dataVoice, search]);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };
  const handleSelectGender = (gender: any) => {
    setSelectedGender(gender);
    setShowDropDown(false);
  };

  const handleSelectVoice = async (speaker: any, name: any, image: any) => {
    setSelectedVoice(speaker);
    setVoiceName(name);
    setSelectImage(image);
  };
  const styleContainer = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        flex: 1,
        backgroundColor: '#25314A',
      },
    ],
    [theme],
  );
  const handleGenerate = () => {
    if (isLoaded && isShowAds && selectedVoice) {
      show();
    } else if (error && selectedVoice) {
      navigation.navigate('VoiceLoading', dataDetail);
    }
  };
  useEffect(() => {
    if (isClosed) {
      navigation.navigate('VoiceLoading', dataDetail);
    }
  }, [isClosed]);

  // useEffect(() => {
  //   const apiUrl = 'https://api.topmediai.com/v1/voices_list';

  //   const headers = {
  //     'Content-Type': 'application/json',
  //     // enable when call api get voice list
  //     'x-api-key': 'ed1cd96cc80a44d19c9a1258d3cad0cc',
  //   };

  //   axios
  //     .get<{ Voice: Voice[] }>(apiUrl, { headers })
  //     .then((response: any) => {
  //       setDataListVoice(response.data.Voice);
  //       setIsLoading(false);
  //     })
  //     .catch((error: any) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  // useEffect(() => {
  //   const apiUrl = 'https://api.topmediai.com/v1/clone_voices_list';

  //   const headers = {
  //     'Content-Type': 'application/json',
  //     // enable when call api clone voice list
  //     'x-api-key': 'ed1cd96cc80a44d19c9a1258d3cad0cc',
  //   };

  //   axios
  //     .get(apiUrl, { headers })
  //     .then((response: any) => {
  //       setDataListVoice(response.data);
  //       console.log(response.data, 'response');
  //     })
  //     .catch((error: any) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  return (
    <LinearGradient colors={['#243247', '#12121a']} style={{ flex: 1 }}>
      <SafeAreaView style={styleContainer}>
        {/* {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' color='#FFFFFF' />
          </View>
        ) : ( */}
        <View
          style={{
            flex: 1,
            width: '100%',
            paddingTop: Platform.select({
              ios: 0,
              android: 48,
            }),
          }}>
          <View style={{ paddingHorizontal: 16 }}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 20,
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('BottomTabNavigator', {
                    screen: 'HomeNavigator',
                  })
                }>
                <IconBack />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#ffffff',
                  fontSize: 18,
                  textAlign: 'center',
                  fontWeight: '700',
                }}>
                {t('Select AI Voice')}
              </Text>
              <View />
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: 16,
                }}>
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                  }}>
                  <Searchbar
                    placeholder='Search voice'
                    onChangeText={onChangeSearch}
                    value={search}
                    iconColor='#ffffff'
                    placeholderTextColor='#525B74'
                    style={{
                      backgroundColor: '#141928',
                      borderRadius: 12,
                      borderColor: '#B859AE',
                      borderWidth: 2,
                      borderRightWidth: 0,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      height: 55,
                    }}
                  />
                </View>
                <View>
                  <TouchableOpacity activeOpacity={1} onPress={toggleDropDown}>
                    <LinearGradient
                      colors={['#F18D97', '#A346B7']}
                      style={{
                        width: 95,
                        height: 55,
                        borderWidth: 1,
                        borderColor: '#B859AE',
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: showDropDown ? 0 : 10,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '700',
                          textAlign: 'center',
                          color: '#ffffff',
                        }}>
                        {t(selectedGender)}
                      </Text>
                      <View>
                        <IconDropDown />
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          {showDropDown && (
            <View
              style={{
                position: 'absolute',
                width: 95,
                right: 16,
                top: 154,
                zIndex: 3,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderWidth: 2,
                borderColor: '#B859AE',
                backgroundColor: '#141928',
                padding: 8,
              }}>
              {genders.map((item) => (
                <TouchableOpacity
                  style={{
                    marginBottom: 20,
                    width: '100%',
                  }}
                  onPress={() => handleSelectGender(item.gender)}>
                  {selectedGender === item.gender ? (
                    <LinearGradient
                      colors={['#A245B8', '#F48F95']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={{
                        height: 36,
                        justifyContent: 'center',
                        paddingLeft: 8,
                        borderRadius: 10,
                      }}>
                      <Text
                        style={{
                          fontWeight: '700',
                          fontSize: 18,
                          color: '#fff',
                        }}>
                        {item.gender}
                      </Text>
                    </LinearGradient>
                  ) : (
                    <Text
                      style={{
                        fontWeight: '700',
                        fontSize: 18,
                        color: '#fff',
                      }}>
                      {item.gender}
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
          <>
            <ScrollView
              style={{
                maxHeight: SCREEN_HEIGHT * 0.68,
              }}>
              <View
                style={{
                  paddingLeft: 16,
                  paddingBottom: 20,
                }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {categories.map((item) => (
                    <TouchableOpacity
                      onPress={() => setSelected(item.classification)}
                      activeOpacity={1}
                      style={{ marginRight: 10 }}>
                      {item.classification === selected ? (
                        <LinearGradient
                          colors={['#F28E96', '#9F42B9']}
                          style={{
                            height: 32,
                            borderRadius: 15,
                            borderWidth: 0.8,
                            borderColor: '#FFFFFF26',
                            shadowColor: '#000000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 12,
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '700',
                              color: '#ffffff',
                            }}>
                            {item.classification}
                          </Text>
                        </LinearGradient>
                      ) : (
                        <View
                          style={{
                            height: 32,
                            borderRadius: 15,
                            borderWidth: 0.75,
                            borderColor: '#B859AE26',
                            shadowColor: '#000000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 11.63,
                            backgroundColor: '#141928',
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '700',
                              color: '#ffffff',
                            }}>
                            {item.classification}
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View
                style={{
                  paddingLeft: 14,
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}>
                {filteredVoices.map((item) => (
                  <View
                    key={item.speaker}
                    style={{
                      width: '33%',
                      marginBottom: 12,
                    }}>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() =>
                        handleSelectVoice(item.speaker, item.name, item.image)
                      }
                      disabled={item.premium == true}
                      style={{ position: 'relative' }}>
                      <LinearGradient
                        colors={
                          selectedVoice === item.speaker
                            ? ['#EA869A', '#B254B1']
                            : ['#243247', '#243247']
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: 12,
                          paddingBottom: 12,
                          borderRadius: 20,
                          width: 124,
                          height: 124,
                        }}>
                        <View>
                          <Image
                            source={{ uri: item.image }}
                            style={{
                              width: 110,
                              height: 110,
                              borderRadius: 20,
                            }}
                          />
                          {item.premium && !resultContext.isPremium && (
                            <View
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(217, 217, 217, 0.5)',
                                borderRadius: 20,
                              }}>
                              <Image
                                source={require('~/resources/images/SearchVoice/lock.png')} // Ensure the path to your clock icon is correct
                                style={{ width: 89, height: 89 }}
                              />
                            </View>
                          )}
                        </View>
                      </LinearGradient>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingBottom: 20,
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '700',
                            textAlign: 'center',
                            color: '#fff',
                          }}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          </>
          <View
            style={{
              position: 'absolute',
              bottom: 32,
              width: '100%',
              alignItems: 'center',
              gap: 12,
            }}>
            <TextGradient
              colors={['#F89393', '#9A3EBB']}
              style={{ fontSize: 15, fontWeight: '300' }}>
              {t('Please select a voice before generating')}
            </TextGradient>
            <GradientButton
              height={74}
              radius={10}
              width={SCREEN_WIDTH - 68}
              onPress={() => handleGenerate()}>
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  color: '#fff',
                  fontSize: 18,
                }}>
                {t('Generate')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                }}>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    color: '#fff',
                    fontSize: 11,
                  }}>
                  {t('Watch ad to Generate')}
                </Text>
                <IconVideo />
              </View>
            </GradientButton>
          </View>
        </View>
        {/* )} */}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SearchVoice;
