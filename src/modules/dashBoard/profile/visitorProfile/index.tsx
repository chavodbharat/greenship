import React, {useEffect, useState} from 'react';
import {FlatList, Image, ImageBackground, Pressable, ScrollView, Text, View} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {darkColors} from '../../../../theme/colors';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import Header from '../../../../components/header';
import {useTheme} from '../../../../providers/ThemeProvider';
import AllImages from '../../../../utils/Constants/AllImages';
import Spinner from '../../../../components/spinner';
import {scale, verticalScale} from '../../../../theme/responsive';
import {
  allGenderStaticData,
} from '../../../../utils/Constants/AllConstance';
import {TouchableWithoutFeedback} from 'react-native';
import { getMemberFriendList, getMemberGroupeList, getMemberProfileDetails, sendFriendRequest } from '../../../../redux/actions/memberAction';
import LinearGradient from 'react-native-linear-gradient';
import LinearGradient1 from '../../../..//components/linearGradient';
import { fonts } from '../../../../theme/fonts';
import { getBannerImage } from '../../../../redux/actions/homeAction';
import { serviceUrl } from '../../../../utils/Constants/ServiceUrls';
import BlockUserModal from '../../../../components/blockUserModal';
import ReportProblemModal from '../../../../components/reportProblemModal';

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
    memberGroupListData: [],
    isBlockUserModalShow: false,
    isReportProblemAccountModalShow: false,
    reportProblemSubmitStatus: true
  });

  const {userData} = useSelector(
    state => ({
      userData: state.auth?.loginData,
    }),
    shallowEqual,
  );

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

          //Check Report Problem Submitted or Not
          const reportProblemData = res.youzify_report;
          let checkReportUser = true;
          if(reportProblemData) {
            checkReportUser = res.youzify_report?.is_valid_report_user;
          }
          setState(prev => ({...prev, loader: false, memberObj: res, ownerData: result,
            reportProblemSubmitStatus: checkReportUser}));
        } else {
          setState(prev => ({...prev, loader: false}));
        }
      }),
    );
  };

  //Send friend request
  const callFriendRequestFn = () => {
    if(state.memberObj?.friendship_status_slug === "not_friends") {
      setState(prev => ({...prev, loader: true}));
      const body = {
        context: 'edit',
        initiator_id: userData.id,
        friend_id: userId
      }
      dispatch(
        sendFriendRequest(body, (res: any) => {
          if (res) {
            setState(prev => ({...prev, loader: false}));
            callMemberDetailsFn();
          } else {
            setState(prev => ({...prev, loader: false}));
          }
        }),
      );
    }
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
      const promises = fields.map(async (obj: any, index: number) => {
        if(Object.keys(obj).length > 0) {
          try {
            const response = await fetch(`${serviceUrl.apiUrl}buddypress/v1/members/${obj.initiator_id}`);
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
      setState(prev => ({...prev, memberFriendListData: newData, loader: false}));     
    } catch (error) {
    
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

  const redirectToChatDetails = () => {
    // navigate(CHAT_DETAILS_SCREEN.name, {friendId: finalId,
    //   userName: item.name, userData})
  }

  const onSuccessBlockUser = () => {
    setState(prev => ({...prev, isBlockUserModalShow: false}));
  }

  const onSuccessReportProblem = () => {
    setState(prev => ({...prev, isReportProblemAccountModalShow: false}));
    callMemberDetailsFn();
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
            style={styles.groupeFriendsIconStyle}
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
                      <View style={styles.reportBlockView}>
                        <Pressable
                          onPress={() => setState(prev => ({...prev, isBlockUserModalShow: true}))}>
                          <Image
                            style={styles.reportBlockIconStyle}
                            source={AllImages.blockUserIcon}/>
                        </Pressable>
                        <Pressable
                          onPress={() => setState(prev => ({...prev, isReportProblemAccountModalShow: true}))}>
                          <Image
                            style={[styles.reportBlockIconStyle, {marginLeft: scale(10), 
                              marginRight: scale(10)}]}
                            source={AllImages.reportAccountIcon}/>
                        </Pressable>  
                      </View>
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
                    <View style={styles.reportBlockView}>
                      <Pressable
                        onPress={() => setState(prev => ({...prev, isBlockUserModalShow: true}))}>
                        <Image
                          style={styles.reportBlockIconStyle}
                          source={AllImages.blockUserIcon}/>
                      </Pressable>
                      <Pressable
                        onPress={() => setState(prev => ({...prev, isReportProblemAccountModalShow: true}))}>
                        <Image
                          style={[styles.reportBlockIconStyle, {marginLeft: scale(10), 
                            marginRight: scale(10)}]}
                          source={AllImages.reportAccountIcon}/>
                      </Pressable>  
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
              
              <Pressable style={[styles.btnStyle,{marginLeft: scale(10)}]}
                onPress={() => callFriendRequestFn()}>
                <Text style={styles.btnFontStyle}>
                  {state.memberObj?.friendship_status_slug === "not_friends"
                    ? "Add Friend" : state.memberObj?.friendship_status_slug === "pending" ?
                    "Pending" : "Friendship"}</Text>
              </Pressable>
              <Pressable style={[styles.btnStyle,{marginRight: scale(10), backgroundColor: 
                state.memberObj?.friendship_status_slug === "is_friend" ? colors.communityGreenColor
                  : colors.lightGreen}]}
                  onPress={() => state.memberObj?.friendship_status_slug === "is_friend" && redirectToChatDetails()}>
                <Text style={styles.btnFontStyle}>Message</Text>
              </Pressable>
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
                (!state.loader &&
                  <View style={styles.noDataViewStyle}>
                    <Text style={[styles.tabLabelStyle, {color: darkColors.dontHaveColor}]}>Owner details not found</Text>
                  </View>
                )
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
                (!state.loader &&
                  <View style={styles.noDataViewStyle}>
                    <Text style={[styles.tabLabelStyle, {color: darkColors.dontHaveColor}]}>Friend list not found</Text>
                  </View>
                )
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
      <BlockUserModal
        isModalVisible={state.isBlockUserModalShow}
        blockUserId={userId}
        onSuccessBlockUser={onSuccessBlockUser}
        onClose={() => setState(prev => ({...prev, isBlockUserModalShow: false}))}/>
      <ReportProblemModal
        isModalVisible={state.isReportProblemAccountModalShow}
        reportUserId={userId}
        reportProblemSubmitStatus={state.reportProblemSubmitStatus}
        onSuccessReportProblem={onSuccessReportProblem}
        onClose={() => setState(prev => ({...prev, isReportProblemAccountModalShow: false}))}/>
    </SafeAreaView>
  );
};

export default VisitorProfile;
