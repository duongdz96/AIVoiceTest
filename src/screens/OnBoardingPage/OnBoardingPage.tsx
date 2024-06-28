import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import getImage from '~/libs/getImage';

import { useAppTheme } from '~/resources/theme';

import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const OnboardingPage = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();

  const styleContainer = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        paddingTop: 50,
      },
    ],
    [theme],
  );
  const imageList = [
    { id: '1', source: require('~/resources/images/Onborading/image1.png') },
    { id: '2', source: require('~/resources/images/Onborading/image2.png') },
    { id: '3', source: require('~/resources/images/Onborading/image3.png') },
    { id: '4', source: require('~/resources/images/Onborading/image4.png') },
    { id: '33', source: require('~/resources/images/Onborading/image6.png') },
    { id: '13', source: require('~/resources/images/Onborading/image5.png') },
    { id: '5', source: require('~/resources/images/Onborading/image7.png') },
    { id: '6', source: require('~/resources/images/Onborading/image8.png') },
    { id: '7', source: require('~/resources/images/Onborading/image9.png') },
    { id: '8', source: require('~/resources/images/Onborading/image10.png') },
    { id: '9', source: require('~/resources/images/Onborading/image11.png') },
    { id: '10', source: require('~/resources/images/Onborading/image12.png') },

    { id: '12', source: require('~/resources/images/Onborading/image12.png') },
    { id: '14', source: require('~/resources/images/Onborading/image13.png') },
    { id: '15', source: require('~/resources/images/Onborading/image14.png') },
    { id: '16', source: require('~/resources/images/Onborading/image15.png') },
    { id: '17', source: require('~/resources/images/Onborading/image16.png') },
    { id: '18', source: require('~/resources/images/Onborading/image17.png') },
    { id: '19', source: require('~/resources/images/Onborading/image19.png') },
    { id: '20', source: require('~/resources/images/Onborading/image25.png') },
  ];
  const renderItem = ({ item }) => (
    <Image
      source={item.source}
      style={{ width: 75, height: 75, marginBottom: 20 }}
    />
  );
  return (
    <ImageBackground
      source={getImage('backgroundCreateNewVoice')}
      style={{ flex: 1 }}>
      <View style={styleContainer}>
        <SafeAreaView style={{ width: '100%', paddingTop: 20 }}>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 24,
            }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={getImage('Logo')}
                style={{ width: 75, height: 75 }}
              />
            </View>
            <View>
              <Image
                source={getImage('TitleVoice')}
                style={{ width: '100%', height: 90, resizeMode: 'contain' }}
              />
            </View>
            <View style={{ width: '100%' }}>
              <View
                style={{
                  width: '100%',
                }}>
                <FlatList
                  data={imageList}
                  numColumns={4}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  columnWrapperStyle={{ justifyContent: 'space-between' }}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
        <TouchableOpacity
          onPress={() => navigation.navigate('LastOnBoardingPage')}
          style={{
            position: 'absolute',
            bottom: 33,
            width: '90%',
            alignItems: 'center',
          }}>
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
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>
              {t('Continue ->')}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default OnboardingPage;
