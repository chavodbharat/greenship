import React from 'react';
import styles from './styles';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import {darkColors} from '../../theme/colors';
import { ActionSheetTypePropsInterface } from './types';
import { scale } from '../../theme/responsive';

const ActionSheet = ({actionSheetItems, actionTextColor, onPressItem, onCancelPress}: ActionSheetTypePropsInterface) => {
  
  const dynamicActionSheetItems = [
    ...actionSheetItems,
  ]
  
  const CancelView = () => {
    return (
      <Pressable
        onPress={onCancelPress}>
        <View style={styles.cancelViewStyle}>  
          <Text allowFontScaling={false}
            style={[styles.actionSheetText, {color: darkColors.actionSheetCancelColor}]}>
            Cancel
          </Text>
        </View>
      </Pressable>
    )
  }

  const renderItem = ({item, index}: any) => {
    return (
      <Pressable
        onPress={() => onPressItem(index)}>
        <View style={[styles.actionSheetView,
          index === 0 && {
            borderTopLeftRadius: scale(10),
            borderTopRightRadius: scale(10),
          },
          index === dynamicActionSheetItems.length - 1 && {
            borderBottomLeftRadius: scale(10),
            borderBottomRightRadius: scale(10),
          },
          ]}>  
            {/* {item.image && 
              <Image 
                style={{width: 20, height: 20, alignSelf: 'center', marginRight: 10}}
                source={item.isLocalImage ? item.image : {uri: item.image}}/>
            } */}
            <Text allowFontScaling={false}
              style={[
              styles.actionSheetText,
              actionTextColor && {
                  color: actionTextColor
              }
            ]}>
              {item.title}
            </Text>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={styles.modalContent}>
      <FlatList
        data={dynamicActionSheetItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <CancelView/>
    </View>  
  );
};

export default ActionSheet;
