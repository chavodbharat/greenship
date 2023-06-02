import React, { useEffect, useState } from 'react';
import {FlatList, Image, Platform, Pressable, Text, View} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import Header from '../../../components/header';
import { useTheme } from '../../../providers/ThemeProvider';
import { getSearchPetList, getSearchUserList } from '../../../redux/actions/memberAction';
import Spinner from '../../../components/spinner';
import { scale } from '../../../theme/responsive';
import LinearGradient from 'react-native-linear-gradient';
import { VISITOR_PROFILE_SCREEN } from '../../dashBoard/profile/visitorProfile';
import { navigate } from '../../../routing/navigationRef';
import AllImages from '../../../utils/Constants/AllImages';
import ReportProblemModal from '../../../components/reportProblemModal';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { PET_PASSPORT_MENU_SCREEN } from '../../pet/petPassport/petPassportMenu';

export const SEARCH_PET_USER_LIST_SCREEN = {
  name: 'SearchPetUserList',
};

const SearchPetUserList = ({route}: any) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  
  const { name, gender, radius, profilePic, isUser, petArt, petRace, petAge, memberType } = route.params;

  const [state, setState] = useState({
    loader: false,
    filterListData: [],
    totalResults: 0,
    isReportProblemAccountModalShow: false,
    reportProblemSubmitStatus: true,
    reportUserId: "",
    selectedPetIdForReport: "",
    currentLatitude: 0,
    currentLongitude: 0
  });

  const {userData} = useSelector(
    state => ({
      userData: state.auth?.loginData,
    }),
    shallowEqual,
  );

  useEffect(() => {
    requestLocationPermission();
  },[]);

   //Location
   const requestLocationPermission = async () => {
    const granted = await getLocationPermissions();

    if (granted) {
      setState(prev => ({...prev, loading: true}));
      getCurrentPosition();
    }
  };

  const getLocationPermissions = async () => {
    const granted = await request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
      {
        title: 'GreenSheep Earth',
        message:
          'GreenSheep Earth would like access to your location to while searching pet or user',
      },
    );

    return granted === RESULTS.GRANTED;
  };

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        const crd = position.coords;
        setPosition(crd.latitude, crd.longitude);
      },
      error => {
        console.log('error', error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const setPosition = (lat: any, long: any) => {
    setState(prev => ({...prev, currentLatitude: lat, currentLongitude: long}));
    callSearchBasedOnFilterFn();
  };

  const callSearchBasedOnFilterFn = () => {
    setState(prev => ({...prev, loader: true}));
    if(isUser){
      //For User Search
      const body = {
        name: name,
        member_types: memberType,
        radius: radius,
        latitude: state.currentLatitude,
        longitude: state.currentLongitude,
        page:  1,
        per_page: -1
      }
      dispatch(
        getSearchUserList(body, (res: any) => {
          if(res) {
            const { data } = res;
            setState(prev => ({...prev, loader: false, filterListData:  data.members_list,
              totalResults: data.total_items}));
          } else {
            setState(prev => ({...prev, loader: false, filterListData: []}));
          }
        }),
      );
    } else {
      //For Pet Search
      const body = {
        petName: "",
        petArt: "",
        petRace: "",
        petGender: "",
        petAge: "",
        petRadius: "",
        latitude: "",
        longitude: "",
        page:  -1,
        per_page: -1
      }
      dispatch(
        getSearchPetList(body, (res: any) => {
          if(res) {
            const { data } = res;
            console.log("Call 11", JSON.stringify(data))
            setState(prev => ({...prev, loader: false, filterListData:  data.pet_list,
              totalResults: data.total_items}));
          } else {
            setState(prev => ({...prev, loader: false, filterListData: []}));
          }
        }),
      );
    }
  };
  
  const onUserPress = (userId: string) => {
    navigate(VISITOR_PROFILE_SCREEN.name, {userId});
  } 
  
  const onPetItemPress = (item: string) => {
    navigate(PET_PASSPORT_MENU_SCREEN.name, {petObj: item, isIdentityMenuShow: false});
  }

  const onSuccessReportProblem = () => {
    setState(prev => ({...prev, isReportProblemAccountModalShow: false}));
    callSearchBasedOnFilterFn();
  }

  const onPressOnReportProblemIcon = (item: any) => {
    //Check Report Problem Submitted or Not
    const reportProblemData = item.user_pet_report;
    let checkReportUser = true;
    if(reportProblemData) {
      checkReportUser = reportProblemData.is_valid_report_pet_user;
    }
    setState(prev => ({...prev, reportUserId: item.user_id, isReportProblemAccountModalShow: true,
      selectedPetIdForReport: item.id, reportProblemSubmitStatus: checkReportUser}))
  }

  const renderItem = ({item, index}: any) => {
    console.log("item", item)
    return (
      (isUser ?
        <LinearGradient 
          start={{x: 0, y: 0}} 
          end={{x: 1, y: 0}} 
          colors={index%2==0 ? [colors.communityGreenColor, colors.lightGreen]
            : [ colors.filterListOne, colors.filterListTwo]} 
          style={[styles.mainView, index%2!=0 && {borderWidth: 1, borderColor: colors.lightGreen}]}>
          <Pressable
            onPress={() => onUserPress(item.ID)}>
            <View style={styles.memberViewParentView}>
              <View style={styles.flexZero}>
                <Image
                  style={styles.memberImageStyle}
                  source={{uri: item.avatar}}/>
              </View>
              <View style={[styles.flexOne,{marginLeft:scale(15), alignSelf: 'center'}]}> 
                <Text style={[styles.memberListItemTextValueStyle, {color: index%2==0 ? 
                  colors.white : colors.black}]}>{item.display_name}</Text>
                <Text style={[styles.memberListItemDesTextValueStyle,{color: index%2==0 ? 
                  colors.white : colors.black}]}>{item.age}</Text>
                <Text style={[styles.memberListItemDesTextValueStyle,{color: index%2==0 ?
                  colors.white : colors.black}]}>{item.city}</Text>
                <Text style={[styles.memberListItemDesTextValueStyle,{color: index%2==0 ? 
                    colors.white : colors.black}]}>{item.user_pets}</Text>
              </View>
            </View>
          </Pressable>
        </LinearGradient>
        :
        <LinearGradient 
          start={{x: 0, y: 0}} 
          end={{x: 1, y: 0}} 
          colors={index%2==0 ? [colors.filterSearchPetGradientOne, colors.listBackGradientThree]
            : [ colors.filterListOne, colors.filterListTwo]} 
          style={[styles.mainView, index%2!=0 && {borderWidth: 1, borderColor: colors.filterSearchPetBorderColor}]}>
          <Pressable
            onPress={() => onPetItemPress(item)}>
            <View style={styles.memberViewParentView}>
              <View style={styles.flexZero}>
                <Image
                  style={styles.memberImageStyle}
                  source={{uri: item.pet_image?.pet_image_url}}/>
              </View>
              <View style={[styles.flexOne,{marginLeft:scale(15), alignSelf: 'center'}]}> 
                <Text style={[styles.memberListItemTextValueStyle, {color: index%2==0 ? 
                  colors.white : colors.black}]}>{item.pet_name}</Text>
                <Text style={[styles.memberListItemDesTextValueStyle,{color: index%2==0 ? 
                  colors.white : colors.black}]}>{item.pet_age}</Text>
                <Text style={[styles.memberListItemDesTextValueStyle,{color: index%2==0 ?
                  colors.white : colors.black}]}>{item.pet_art}</Text>
                <Text style={[styles.memberListItemDesTextValueStyle,{color: index%2==0 ? 
                    colors.white : colors.black}]}>{item.pet_race}</Text>
              </View>
              <View style={styles.flexZero}>
                <Pressable
                  onPress={() => onPressOnReportProblemIcon(item)}>
                  <Image
                    style={[styles.reportBlockIconStyle, {marginLeft: scale(10)}]}
                    source={AllImages.reportAccountIcon}/>
                </Pressable> 
              </View>
            </View>
          </Pressable>
        </LinearGradient>
      )
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={state?.loader} />
      <Header statusBarColor={colors.communityGreenColor}/>
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
          <Text style={styles.listTitleText}>searchresults ({state.totalResults})</Text>
        </View>

        <FlatList
          data={state.filterListData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
      <ReportProblemModal
        isModalVisible={state.isReportProblemAccountModalShow}
        reportUserId={state.reportUserId}
        reportProblemSubmitStatus={state.reportProblemSubmitStatus}
        onSuccessReportProblem={onSuccessReportProblem}
        petId={state.selectedPetIdForReport}
        onClose={() => setState(prev => ({...prev, isReportProblemAccountModalShow: false}))}/> 
    </SafeAreaView>
  );
};

export default SearchPetUserList;
