import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  Image,
  ImageBackground,
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

import GenerateVoice from '~/resources/Icons/Home/GenerateVoice';
import IconVoice from '~/resources/Icons/Home/IconVoice';
import TextToSpeech from '~/resources/Icons/Home/TextToPseech';

import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import TextGradient from '~/base/TextGradient';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

import HeaderCPn from '../components/HeaderCPn';
import TicketHome from './components/TicketHome';

const HomePage = (): JSX.Element => {
  const { t } = useTranslation();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const slideImage = [
    getImage('slideHome1'),
    getImage('slideHome2'),
    getImage('slideHome3'),
    getImage('slideHome4'),
    getImage('Adele'),
    getImage('TheRock'),
    getImage('Ariana'),
    getImage('Ariel'),
    getImage('TonyStark'),
  ];

  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollX, {
        toValue: SCREEN_WIDTH,
        duration: 5000,
        useNativeDriver: true,
      }),
    ).start();
  }, [scrollX]);

  const translateX = scrollX.interpolate({
    inputRange: [0, SCREEN_WIDTH],
    outputRange: [0, -SCREEN_WIDTH],
  });

  return (
    <LinearGradient colors={['#243247', '#12121a']} style={styles.main}>
      <SafeAreaView style={{ flex: 1, marginHorizontal: 18 }}>
        <ScrollView
          style={{ flex: 1 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, gap: 14 }}>
            <HeaderCPn />
            <LinearGradient
              colors={['#F89393', '#9A3EBB']}
              style={{ width: '100%', borderRadius: 20 }}>
              <ImageBackground
                source={getImage('imageBg')}
                style={{ padding: 12, gap: 14 }}>
                <Text
                  style={{
                    color: '#fff',
                    marginLeft: 22,
                    fontSize: 12,
                    fontFamily: 'Inter-Bold',
                  }}>
                  {t('AI Voice Generator')}
                </Text>
                <Animated.View
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                    transform: [{ translateX }],
                  }}>
                  {slideImage.map((item, index) => (
                    <Image
                      key={index}
                      source={item}
                      style={
                        index === 0 ? styles.styleSmall : styles.styleLarge
                      }
                    />
                  ))}
                </Animated.View>
                <View
                  style={{
                    marginLeft: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 0,
                      gap: -12,
                      justifyContent: 'flex-start',
                    }}>
                    <View
                      style={{
                        paddingTop: 6,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <IconVoice />
                    </View>
                    <Text
                      style={{
                        color: '#fff',
                        marginLeft: 22,
                        fontSize: 40,
                        textAlign: 'left',
                        fontFamily: 'Inter-Bold',
                      }}>
                      {t('Let’s see')}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 23,
                      fontWeight: '600',
                    }}>
                    {t('what can i do for you')}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: SCREEN_WIDTH - 106,
                    backgroundColor: '#fff',
                    height: 60,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginBottom: 20,
                    borderWidth: 1,
                    borderColor: '#A144B8',
                  }}
                  onPress={() =>
                    navigation.navigate('BottomTabNavigator', {
                      screen: 'LibraryNavigator',
                    })
                  }>
                  <TextGradient
                    colors={['#EC8899', '#A144B8']}
                    style={{ fontSize: 20, fontFamily: 'Inter-Bold' }}>
                    {t('Start Recording')}
                  </TextGradient>
                </TouchableOpacity>
              </ImageBackground>
            </LinearGradient>
            <View style={{ flexDirection: 'row', width: '100%', gap: 10 }}>
              <TicketHome
                image={getImage('ImageTicketLeft')}
                title={t('Text to Speech')}
                content='Only few seconds to complete your speech '
                icon={<TextToSpeech />}
                onPress={() => {
                  navigation.navigate('CreateText');
                }}
              />
              {/* <TicketHome
                image={getImage('ImageTicketRight')}
                title={t('Generate Voice')}
                content='Save your voice here for future experiences'
                icon={<GenerateVoice />}
                onPress={() => {
                  navigation.navigate('CreateNewVoice');
                }}
              /> */}
            </View>
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
  styleSmall: {
    width: 82,
    height: 82,
  },
  styleLarge: {
    width: 90,
    height: 90,
  },
});

export default HomePage;
