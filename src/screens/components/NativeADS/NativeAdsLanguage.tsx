import remoteConfig from '@react-native-firebase/remote-config';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Platform, Text, View } from 'react-native';
import NativeAdView, {
  CallToActionView,
  HeadlineView,
  IconView,
  ImageView,
  TaglineView,
} from 'react-native-admob-native-ads';
import Config from 'react-native-config';
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator } from 'react-native-paper';

// import { ANDROID_NATIVE_CREATE_VOICE, IOS_NATIVE__CREATE_VOICE } from '@env';

const NativeAdsLanguage = React.memo(({ dataAds }: any): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const nativeAdRef = useRef<NativeAdView>(null);

  // const ID_Native =
  //   Platform.OS === 'android'
  //     ? Config?.ANDROID_NATIVE_CREATE_VOICE
  //     : Config?.IOS_NATIVE__CREATE_VOICE;

  const onAdFailedToLoad = (event) => {
    setError(true);
    setLoading(false);
    console.log('AD', 'FAILED', event);
  };

  const onAdLoaded = () => {
    console.log('AD', 'LOADED', 'Ad has loaded successfully');
  };

  const onAdClicked = () => {
    console.log('AD', 'CLICK', 'User has clicked the Ad');
  };

  const onAdImpression = () => {
    console.log('AD', 'IMPRESSION', 'Ad impression recorded');
  };

  const onNativeAdLoaded = (event: any) => {
    console.log('AD', 'RECIEVED', 'Unified ad  Recieved', event);
    setLoading(false);
    setLoaded(true);
    setError(false);
  };

  const onAdLeftApplication = () => {
    console.log('AD', 'LEFT', 'Ad left application');
  };

  useEffect(() => {
    if (!loaded) {
      nativeAdRef.current?.loadAd();
    } else {
      console.log('AD', 'LOADED ALREADY');
    }
  }, [loaded]);
  console.log(dataAds, '1111');

  return (
    <NativeAdView
      ref={nativeAdRef}
      onAdLoaded={onAdLoaded}
      onAdFailedToLoad={onAdFailedToLoad}
      onAdLeftApplication={onAdLeftApplication}
      onAdClicked={onAdClicked}
      onAdImpression={onAdImpression}
      onNativeAdLoaded={onNativeAdLoaded}
      refreshInterval={60000}
      style={{
        width: '100%',
      }}
      videoOptions={{
        customControlsRequested: true,
      }}
      mediationOptions={{
        nativeBanner: true,
      }}
      adUnitID={dataAds}>
      <View
        style={{
          width: '100%',
          height: 250,
          alignItems: 'center',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          paddingTop: 8,
          backgroundColor: '#D4D7D8',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#f0f0f0',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: !loading && !error && loaded ? 0 : 1,
            zIndex: !loading && !error && loaded ? 0 : 10,
          }}>
          {!loading && <ActivityIndicator size={28} color='#a9a9a9' />}
          {error && <Text style={{ color: '#a9a9a9' }}>:-(</Text>}
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingLeft: 40,
            marginBottom: 8,
            opacity: loading || error || !loaded ? 0 : 1,
          }}>
          <LinearGradient
            colors={['rgba(244, 144, 149, 1)', 'rgba(159, 66, 185, 1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              position: 'absolute',
              top: -8,
              left: 0,
              backgroundColor: '#76BCF5',
              padding: 4,
            }}>
            <Text style={{ color: '#FFF', fontSize: 10 }}>Ad</Text>
          </LinearGradient>
          <IconView
            style={{
              width: 40,
              height: 40,
            }}
          />
          <View
            style={{
              paddingHorizontal: 12,
              flexShrink: 1,
            }}>
            <HeadlineView
              style={{
                fontWeight: '500',
                color: '#000',
                marginBottom: 4,
                fontSize: 12,
              }}
            />
            <TaglineView
              numberOfLines={2}
              style={{
                fontSize: 10,
                color: '#000',
              }}
            />
          </View>
        </View>
        <ImageView
          style={{
            width: 200,
            height: 120,
            borderRadius: 8,
            marginBottom: 12,
            marginTop: 20,
          }}
          resizeMode='cover'
        />

        <CallToActionView
          style={[
            {
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 10,
              height: 44,
              width: Dimensions.get('screen').width - 40,
              backgroundColor: 'rgba(245, 145, 149, 1)',
            },
            Platform.OS === 'ios'
              ? {
                  borderRadius: 40,
                }
              : {},
          ]}
          buttonAndroidStyle={{
            borderRadius: 40,
          }}
          allCaps
          textStyle={{
            fontSize: 16,
            fontWeight: '500',
            flexWrap: 'wrap',
            textAlign: 'center',
            color: 'white',
          }}
        />
      </View>
    </NativeAdView>
  );
});
export default NativeAdsLanguage;
