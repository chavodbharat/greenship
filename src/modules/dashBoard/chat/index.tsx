import React, {useEffect, useState} from 'react';
import styles from './styles';
import {View, Text, SafeAreaView, FlatList, Image, Pressable} from 'react-native';
import { useTheme } from '../../../providers/ThemeProvider';
import {scale, verticalScale} from '../../../theme/responsive';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import Spinner from '../../../components/spinner';
import Header from '../../../components/header';
import { getLoginUserFriendList } from '../../../redux/actions/memberAction';
import { serviceUrl } from '../../../utils/Constants/ServiceUrls';
import { navigate } from '../../../routing/navigationRef';
import { CHAT_DETAILS_SCREEN } from './chatDetails';
import { darkColors } from '../../../theme/colors';

export const CHAT_LIST_SCREEN = {
  name: 'ChatList',
};

const ChatList = () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [state, setState] = useState({
    loader: false,
    allFriendListData: []
  });

  const {userData} = useSelector(
    state => ({
      userData: state.auth?.loginData,
    }),
    shallowEqual,
  );

  useEffect(() => {
    callFriendListFn();
  }, [isFocused, userData?.id]);

   //Get Friend List
   const callFriendListFn = () => {
    setState(prev => ({...prev, loader: true}));
    dispatch(
      getLoginUserFriendList((res: any) => {
        if(res){
          fetchData(res);
        }
      }),
    );
  };

  const fetchData = async (fields: any) => {
    // Map array to an array of Promises for API requests
    try {
      const promises = fields.map(async (obj: any, index: number) => {
        if(Object.keys(obj).length > 0) {
          try {
            let finalId = obj.friend_id;
            if(userData?.id == obj.friend_id) {
              finalId = obj.initiator_id;
            }
            const response = await fetch(`${serviceUrl.apiUrl}buddypress/v1/members/${finalId}`);
            const responseJson = await response.json();
            if(!responseJson.message){
              obj.name = responseJson.name;
              obj.avatar_urls = responseJson.avatar_urls;
            }
            return obj;
          } catch(error){
              console.error(error);
          }
        }
      });
      const newData = await Promise.all(promises); 
      setState(prev => ({...prev, allFriendListData: newData, loader: false}));     
    } catch (error) {
    
    }
  };
  
  const renderFriendItem = ({item, index}: any) => {
    let finalId = item.friend_id;
    if(userData?.id == item.friend_id) {
      finalId = item.initiator_id;
    }
    return (
      (item.name &&
        <Pressable
          onPress={() => navigate(CHAT_DETAILS_SCREEN.name, {friendId: finalId,
            userName: item.name})}>
          <View style={[styles.flexDirectionRowView,{marginTop: verticalScale(10),
            marginBottom: verticalScale(10)}]}>
            <View style={styles.flexZeroView}>
              <Image
                style={styles.groupeFriendsIconStyle}
                source={{uri: item.avatar_urls?.full}}/>
            </View>
            <View style={[styles.flexOneView,{marginLeft: scale(10), justifyContent: 'center'}]}>
              <Text style={styles.groupNameTextStyle}>{item.name}</Text>
            </View>
          </View>
        </Pressable>
      )
    )
  }
  
  return (
    <SafeAreaView style={[styles.flexOneView,{backgroundColor: colors.white}]}>
      <Spinner visible={state?.loader} color={colors.communityGreenColor} />
      <Header statusBarColor={colors.communityGreenColor} />
      <View style={[styles.flexOneView, {paddingLeft: scale(15), paddingRight: scale(15), 
        justifyContent: 'center'}]}>
        {(state.allFriendListData.length > 0 && !state.loader) ?
          <FlatList
            data={state.allFriendListData}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => (
              <View style={{ backgroundColor: darkColors.dontHaveColor, height: scale(0.3) }} />
            )}
            renderItem={renderFriendItem}
          />
          :
          (!state.loader &&
            <View style={styles.noDataViewStyle}>
              <Text style={[styles.tabLabelStyle, {color: colors.dontHaveColor}]}>Friend list not found</Text>
            </View>
          )
        }
      </View>
    </SafeAreaView>
  );
};

export default ChatList;
