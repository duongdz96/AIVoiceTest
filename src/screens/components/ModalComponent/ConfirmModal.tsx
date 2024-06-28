import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Linking,
    Platform,
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Modal } from 'react-native-paper';

import useModalManager from '~/hooks/useModalManager';
import { useOrientation } from '~/hooks/useOrientation';
import usePreferenceActionsContext from '~/hooks/usePreferenceActionsContext';
import TextGradient from '~/base/TextGradient';

import { useAppTheme } from '~/resources/theme';

import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';


const ConfirmModal = (props): JSX.Element | null => {

    const actionMethod = usePreferenceActionsContext();
    const [username, setUserName] = useState('');
    const { isPortrait, ORIENTATION_WIDTH, ORIENTATION_HEIGH } = useOrientation();
    const [showAlert, setShowAlert] = useState(false);
    const theme = useAppTheme();
    const { t } = useTranslation();

    const Cancel = () => {
        props.onMessage('Cancel');
      };

    const Confirm = () => {
        props.onMessage('Confirm');
      };
    

    return (
        <View style={styles.modal}>
            <View style={{ alignItems: 'center', paddingTop: 16 }}>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: '#FFFFFF',
                    }}>
                    {t("Remove this audio?")}
                </Text>
                <Text
                    style={{
                        fontFamily: 'MerriweatherSans-Bold',
                        fontWeight: '400',
                        fontSize: 15,
                        color: '#FFFFFF',
                    }}>
                    {'This action cannot be undone'}
                </Text>
            </View>

            <View
                style={{ width: '100%', height: 55, flexDirection: 'row' }}
            >
                <TouchableOpacity
                    onPress={ () => Cancel() }
                    style={{
                        flex: 1,
                        borderTopWidth: 1,
                        borderRightWidth: 1,
                        borderTopColor: '#FFFFFF4D',
                        borderRightColor: '#FFFFFF4D',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    activeOpacity={1}
                    >
                    <TextGradient
                        colors={['#E7849B', '#B355B0']}
                        style={{
                            alignSelf: 'center',
                            fontWeight: '700',
                            fontSize: 18,
                        }}>
                        {'Cancel'}
                    </TextGradient>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={ () => Confirm() }
                    style={{
                        flex: 1,
                        borderTopWidth: 1,
                        borderTopColor: '#FFFFFF4D',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    activeOpacity={1}
                >
                    <Text
                        style={{
                            alignSelf: 'center',
                            fontWeight: '700',
                            fontSize: 18,
                            color: '#D90909'
                        }}>
                        {'Confirm'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modal: {
        alignItems: 'center',
        width: 271,
        height: 129,
        borderRadius: 12,
        backgroundColor: '#25314A',
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        position :'absolute',
        zIndex: 5,
        top : 309
    },
});

export default ConfirmModal;
