import React, { useEffect, useState } from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import Header from '../../../components/header';
import { useTheme } from '../../../providers/ThemeProvider';
import Spinner from '../../../components/spinner';
import { scale } from '../../../theme/responsive';
import LinearGradient from 'react-native-linear-gradient';
import { getCommunityUserList, getSearchUserList } from '../../../redux/actions/memberAction';
import { navigate } from '../../../routing/navigationRef';
import { SEARCH_FILTER_SCREEN } from '../../searchFilters/searchFilter';

export const COMMUNITY_USER_LIST_SCREEN = {
  name: 'CommunityUserList',
};

const CommunityUserList = ({route}: any) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  
  const { userPic } = route.params;

  const [state, setState] = useState({
    loader: false,
    communityListData: [],
  });
  
  const {userData} = useSelector(
    state => ({
      userData: state.auth?.loginData,
    }),
    shallowEqual,
  );

  useEffect(() => {
    callCommunityUserListFn();
  },[]);

  const callCommunityUserListFn = () => {
    setState(prev => ({...prev, loader: true}));
    const body = {
      name: '',
      gender: '',
      //radius: radius
      radius: '',
      latitude: '',
      longitude: '',
      page:  1,
      per_page: -1
    }
    dispatch(
      getSearchUserList(body, (res: any) => {
        if(res) {
          const { data } = res;
          setState(prev => ({...prev, loader: false, communityListData: data.members_list}));
        } else {
          setState(prev => ({...prev, loader: false, communityListData: []}));
        }
      }),
    );
  };
  
  const renderItem = ({item, index}: any) => {
    return (
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
    )
  }

  const onFilterPress = () => {
    navigate(SEARCH_FILTER_SCREEN.name);
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={state?.loader} />
      <Header statusBarColor={colors.communityGreenColor} isFilterShow={false}
        onSearchPress={onFilterPress}/>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{uri: userPic?.[0]?.full}}
            resizeMode="contain"
            style={styles.pic}
          />
          <Text style={styles.name}> {(userData?.nicename).toUpperCase()}</Text>
        </View>

        <View style={styles.listTitle}>
          <Text style={styles.listTitleText}>User in your area</Text>
        </View>

        <FlatList
          data={state.communityListData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View> 
    </SafeAreaView>
  );
};

export default CommunityUserList;
