import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

import IconBack from '~/resources/Icons/CreateNewVoice/IconBack';
import IconPremium from '~/resources/Icons/Home/IconPremium';

import GradientButton from '~/base/GradientButton';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

type headerTypes = {
  title: string;
};

const HeaderVoice = ({ title }: headerTypes) => {
  const navigation = useNavigation<RootNavigatorNavProps>();
  const { t } = useTranslation();
  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 28,
      }}>
      <TouchableOpacity
        style={{ width: 92 }}
        onPress={() => {
          navigation.goBack();
        }}>
        <IconBack />
      </TouchableOpacity>
      <Text style={{ fontFamily: 'Inter-Bold', color: '#fff', fontSize: 16 }}>
        {title}
      </Text>
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
  );
};
export default HeaderVoice;
