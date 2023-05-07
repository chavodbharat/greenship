import React, { useEffect, useState } from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import Header from '../../../components/header';
import { useTheme } from '../../../providers/ThemeProvider';
import { getSearchPetList, getSearchUserList } from '../../../redux/actions/memberAction';
import Spinner from '../../../components/spinner';
import { scale } from '../../../theme/responsive';
import LinearGradient from 'react-native-linear-gradient';

export const SEARCH_PET_USER_LIST_SCREEN = {
  name: 'SearchPetUserList',
};

const SearchPetUserList = ({route}: any) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  
  const { name, gender, radius, profilePic, isUser, petArt, petRace, petAge } = route.params;

  const [state, setState] = useState({
    loader: false,
    filterListData: [],
    totalResults: 0
  });

  const {currentLatitude, currentLongitude, currentAddress} = useSelector(
    state => ({
      currentLatitude: state.home?.currentLatitude,
      currentLongitude: state.home?.currentLongitude,
      currentAddress: state.home?.currentAddress,
    }),
    shallowEqual,
  );

  const {userData} = useSelector(
    state => ({
      userData: state.auth?.loginData,
    }),
    shallowEqual,
  );

  useEffect(() => {
    callSearchBasedOnFilterFn();
  },[]);

  const callSearchBasedOnFilterFn = () => {
    setState(prev => ({...prev, loader: true}));
    if(isUser){
      //For User Search
      const body = {
        name: name,
        gender: gender,
        //radius: radius
        radius: 1000,
        latitude: currentLatitude,
        longitude: currentLongitude,
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
        petName: name,
        petArt: petArt,
        petRace: petRace,
        petGender: gender,
        petAge: petAge,
        //petRadius: radius
        petRadius: 1000,
        latitude: currentLatitude,
        longitude: currentLongitude,
        page:  1,
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
  
  const renderItem = ({item, index}: any) => {
    return (
      (isUser ?
        <LinearGradient 
          start={{x: 0, y: 0}} 
          end={{x: 1, y: 0}} 
          colors={index%2==0 ? [colors.communityGreenColor, colors.lightGreen]
            : [ colors.filterListOne, colors.filterListTwo]} 
          style={[styles.mainView, index%2!=0 && {borderWidth: 1, borderColor: colors.lightGreen}]}>
          <Pressable
            onPress={() =>{}}>
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
            onPress={() =>{}}>
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
                  colors.white : colors.black}]}>{item.pet_age} Years</Text>
                <Text style={[styles.memberListItemDesTextValueStyle,{color: index%2==0 ?
                  colors.white : colors.black}]}>{item.pet_art}</Text>
                <Text style={[styles.memberListItemDesTextValueStyle,{color: index%2==0 ? 
                    colors.white : colors.black}]}>{item.pet_race}</Text>
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
    </SafeAreaView>
  );
};

export default SearchPetUserList;
