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
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { TAG_DATE_FORMATE } from '../../../utils/Constants/AllConstance';

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
          setState(prev => ({...prev, loader: false, notificationList: res}));
        } else {
          setState(prev => ({...prev, loader: false, notificationList: []}));
        }
      }),
    );
  };
  
  const renderItem = ({item, index}: any) => {
    return (
      <View style={styles.notificationParentView}>
        <View style={styles.notificationImageParentView}>
          <Image
            style={styles.notificationImageView}
            source={item.image ? {uri: item.image} : AllImages.appPlaceholderIcon}/>
        </View>
        <View style={styles.notificationTitleParentView}>
          <Text style={{fontFamily: fonts.MontserratBold, fontSize: 14,
            color: darkColors.black}}>{item.action.replace(/_/g, " ")}</Text>
          <Text style={{fontFamily: fonts.MontserratRegular, color: darkColors.darkGrey,
            marginTop: 5}}>{moment(item.date).format(TAG_DATE_FORMATE)}</Text>
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
