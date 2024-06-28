import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import i18n from 'i18next';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

interface SelectLanguage {
  selectLanguage: (language: string) => void;
}

const SelectLanguage = ({ selectLanguage }: SelectLanguage): JSX.Element => {
  const navigation = useNavigation<RootNavigatorNavProps>();
  const { t } = useTranslation();

  const languageCurrent = i18n.language;

  const [Language, setLanguage] = useState(languageCurrent);

  useEffect(() => {
    const loadLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem('languageApp');
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    };
    loadLanguage();
  }, []);

  const language = [
    {
      title: t('English'),
      language: 'en_English',
      icon: (
        <Image
          source={require('../../resources/images/Language/english.png')}
          style={{ width: 28, height: 28 }}
        />
      ),
    },
    {
      title: t('Hindi'),
      language: 'hi_Hindi',
      icon: (
        <Image
          source={require('../../resources/images/Language/Hindi.png')}
          style={{ width: 28, height: 28 }}
        />
      ),
    },
    {
      title: t('Portuguese'),
      language: 'pt_Portuguese',
      icon: (
        <Image
          source={require('../../resources/images/Language/Por.png')}
          style={{ width: 28, height: 28 }}
        />
      ),
    },
    {
      title: t('Spanish'),
      language: 'es_Spanish',
      icon: (
        <Image
          source={require('../../resources/images/Language/Spanish.png')}
          style={{ width: 28, height: 28 }}
        />
      ),
    },
    {
      title: t('Indonesian'),
      language: 'id_Indonesian',
      icon: (
        <Image
          source={require('../../resources/images/Language/Indonesian.png')}
          style={{ width: 28, height: 28 }}
        />
      ),
    },
    {
      title: t('Korean'),
      language: 'ko_Korean',
      icon: (
        <Image
          source={require('../../resources/images/Language/Korean.png')}
          style={{ width: 28, height: 28 }}
        />
      ),
    },
  ];

  const handSelect = async (item: any) => {
    setLanguage(item.language);
    selectLanguage(item.language);
    i18n.changeLanguage(item.language);
    await AsyncStorage.setItem('languageApp', Language);
  };

  return (
    <>
      <View style={styles.listItem}>
        {language.map((item) => (
          <LinearGradient
            colors={['#E6ABB7', '#BC42CD']}
            style={styles.contentItemBack}>
            <View
              style={{ flex: 1, backgroundColor: '#090D1A', borderRadius: 5 }}>
              <TouchableOpacity
                key={item.language}
                style={
                  Language === item?.language ? styles.active : styles.item
                }
                onPress={() => [handSelect(item)]}>
                <View style={styles.contentItem}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      marginRight: 10,
                    }}>
                    <LinearGradient
                      colors={['#E6ABB7', '#BC42CD']}
                      style={{
                        flex: 1,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: 15,
                          height: 15,
                          backgroundColor: '#090D1A',
                          borderRadius: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {item.language === languageCurrent && (
                          <LinearGradient
                            colors={['#E6ABB7', '#BC42CD']}
                            style={{
                              borderRadius: 20,
                              width: 10,
                              height: 10,
                            }}
                          />
                        )}
                      </View>
                    </LinearGradient>
                  </View>

                  <View style={styles.leftItem}>
                    <View>{item.icon}</View>
                    <Text
                      style={[
                        styles.textItem,
                        {
                          color:
                            Language === item?.language ? '#FFFFFF' : '#FFFFFF',
                        },
                      ]}>
                      {item.title}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        ))}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 24,
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: -20,
  },
  item: {
    borderRadius: 7,
    marginBottom: 8,
    borderWidth: 0,
  },
  active: {
    borderRadius: 7,
    borderWidth: 0,
  },
  contentItem: {
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    justifyContent: 'flex-start',
    borderRadius: 5,
  },
  textItem: {
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 8,
  },
  leftItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentItemBack: {
    height: 54,
    justifyContent: 'flex-start',
    borderRadius: 5,
    padding: 1,
    marginTop: 10,
  },
});

export default SelectLanguage;
