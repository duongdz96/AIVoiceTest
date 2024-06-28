import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Platform,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SwipeListView } from 'react-native-swipe-list-view';

import usePreferenceActionsContext from '~/hooks/usePreferenceActionsContext';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import IconDelete from '~/resources/Icons/IconDelete';
import { useAppTheme } from '~/resources/theme';

import ConfirmModal from '~/screens/components/ModalComponent/ConfirmModal';

import TextGradient from '~/base/TextGradient';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const HistoryPage = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();

  const [haveFile, setHaveFile] = useState(true);
  const [countHistory, setCountHistory] = useState(0);
  const actionButton = usePreferenceContext();
  const actionMethod = usePreferenceActionsContext();
  const dataHistory = actionButton.result.History;

  //Data to list view
  const [data, setData] = useState(dataHistory);
  const fetchData = async () => {
    const savedHistory = await AsyncStorage.getItem('dataHistory');
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      actionMethod.setActionHistory?.(parsedHistory);
      setData(parsedHistory.slice().reverse());
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  const [selectMode, setSelectMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [anySelectedItems, setAnySetSelectedItems] = useState(false);

  const [viewModal, setViewModal] = useState(false);
  const [itemSwipping, setItemSwipping] = useState(null);
  const [messageFromModal, setMessageFromModal] = useState('');

  const handleDelete = async (id: string) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    actionMethod.setActionHistory?.(updatedData);
    await AsyncStorage.setItem('dataHistory', JSON.stringify(updatedData));
  };

  const handleItemPress = (id: string) => {
    if (selectMode) {
      const updatedData = data.map((item) => {
        if (item.id === id) {
          return { ...item, selected: !item.selected };
        }
        return item;
      });
      setData(updatedData);
    }
  };

  const renderHiddenItem = (data: any, rowMap: any) => (
    <View style={styles.rowBack}>
      <View style={styles.itemBack}>
        <TouchableOpacity
          onPress={() => {
            setViewModal(true);
            setItemSwipping({ rowKey: data.item.id, rowMap });
          }}
          style={{
            width: 80,
            height: '100%',
            backgroundColor: '#D90909',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}>
          <Image
            source={require('~/resources/Icons/History/DeleteIcon.png')}
            style={{ width: 29, height: 33 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const onRowDidOpen = (rowKey: string, rowMap: any) => {
    if (selectMode) {
      handleItemPress(rowKey);
    }
  };

  const closeRow = (
    rowMap: { [x: string]: { closeRow: () => void } },
    rowKey: string | number,
  ) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    setSelectedItems([]);
  };

  const toggleItemSelection = (id: any) => {
    let updatedSelectedItems;
    if (selectedItems.includes(id)) {
      updatedSelectedItems = selectedItems.filter((itemKey) => itemKey !== id);
    } else {
      updatedSelectedItems = [...selectedItems, id];
    }
    setSelectedItems(updatedSelectedItems);
  };

  const renderItem = (
    data: {
      item: {
        title: string;
        description: string;
        time: string;
        id: string;
        urlVoice: string;
        image: string;
        selected: boolean;
      };
    },
    rowMap: any,
  ) => {
    const isSelected = selectedItems.includes(data.item.id);
    return (
      <TouchableHighlight
        activeOpacity={1}
        underlayColor='rgba(255, 255, 255, 0)'
        onPress={() =>
          selectMode
            ? toggleItemSelection(data.item.id)
            : navigation.navigate('DetailHistory', { data: data.item })
        }>
        <View
          style={[
            styles.rowFront,
            isSelected ? styles.selectedItem : styles.notSelectedItem,
          ]}>
          <View
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 20,
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: '100%',
                alignItems: 'center',
              }}>
              <Image
                source={{ uri: data.item.image }}
                style={{
                  width: 56,
                  height: 56,
                  marginLeft: 22,
                  marginRight: 22,
                  marginTop: 12,
                }}
              />
              <Text
                numberOfLines={3}
                style={{
                  fontSize: 12,
                  fontWeight: '700',
                  color: '#FFFFFF',
                  marginTop: 4,
                }}>
                {data.item.title}
              </Text>
            </View>

            <LinearGradient
              colors={['#F48F95', '#A245B8']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderBottomRightRadius: 20,
                borderTopRightRadius: 20,
                borderLeftWidth: 1,
                borderLeftColor: '#B859AE',
                flex: 2,
              }}>
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  padding: 14,
                  height: '100%',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <Text
                  numberOfLines={3}
                  style={{ fontSize: 15, fontWeight: '700', color: '#FFFFFF' }}>
                  {data.item.description}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{ fontSize: 11, fontWeight: '700', color: '#FFFFFF' }}>
                  {data.item.time}
                </Text>
              </View>
            </LinearGradient>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  const handleDeleteItems = async (selectedItems: string | string[]) => {
    const updatedData = data.filter((item) => !selectedItems.includes(item.id));
    actionMethod.setActionHistory?.(updatedData);
    await AsyncStorage.setItem('dataHistory', JSON.stringify(updatedData));
    setData(updatedData);
    setSelectedItems([]);
  };

  // Update Count History
  useEffect(() => {
    setCountHistory(data.length);
    if (data.length === 0) {
      setHaveFile(false);
    }
  }, [data.length]);

  // Update state Delete Button
  useEffect(() => {
    if (selectedItems.length > 0) {
      setAnySetSelectedItems(true);
    } else {
      setAnySetSelectedItems(false);
    }
  }, [selectedItems, viewModal]);

  const styleContainer = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        flex: 1,
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 30 : 0,
      },
    ],
    [theme],
  );

  const NotHaveHistory = ({}) => {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <View style={{ width: '100%', marginTop: 30 }}>
          <Text
            style={{
              fontWeight: '700',
              color: '#FFFFFF',
              fontSize: 18,
              textAlign: 'center',
            }}>
            {t('History')}
          </Text>
        </View>

        <View
          style={{
            marginTop: 180,
            width: '100%',
          }}>
          <Text
            style={{
              fontWeight: '700',
              color: '#525B74',
              fontSize: 25,
              textAlign: 'center',
            }}>
            {t('No History Found')}
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('CreateText')}
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: 37,
            }}>
            <LinearGradient
              colors={['#F28E96', '#A043B9']}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={{
                width: 170,
                height: 50,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  color: '#FFFFFF',
                  fontSize: 18,
                  textAlign: 'center',
                }}>
                {t('Create New')}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const closeModal = () => {
    setViewModal(false);
    if (!selectMode) {
      closeRow(itemSwipping.rowMap, itemSwipping.rowKey);
    }
    setAnySetSelectedItems(true);
    setMessageFromModal('');
  };

  const confirmDelete = () => {
    handleDelete(itemSwipping.rowKey);
    setViewModal(false);
    setAnySetSelectedItems(null);
    setMessageFromModal('');
  };

  const handleChildMessage = (message: React.SetStateAction<string>) => {
    setMessageFromModal(message);
  };

  useEffect(() => {
    if (messageFromModal === 'Cancel') {
      closeModal();
    } else if (messageFromModal === 'Confirm') {
      if (selectMode) {
        handleDeleteItems(selectedItems);
        setViewModal(false);
        setMessageFromModal('');
      } else {
        confirmDelete();
      }
    } else {
      setViewModal(false);
    }
  }, [messageFromModal]);

  return (
    <LinearGradient
      colors={['#243247', '#12121a']}
      style={{ flex: 1, paddingHorizontal: 20 }}>
      {viewModal && <ConfirmModal onMessage={handleChildMessage} />}
      <SafeAreaView style={styleContainer}>
        {haveFile ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'space-between',
              flexDirection: 'column-reverse',
            }}>
            <View style={{ width: '100%', height: '100%' }}>
              <View
                style={{
                  width: '100%',
                  height: 29,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <LinearGradient
                  colors={['#F28E96', '#9F42B9']}
                  style={{
                    width: 60,
                    height: 29,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: '700',
                      color: '#FFFFFF',
                      fontSize: 15,
                    }}>
                    {countHistory}
                    {!actionButton.isPremium ? '/10' : null}
                  </Text>
                </LinearGradient>

                <Text
                  style={{
                    fontWeight: '700',
                    color: '#FFFFFF',
                    fontSize: 18,
                  }}>
                  {t('History')}
                </Text>

                <View
                  style={{
                    width: 60,
                    height: 29,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity onPress={toggleSelectMode}>
                    <IconDelete />
                  </TouchableOpacity>
                </View>
              </View>

              {selectMode && (
                <View
                  style={{
                    width: '100%',
                    height: 52,
                    justifyContent: 'center',
                  }}>
                  <TextGradient
                    colors={['#F28E96', '#A245B7']}
                    style={{
                      fontWeight: '700',
                      fontSize: 18,
                      textAlign: 'center',
                      padding: 0,
                      margin: 0,
                      height: 22,
                    }}>
                    {t('Select item to delete')}
                  </TextGradient>
                </View>
              )}

              <View
                style={
                  selectMode
                    ? {
                        flex: 1,
                        marginBottom: 220,
                        marginTop: 0,
                      }
                    : {
                        flex: 1,
                        marginBottom: 107,
                        marginTop: 21,
                      }
                }>
                <SwipeListView
                  data={data}
                  renderItem={renderItem}
                  renderHiddenItem={renderHiddenItem}
                  onRowDidOpen={onRowDidOpen}
                  rightOpenValue={-80}
                  disableRightSwipe={true}
                  disableLeftSwipe={selectMode ? true : false}
                  stopRightSwipe={-80}
                  style={{}}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{}}
                />
              </View>
            </View>

            {selectMode && (
              <TouchableOpacity
                onPress={() => (anySelectedItems ? setViewModal(true) : {})}
                style={{
                  width: '100%',
                  height: 60,
                  backgroundColor: anySelectedItems ? '#D90909' : '#E45353',
                  marginBottom: 155,
                  position: 'absolute',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#F18D96',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 18,
                    textAlign: 'center',
                    color: '#FFFFFF',
                  }}>
                  {t('Delete')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <NotHaveHistory />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HistoryPage;

const styles = StyleSheet.create({
  rowFront: {
    justifyContent: 'center',
    height: 100,
    marginTop: 15,
    borderRadius: 20,
  },
  selectedItem: {
    borderWidth: 6,
    borderColor: '#D90909',
  },
  notSelectedItem: {
    borderWidth: 1,
    borderColor: '#B859AE',
  },
  rowBack: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    height: 100,
    marginTop: 15,
    paddingHorizontal: 2,
  },
  itemBack: {
    width: 120,
    height: '100%',
    backgroundColor: '#D90909',
    flexDirection: 'row-reverse',
    borderRadius: 20,
  },
});
