import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { useTopInset } from '~/hooks/useInset';

import IconBack from '~/resources/Icons/CreateNewVoice/IconBack';

import SelectLanguage from '~/screens/components/SelectLanguage';

import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const SelectLanguagePage = (): JSX.Element => {
  const { t } = useTranslation();
  const topInsets = useTopInset();
  const [Language, setLanguage] = useState('');
  console.log(
    '🚀 ~ file: SelectLanguagePage.tsx:28 ~ SelectLanguagePage ~ Language:',
    Language,
  );
  const navigation = useNavigation<RootNavigatorNavProps>();

  return (
    <LinearGradient colors={['#1E2E4C', '#020204']} style={{ flex: 1 }}>
      <View style={[styles.container, { paddingTop: topInsets }]}>
        <SafeAreaView style={styles.Area}>
          <View style={styles.content}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                position: 'absolute',
                left: 24,
                zIndex: 2,
              }}>
              <IconBack style={{ width: 33, height: 33 }} />
            </TouchableOpacity>

            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                paddingBottom: 24,
              }}>
              <Image
                source={require('~/resources/Icons/Setting/LanguageIcon.png')}
                style={{ width: 31, height: 29, marginRight: 10 }}
              />
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 18,
                  color: '#FFFFFF',
                }}>
                {t('Language')}
              </Text>
              <View />
            </View>
            <SelectLanguage
              selectLanguage={(language) => setLanguage(language)}
            />
          </View>
        </SafeAreaView>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  Area: {
    flex: 1,
  },
  content: {
    paddingLeft: 21,
    paddingRight: 21,
  },
});

export default SelectLanguagePage;
