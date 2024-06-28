import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import React, { Image, Text, TouchableOpacity, View } from 'react-native';

import getImage from '~/libs/getImage';

import IconPremium from '~/resources/Icons/Home/IconPremium';
import IconSettingHeader from '~/resources/Icons/Home/IconSettingHeader';

import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import GradientButton from '~/base/GradientButton';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const HeaderCPn = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<RootNavigatorNavProps>();

  return (
    <View
      style={{
        height: 50,
        width: SCREEN_WIDTH - 36,
        alignSelf: 'center',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 4,
        }}>
        <Image
          style={{ height: 50, width: 50 }}
          source={getImage('imageHeader')}
        />
        <Text
          style={{ fontFamily: 'Inter-Bold', fontSize: 20, color: '#FEFBFF' }}>
          {t('Good Morning!')}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 10,
        }}>
        <TouchableOpacity
          style={{
            borderRadius: 100,
            borderWidth: 1,
            backgroundColor: '#141928',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 3,
            borderColor: '#ffffff43',
          }}>
          <IconSettingHeader
            onPress={() => navigation.navigate('SettingPage')}
          />
        </TouchableOpacity>
        <GradientButton
          width={92}
          radius={10}
          height={32}
          onPress={() => {
            navigation.navigate('PremiumPage');
          }}>
          <View
            style={{
              alignItems: 'center',
              gap: 4,
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}>
            <IconPremium />
            <Text
              style={{
                fontFamily: 'Inter-Bold',
                fontSize: 12,
                color: '#FEFBFF',
              }}>
              {t('Premium')}
            </Text>
          </View>
        </GradientButton>
      </View>
    </View>
  );
};
export default HeaderCPn;
