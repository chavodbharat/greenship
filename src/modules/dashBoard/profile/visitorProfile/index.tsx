import React, {useEffect, useState} from 'react';
import {FlatList, Image, ImageBackground, Pressable, ScrollView, Text, View} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {darkColors} from '../../../../theme/colors';
import {useDispatch} from 'react-redux';
import Header from '../../../../components/header';
import {useTheme} from '../../../../providers/ThemeProvider';
import AllImages from '../../../../utils/Constants/AllImages';
import Spinner from '../../../../components/spinner';
import {scale, verticalScale} from '../../../../theme/responsive';
import {
  allGenderStaticData,
} from '../../../../utils/Constants/AllConstance';
import {TouchableWithoutFeedback} from 'react-native';
import { getMemberFriendList, getMemberGroupeList, getMemberProfileDetails } from '../../../../redux/actions/memberAction';
import LinearGradient from 'react-native-linear-gradient';
import LinearGradient1 from '../../../..//components/linearGradient';
import { fonts } from '../../../../theme/fonts';
import { getBannerImage } from '../../../../redux/actions/homeAction';
import { serviceUrl } from '../../../../utils/Constants/ServiceUrls';

export const VISITOR_PROFILE_SCREEN = {
  name: 'VisitorProfile',
};

const VisitorProfile = ({route}: any) => {
  const dispatch = useDispatch();
  const {userId } = route.params;
  const {colors} = useTheme();
  const [state, setState] = useState({
    loader: false,
    memberObj: {},
    bannerImage: '',
    activeTabPosition: 0,
    ownerData: [],
    memberFriendListData: [],
    memberGroupListData: []
  });

  useEffect(() => {
    callMemberDetailsFn();
    getBannerImageFn();
  }, []);

  const getBannerImageFn = () => {
    let body = {
      id: userId,
      context: 'view',
    };
    dispatch(
      getBannerImage(body, (res: any) => {
        if (res?.length) {
          setState(prev => ({...prev, bannerImage: res}));
        }
        setState(prev => ({...prev, loading: false}));
      }),
    );
  };

  const callMemberDetailsFn = () => {
    setState(prev => ({...prev, loader: true}));
  
    const body = {
      memberId: userId
    }

    dispatch(
      getMemberProfileDetails(body, (res: any) => {
        if (res) {
          let xProfile = res?.xprofile?.groups[0];
          let result: any;
          if(xProfile) {
            let xFields = xProfile.fields;
            result = Object.keys(xFields).map((key) => [key, xFields[key]]);
          }
          setState(prev => ({...prev, loader: false, memberObj: res, ownerData: result}));
        } else {
          setState(prev => ({...prev, loader: false}));
        }
      }),
    );
  };

  //Get Member Group List
  const callMemberGroupListFn = () => {
    setState(prev => ({...prev, loader: true}));
    dispatch(
      getMemberGroupeList({userId}, (res: any) => {
        if (res) {
          setState(prev => ({...prev, loader: false, memberGroupListData: res}));
        } else {
          setState(prev => ({...prev, loader: false}));
        }
      }),
    );
  };

  //Get Member Friend List
  const callMemberFriendListFn = () => {
    setState(prev => ({...prev, loader: true}));
    dispatch(
      getMemberFriendList({userId}, (res: any) => {
        if(res){
          fetchData(res);
        }
      }),
    );
  };

  const fetchData = async (fields: any) => {
    // Map array to an array of Promises for API requests
    try {
      const promises = fields.map(obj => {
        if(Object.keys(obj).length > 0) {
          return fetch(
            `${serviceUrl.apiUrl}buddypress/v1/members/${obj.initiator_id}`,
          )
          .then(response => {
            if (response.ok) {
              return response.json();
            }
          })
          .then(data => {
            if(data){
              obj.name = data.name;
              return obj;
            }
          })
          .catch(error => {
            return error;
          });
        }
      });
  
      const newData = await Promise.all(promises); 
     // setState(prev => ({...prev, memberFriendListData: newData, loading: false}));     
    } catch (error) {
      console.log("error 11===================================>", error)
    }
  
  };

  const onTabChange = (position: number) => {
    if(position == 1) {
      callMemberFriendListFn();
    } else if(position == 2) {
      callMemberGroupListFn();
    }
    setState(prev => ({...prev, activeTabPosition: position}));
  }

  const renderItem = ({item, index}: any) => {
    const regex = /(<([^>]+)>)/ig;
    let objData =  item[1];
    const objValue =  objData?.value.rendered.replace(regex, '');
    return (
      (objValue &&
        <View style={styles.flexDirectionRowView}>
          <View style={styles.flexOne}>
            <Text style={[styles.tabLabelStyle,{marginTop: 0}]}>{objData.name}</Text>
          </View>
          <View style={styles.flexOnePointFive}>
            <Text style={styles.ownerValueStyle}>{objValue}</Text>
          </View>
        </View>
      )
    )
  }

  const renderGroupItem = ({item, index}: any) => {
    return (
      <View style={styles.flexDirectionRowView}>
        <View style={styles.flexZero}>
          <Image
            style={{width: 50, height: 50, borderRadius: 5}}
            source={{uri: item.avatar_urls?.full}}/>
        </View>
        <View style={[styles.flexOne,{marginLeft: scale(10), justifyContent: 'center'}]}>
          <Text style={styles.groupNameTextStyle}>{item.name}</Text>
        </View>
      </View>
    )
  }

  const renderFriendItem = ({item, index}: any) => {
    return (
      <View style={styles.flexDirectionRowView}>
        <View style={styles.flexZero}>
          <Image
            style={{width: 50, height: 50, borderRadius: 5}}
            source={{uri: item.avatar_urls?.full}}/>
        </View>
        <View style={[styles.flexOne,{marginLeft: scale(10), justifyContent: 'center'}]}>
          <Text style={styles.groupNameTextStyle}>{item.name}</Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.flexOne,{backgroundColor: colors.white}]}>
      <Spinner visible={state?.loader} color={colors.communityGreenColor} />
      <Header statusBarColor={colors.communityGreenColor} />
      <View style={styles.flexZero}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={[styles.flexOne, {padding: scale(25)}]}>
            <View style={styles.flexOne}>
              {!state.bannerImage ? (
                <LinearGradient1
                  isHorizontal={true}
                  childStyle={styles.gradientChildStyle}
                  allColorsArray={[
                    darkColors.communityGreenColor,
                    darkColors.lightGreen,
                  ]}
                  childrean={
                    <View
                      style={[
                        styles.flexOne,
                        {alignItems: 'center', paddingTop: verticalScale(10)},
                      ]}>
                      <Text style={styles.digitalPassportLabel}>
                        {state.memberObj?.user_login}
                      </Text>
                      {(state.memberObj?.member_types?.length > 0) &&
                        <Text style={styles.petPassportLabel}>{state.memberObj?.member_types[0]}</Text>
                      }
                    </View>
                  }
                />
              ) : (
                <ImageBackground
                  borderRadius={scale(4)}
                  source={{uri: state.bannerImage?.[0]?.image}}
                  style={styles.gradientChildStyle}>
                  <View
                      style={[
                        styles.flexOne,
                        {alignItems: 'center', paddingTop: verticalScale(10)},
                      ]}>
                      <Text style={styles.digitalPassportLabel}>
                        {state.memberObj?.user_login}
                      </Text>
                      {(state.memberObj?.member_types?.length > 0) &&
                        <Text style={styles.petPassportLabel}>{state.memberObj?.member_types[0]}</Text>
                      }
                    </View>
                </ImageBackground>
              )}
              <Image
                style={styles.petProfilePicView}
                source={
                  state.memberObj
                    ? {uri: state.memberObj?.avatar_urls?.full}
                    : AllImages.appPlaceholderIcon
                }
                resizeMode="contain"
              />
            </View>
            <View style={styles.flexDirectionRowView}>
              <View style={[styles.btnStyle,{marginLeft: scale(10)}]}>
                <Text style={styles.btnFontStyle}>
                  {state.memberObj?.friendship_status_slug === "not_friends"
                    ? "Add Friend" : state.memberObj?.friendship_status_slug === "pending" ?
                    "Pending" : "Friendship"}</Text>
              </View>
              <View style={[styles.btnStyle,{marginRight: scale(10), backgroundColor: colors.lightGreen}]}>
                <Text style={styles.btnFontStyle}>Message</Text>
              </View>
            </View>
            <LinearGradient colors={['#00000021', '#FFFFFF21']}
              style={styles.tabMenuGradientChildView}>
              <View style={styles.flexDirectionRowView}>
                <Pressable style={[styles.flexOne,{alignItems: 'center'}]}
                  onPress={() => onTabChange(0)}>
                  <Image
                    style={styles.tabIconStyle}
                    source={AllImages.myGroupGray}/>
                  <Text style={styles.tabLabelStyle}>Owner</Text>  
                </Pressable>
                <Pressable style={[styles.flexOne,{alignItems: 'center'}]}
                  onPress={() => onTabChange(1)}>
                  <Image
                    style={styles.tabIconStyle}
                    source={AllImages.myGroupGray}/>
                  <Text style={styles.tabLabelStyle}>Friends</Text>  
                </Pressable>
                <Pressable style={[styles.flexOne,{alignItems: 'center'}]}
                  onPress={() => onTabChange(2)}>
                  <Image
                    style={styles.tabIconStyle}
                    source={AllImages.myGroupGray}/>
                  <Text style={styles.tabLabelStyle}>Groups</Text>  
                </Pressable>
              </View>
            </LinearGradient>
            {state.activeTabPosition == 0 &&
              ((state.ownerData.length > 0 && !state.loader) ?
                <FlatList
                  style={{marginTop: scale(20), marginBottom: scale(20)}}
                  data={state.ownerData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderItem}
                />
                :
                <View style={styles.noDataViewStyle}>
                  <Text style={[styles.tabLabelStyle, {color: darkColors.dontHaveColor}]}>Owner details not found</Text>
                </View>
              )
            }
            {state.activeTabPosition == 1 &&
              ((state.memberFriendListData.length > 0 && !state.loader) ?
                <FlatList
                  style={{marginTop: scale(20), marginBottom: scale(20)}}
                  data={state.memberFriendListData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderFriendItem}
                />
                :
                <View style={styles.noDataViewStyle}>
                  <Text style={[styles.tabLabelStyle, {color: darkColors.dontHaveColor}]}>Friend list not found</Text>
                </View>
              )
            }
            {state.activeTabPosition == 2 &&
              (state.memberGroupListData.length > 0 ?
                <FlatList
                  style={{marginTop: scale(15), marginBottom: scale(15)}}
                  data={state.memberGroupListData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderGroupItem}
                />
                :
                (!state.loader &&
                <View style={styles.noDataViewStyle}>
                  <Text style={[styles.tabLabelStyle, {color: darkColors.dontHaveColor}]}>Group list not found</Text>
                </View>
                )
              )
            }
          </View>
        </ScrollView>
      </View>

    </SafeAreaView>
  );
};

export default VisitorProfile;
