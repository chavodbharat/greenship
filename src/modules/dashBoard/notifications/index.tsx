import React, { useEffect, useState } from 'react';
import styles from './styles';
import {View, Text, SafeAreaView, FlatList, Image} from 'react-native';
import Spinner from '../../../components/spinner';
import { useTheme } from '../../../providers/ThemeProvider';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AllImages from '../../../utils/Constants/AllImages';
import { fonts } from '../../../theme/fonts';
import { darkColors } from '../../../theme/colors';
import Header from '../../../components/header';
import { getNotificationList } from '../../../redux/actions/homeAction';

const Notifications = () => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const [state, setState] = useState({
    loader: false,
    notificationList: [
      {
        "id": 1,
        "title": "Bharat accepted your friend request",
        "time": "2 days, 11:30 hours ago",
        "image": AllImages.appPlaceholderIcon
      },
      {
        "id": 1,
        "title": "Ravi accepted your friend request",
        "time": "2 days, 11:30 hours ago",
        "image": AllImages.appPlaceholderIcon
      },
      {
        "id": 1,
        "title": "Keyur158 accepted your friend request",
        "time": "2 days, 11:30 hours ago",
        "image": AllImages.appPlaceholderIcon
      }
    ]
  });

  const {userData} = useSelector(
    state => ({
      userData: state.auth?.loginData,
    }),
    shallowEqual,
  );

  useEffect(() => {
    callNotificationListFn();
  }, []);
  
  const callNotificationListFn = () => {
   // setState(prev => ({...prev, loader: true}));
    const body = {
      user_id: userData?.id
    } 

    console.log("Body", body);

    // dispatch(
    //   getNotificationList(body, (res: any) => {
    //     if(res) {
    //       const { data } = res;
    //       console.log("Data", data);
    //       // store.dispatch({
    //       //   type: types.UPDATE_NEW_FORM_ID,
    //       //   payload: data.new_form_id,
    //       // });
    //       // setState(prev => ({...prev, loader: false, petListData:  data.pets_list.reverse(), 
    //       //   formId: data.new_form_id}));
    //     } else {
    //       setState(prev => ({...prev, loader: false, notificationList: []}));
    //     }
    //   }),
    // );
  };
  
  const renderItem = ({item, index}: any) => {
    return (
      <View style={styles.notificationParentView}>
        <View style={styles.notificationImageParentView}>
          <Image
            style={styles.notificationImageView}
            source={item.image}/>
        </View>
        <View style={styles.notificationTitleParentView}>
          <Text style={{fontFamily: fonts.MontserratBold, fontSize: 14,
            color: darkColors.black}}>{item.title}</Text>
          <Text style={{fontFamily: fonts.MontserratRegular, color: darkColors.darkGrey,
            marginTop: 5}}>{item.time}</Text>
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={state?.loader} color={colors.listBackGradientThree}/>
      <Header
        statusBarColor={colors.listBackGradientThree}
        />
      <View style={styles.container}>
        <FlatList
          style={{margin: 5}}
          data={state.notificationList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notifications;
