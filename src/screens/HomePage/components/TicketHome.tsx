import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';

import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import GradientButton from '~/base/GradientButton';

interface TicketHomeProps {
  title: string;
  content: string;
  icon?: JSX.Element;
  onPress: () => void;
  image: () => void;
}

const TicketHome = ({
  title,
  content,
  icon,
  onPress,
  image,
}: TicketHomeProps) => {
  const { t } = useTranslation();
  return (
    <View
      style={{
        width: SCREEN_WIDTH - 38,
        borderWidth: 2,
        borderColor: '#B859AE',
        borderRadius: 15,
        paddingBottom: 12,
      }}>
      <Image
        source={image}
        style={{ width: '100%', height: 200 }}
        resizeMode='cover'
      />
      <View style={{ position: 'absolute', left: 24, top: 18, gap: 16 }}>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <View
            style={{
              width: 32,
              height: 32,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#2e2f3dd7',
              borderRadius: 100,
              borderWidth: 1,
              borderColor: '#F0F7FF70',
            }}>
            {icon}
          </View>
          <Text
            style={{ fontFamily: 'Inter-Bold', color: '#fff', fontSize: 15 }}>
            {title}
          </Text>
        </View>
        <View style={{ marginRight: 40 }}>
          <Text
            style={{
              fontFamily: 'Inter-Bold',
              color: '#fff',
              fontSize: 28,
            }}>
            {content}
          </Text>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 12,
          width: '100%',
        }}>
        <GradientButton
          onPress={onPress}
          height={40}
          width={280}
          radius={10}
          style={{ alignSelf: 'center' }}>
          <Text style={{ fontWeight: '600', color: '#fff', fontSize: 12 }}>
            {t('Create New')}
          </Text>
        </GradientButton>
      </View>
    </View>
  );
};
export default TicketHome;
