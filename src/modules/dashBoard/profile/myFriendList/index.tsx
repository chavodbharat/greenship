import {useEffect, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTheme} from '../../../../providers/ThemeProvider';
import { getLoginUserFriendList } from '../../../../redux/actions/memberAction';
import { serviceUrl } from '../../../../utils/Constants/ServiceUrls';
import { FlatList, Image, SafeAreaView, Text, View } from 'react-native';
import { darkColors } from '../../../../theme/colors';
import styles from './styles';
import Header from '../../../../components/header';
import Spinner from '../../../../components/spinner';
import { scale, verticalScale } from '../../../../theme/responsive';

export const MY_FRIEND_LIST_SCREEN = {
  name: 'MyFriendList',
};

const MyFriendList = ({route}: any) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
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
    callMemberFriendListFn();
  }, []);

  //Get Member Friend List
  const callMemberFriendListFn = () => {
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
            const response = await fetch(`${serviceUrl.apiUrl}buddypress/v1/members/${obj.friend_id}`);
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
    return (
      (item.name &&
        <View style={[styles.flexDirectionRowView,{marginTop: verticalScale(5),
          marginBottom: verticalScale(5)}]}>
          <View style={styles.flexZero}>
            <Image
              style={styles.groupeFriendsIconStyle}
              source={{uri: item.avatar_urls?.full}}/>
          </View>
          <View style={[styles.flexOne,{marginLeft: scale(10), justifyContent: 'center'}]}>
            <Text style={styles.groupNameTextStyle}>{item.name}</Text>
          </View>
        </View>
      )
    )
  }

  return (
    <SafeAreaView style={[styles.flexOne,{backgroundColor: colors.white}]}>
      <Spinner visible={state?.loader} color={colors.communityGreenColor} />
      <Header statusBarColor={colors.communityGreenColor} />
      <View style={[styles.flexOne, {paddingLeft: scale(15), paddingRight: scale(15),
        paddingTop: scale(10), paddingBottom: scale(10), justifyContent: 'center'}]}>
        {(state.allFriendListData.length > 0 && !state.loader) ?
          <FlatList
            data={state.allFriendListData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderFriendItem}
          />
          :
          (!state.loader &&
            <View style={styles.noDataViewStyle}>
              <Text style={[styles.tabLabelStyle, {color: darkColors.dontHaveColor}]}>Friend list not found</Text>
            </View>
          )
        }
      </View>
    </SafeAreaView>
  );
};

export default MyFriendList;
