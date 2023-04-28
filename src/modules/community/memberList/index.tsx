import React, { useEffect, useState } from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {navigate} from '../../../routing/navigationRef';
import {darkColors} from '../../../theme/colors';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {setTabBgColor} from '../../../redux/actions/authAction';
import Header from '../../../components/header';
import { useTheme } from '../../../providers/ThemeProvider';
import AllImages from '../../../utils/Constants/AllImages';
import Icon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { getMemberListData } from '../../../redux/actions/memberAction';
import Spinner from '../../../components/spinner';
import Share from 'react-native-share';
import { PET_PASSPORT_MENU_SCREEN } from '../petPassport/petPassportMenu';
import { scale } from '../../../theme/responsive';
import LinearGradient from 'react-native-linear-gradient';

export const MY_MEMBER_LIST_SCREEN = {
  name: 'MyMemberList',
};

const MyMemberList = ({route}) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const [state, setState] = useState({
    loader: false,
    isAdditionalMenuShow: false,
    menuOpenPosition: -1,
    memberListData: []
  });

  const profilePic = route?.params?.userPic;

  const {userData} = useSelector(
    state => ({
      userData: state.auth?.loginData,
    }),
    shallowEqual,
  );

  useEffect(() => {
    callMemberListFn();
  },[]);

  const callMemberListFn = () => {
    setState(prev => ({...prev, loader: true}));

    dispatch(
      getMemberListData((res: any) => {
        if (res) {
          setState(prev => ({...prev, loader: false, memberListData: res}));
        } else {
          setState(prev => ({...prev, loader: false, memberListData: []}));
        }
      }),
    );
  };




  const renderItem = ({item, index}: any) => {
    return (
      // <View style={[styles.mainView,{ backgroundColor: darkColors.darkGreen}]}>
      <LinearGradient 
      start={{x: 0, y: 0}} 
      end={{x: 1, y: 0}} 
      colors={index%2==0?[colors.darkGreen, colors.darkGreen, colors.lightGreen]:[ darkColors.gradientGary, darkColors.gradientGary, darkColors.white]} 
      style={styles.mainView}>
         <Pressable
                  onPress={() =>{}}>
            <View style={styles.petViewParentView}>
              <View style={styles.flexZero}>
                <Image
                  style={styles.petImageStyle}
                  source={{uri: item.avatar_urls.full}}/>
              </View>
              <View style={[styles.flexOne,{marginLeft:scale(10)}]}> 
                  <Text style={[styles.petListItemTextValueStyle,{color:index%2==0?darkColors.white:darkColors.black}]}>  {item.name}</Text>
                <View style={styles.flexDirectionRowView}>
                  <View style={styles.flexOne}>
                      <Text style={[styles.petListItemTextValueStyle,{color:index%2==0?darkColors.white:darkColors.black}]}>  {item.user_login}</Text>
                  </View>
                  
                </View>
                <View style={styles.flexOne}>
                      <Text style={[styles.petListItemTextValueStyle,{color:index%2==0?darkColors.white:darkColors.black}]}>  {item.friendship_status_slug}</Text>
                  </View>
              </View>
            </View>
            </Pressable>
          </LinearGradient>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={state?.loader} />
      <Header isfilter={true}/>
      
      <View style={styles.container}>
      <View style={styles.header}>
          <Image
            source={{uri: profilePic?.[0]?.full}}
            resizeMode="contain"
            style={styles.pic}
          />
          <Text style={styles.name}> {(userData?.nicename).toUpperCase()}</Text>
        </View>

        <View style={styles.listTitle}>
        <Text style={styles.listTitleText}>user in your area</Text>
        </View>

        <FlatList
          data={state.memberListData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View> 
     
    </SafeAreaView>
  );
};

export default MyMemberList;
