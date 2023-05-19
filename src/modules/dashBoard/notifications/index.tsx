import React, { useEffect, useState } from 'react';
import styles from './styles';
import {View, Text, SafeAreaView, FlatList, Image, Pressable} from 'react-native';
import Spinner from '../../../components/spinner';
import { useTheme } from '../../../providers/ThemeProvider';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AllImages from '../../../utils/Constants/AllImages';
import { darkColors } from '../../../theme/colors';
import Header from '../../../components/header';
import { getNotificationList, updateFriendRequestStatus } from '../../../redux/actions/homeAction';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { serviceUrl } from '../../../utils/Constants/ServiceUrls';

const Notifications = () => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const isFocused = useIsFocused();
  const [state, setState] = useState({
    loader: false,
    notificationList: []
  });

  const {userData} = useSelector(
    state => ({
      userData: state.auth?.loginData,
    }),
    shallowEqual,
  );

  useEffect(() => {
    callNotificationListFn();
  }, [isFocused]);
  
  const callNotificationListFn = () => {
    setState(prev => ({...prev, loader: true}));
    const body = {
      user_id: userData?.id
    } 

    dispatch(
      getNotificationList(body, (res: any) => {
        if(res) {
          fetchData(res.reverse());
        } else {
          setState(prev => ({...prev, loader: false, notificationList: []}));
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
            const response = await fetch(`${serviceUrl.apiUrl}buddypress/v1/members/${obj.item_id}`);
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
      setState(prev => ({...prev, notificationList: newData, loader: false}));     
    } catch (error) {
    
    }
  };

  const callFriendRequestStatusFn = (isAccept: boolean, userId: number) => {
    setState(prev => ({...prev, loader: true}));
    const body = {
      userId: userId,
      isPutRequest: isAccept,
      context: 'edit'
    } 

    dispatch(
      updateFriendRequestStatus(body, (res: any) => {
        callNotificationListFn();
      
      }),
    );
  };
  
  const renderItem = ({item, index}: any) => {
    const days = moment.utc(item.date).local().startOf('seconds').fromNow()
    return (
      (item.action === "friendship_request" ?
        <View style={styles.notificationParentView}>
          <View style={styles.notificationImageParentView}>
            <Image
              style={styles.notificationImageView}
              source={item.avatar_urls ? {uri: item.avatar_urls.full} : AllImages.appPlaceholderIcon}/>
          </View>
          <View style={styles.notificationTitleParentView}>
            <Text style={styles.notificationTitleStyle}>{item.name +" sent you friend request"}</Text>
            <View style={styles.notificationActionParentView}>
              <View style={styles.notificationImageParentView}>
                <Text style={styles.notificationDateStyle}>{days}</Text>  
              </View>
              <View style={[styles.flexDirectionView,{justifyContent: 'flex-end', flex: 1}]}>
                <Pressable style={styles.btnStyle}
                  onPress={() => callFriendRequestStatusFn(true, item.item_id)}>
                  <Text style={styles.acceptRejectFontStyle}>ACCEPT</Text>
                </Pressable>
                <Pressable style={[styles.btnStyle,{backgroundColor: colors.emergencyGradientOne}]}
                  onPress={() => callFriendRequestStatusFn(false, item.item_id)}>
                  <Text style={styles.acceptRejectFontStyle}>REJECT</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        :
        (item.action === "friendship_accepted" ?
          <View style={styles.notificationParentView}>
            <View style={styles.notificationImageParentView}>
              <Image
                style={styles.notificationImageView}
                source={item.avatar_urls ? {uri: item.avatar_urls.full} : AllImages.appPlaceholderIcon}/>
            </View>
            <View style={styles.notificationTitleParentView}>
              <Text style={styles.notificationTitleStyle}>{"You accepted friend request of " + item.name}</Text>
              <Text style={styles.notificationDateStyle}>{days}</Text>
            </View>
          </View>
          :
          <View style={styles.notificationParentView}>
            <View style={styles.notificationImageParentView}>
              <Image
                style={styles.notificationImageView}
                source={item.image ? {uri: item.image} : AllImages.appPlaceholderIcon}/>
            </View>
            <View style={styles.notificationTitleParentView}>
              <Text style={styles.notificationTitleStyle}>{item.action.replace(/_/g, " ")}</Text>
              <Text style={styles.notificationDateStyle}>{days}</Text>
            </View>
          </View>
        )
      )
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={state?.loader} color={colors.communityGreenColor}/>
      <Header
        statusBarColor={colors.communityGreenColor}
        />
      <View style={[styles.container,{justifyContent: 'center'}]}>
        {(state.notificationList.length > 0 && !state.loader) ?
          <FlatList
            style={{margin: 5}}
            data={state.notificationList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
          :
          (!state.loader &&
            <View style={styles.noDataViewStyle}>
              <Text style={[styles.tabLabelStyle, {color: darkColors.dontHaveColor}]}>No any notification</Text>
            </View>
          )
        }

        
      </View>
    </SafeAreaView>
  );
};

export default Notifications;
