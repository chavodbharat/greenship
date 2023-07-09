import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useTheme} from '../../../../providers/ThemeProvider';
import {getLoginUserGroupList} from '../../../../redux/actions/memberAction';
import {serviceUrl} from '../../../../utils/Constants/ServiceUrls';
import {FlatList, Image, SafeAreaView, Text, View} from 'react-native';
import {darkColors} from '../../../../theme/colors';
import styles from './styles';
import Header from '../../../../components/header';
import Spinner from '../../../../components/spinner';
import {scale, verticalScale} from '../../../../theme/responsive';

export const MY_GROUP_LIST_SCREEN = {
  name: 'MyGroupList',
};

const MyGroupList = ({route}: any) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const [state, setState] = useState({
    loader: false,
    allGroupListData: [],
  });

  useEffect(() => {
    callGroupListFn();
  }, []);

  //Get Group List
  const callGroupListFn = () => {
    setState(prev => ({...prev, loader: true}));
    dispatch(
      getLoginUserGroupList((res: any) => {
        if (res) {
          setState(prev => ({...prev, allGroupListData: res, loader: false}));
        }
      }),
    );
  };

  const renderItem = ({item, index}: any) => {
    return (
      item.name && (
        <View
          style={[
            styles.flexDirectionRowView,
            {marginTop: verticalScale(5), marginBottom: verticalScale(5)},
          ]}>
          <View style={styles.flexZero}>
            <Image
              style={styles.groupeFriendsIconStyle}
              source={{uri: item.avatar_urls?.full}}
            />
          </View>
          <View
            style={[
              styles.flexOne,
              {marginLeft: scale(10), justifyContent: 'center'},
            ]}>
            <Text style={styles.groupNameTextStyle}>{item.name}</Text>
          </View>
        </View>
      )
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.communityGreenColor}}>
      <SafeAreaView style={[styles.flexOne, {backgroundColor: 'transparent'}]}>
        <Spinner visible={state?.loader} color={colors.communityGreenColor} />
        <Header statusBarColor={colors.communityGreenColor} />
        <View
          style={[
            styles.flexOne,
            {
              paddingLeft: scale(15),
              paddingRight: scale(15),
              paddingTop: scale(10),
              paddingBottom: scale(10),
              justifyContent: 'center',
            },
          ]}>
          {state.allGroupListData.length > 0 && !state.loader ? (
            <FlatList
              data={state.allGroupListData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          ) : (
            !state.loader && (
              <View style={styles.noDataViewStyle}>
                <Text
                  style={[
                    styles.tabLabelStyle,
                    {color: darkColors.dontHaveColor},
                  ]}>
                  Group list not found
                </Text>
              </View>
            )
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default MyGroupList;
