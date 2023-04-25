import React, { useEffect, useState } from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {navigate} from '../../../routing/navigationRef';
import {darkColors} from '../../../theme/colors';
import {useDispatch} from 'react-redux';
import {setTabBgColor} from '../../../redux/actions/authAction';
import Header from '../../../components/header';
import { useTheme } from '../../../providers/ThemeProvider';
import LinearGradient from '../../../components/linearGradient';
import AllImages from '../../../utils/Constants/AllImages';
import Icon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { deletePet, getPetListData } from '../../../redux/actions/petAction';
import Spinner from '../../../components/spinner';
import Share from 'react-native-share';
import { PetListArrayInterface } from './types';
import { PET_PASSPORT_MENU_SCREEN } from '../petPassport/petPassportMenu';
import { scale } from '../../../theme/responsive';

export const MY_PET_LIST_SCREEN = {
  name: 'MyPetList',
};

const MyPetList = () => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const [state, setState] = useState({
    loader: false,
    isAdditionalMenuShow: false,
    menuOpenPosition: -1,
    petListData: []
  });

  useEffect(() => {
    callPetListFn();
  }, []);
  
  const callPetListFn = () => {
    setState(prev => ({...prev, loader: true}));

    dispatch(
      getPetListData((res: any) => {
        if(res) {
          const { data } = res;
          let formId = data.new_form_id;
          setState(prev => ({...prev, loader: false, petListData:  data.pets_list}));
        } else {
          setState(prev => ({...prev, loader: false, petListData: []}));
        }
      }),
    );
  };

  const callDeletePetFn = (petId: string) => {
    setState(prev => ({...prev, loader: true}));

    dispatch(
      deletePet({petId}, (res: any) => {
        if(res) {
          callPetListFn();
        } else {
          setState(prev => ({...prev, loader: false}));
        }
      }),
    );
  };

  const onMenuOptionsPress = (index: number, data: PetListArrayInterface) => {
    setState(prev => ({...prev, menuOpenPosition: -1, isAdditionalMenuShow: false}));  
    if(index == 0){
      //Edit
    } else if(index == 1) {
      //Share
      const shareOptions = {
        message: data.pet_name + "\n",
        url: data.pet_image,
        failOnCancel: false,
      };
  
      Share.open(shareOptions)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
    } else {
      //Delete
      callDeletePetFn(data.pet_id);
    }
  };

  const onPetListItemPress = (data: PetListArrayInterface) => {
    navigate(PET_PASSPORT_MENU_SCREEN.name, {petObj: data});
  }

  const onHandSwipeIconPress = (index: number) => {
    if(index >= 0){
      if(index == state.menuOpenPosition) { 
        setState(prev => ({...prev, menuOpenPosition: -1, isAdditionalMenuShow: false}));
      } else { 
        setState(prev => ({...prev, isAdditionalMenuShow: true, menuOpenPosition: index}));
      }
    } else {
      setState(prev => ({...prev, menuOpenPosition: -1}));
    }
  }

  const renderItem = ({item, index}: any) => {
    return (
      <LinearGradient
        childrean={
          <Pressable
            onPress={() => onPetListItemPress(item)}>
            <View style={styles.petViewParentView}>
              <View style={styles.flexZero}>
                <Image
                  style={styles.petImageStyle}
                  source={{uri: item.pet_image}}/>
                <Text style={styles.missingStatusTextStyle}>{item.pet_vermisst}</Text>
              </View>
              <View style={[styles.flexOne,{marginLeft: scale(10)}]}> 
                <Text style={styles.petListItemTextLabelStyle}>Name
                  <Text style={styles.petListItemTextValueStyle}>  {item.pet_name}</Text>
                </Text>
                <View style={styles.flexDirectionRowView}>
                  <View style={styles.flexOne}>
                    <Text style={styles.petListItemTextLabelStyle}>Gender
                      <Text style={styles.petListItemTextValueStyle}>  {item.pet_gender}</Text>
                    </Text>
                  </View>
                  <View style={styles.flexOne}>
                    <Text style={styles.petListItemTextLabelStyle}>Species
                      <Text style={styles.petListItemTextValueStyle}>  {item.pet_name}</Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.flexDirectionRowView}>
                  <View style={styles.flexOne}>
                    <Text style={styles.petListItemTextLabelStyle}>Age
                      <Text style={styles.petListItemTextValueStyle}>  {item.pet_age}</Text>
                    </Text>
                  </View>
                  <View style={styles.flexOne}>
                    <Text style={styles.petListItemTextLabelStyle}>Breed
                      <Text style={styles.petListItemTextValueStyle}>  {item.pet_name}</Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.flexDirectionRowView}>
                  <View style={styles.flexOne}>
                    <Text style={styles.petListItemTextLabelStyle}>Size (cm)
                      <Text style={styles.petListItemTextValueStyle}>  {item.pet_size}</Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.editDeleteParentView}>
                  <View style={styles.editDeleteChildView}>
                    <Pressable
                      onPress={() => onHandSwipeIconPress(index)}>
                      <View style={[styles.flexZero, (state.isAdditionalMenuShow && index == state.menuOpenPosition) 
                        && {marginLeft: scale(5), marginRight: scale(10)}]}>
                        <Image
                          style={styles.handImageStyle}
                          source={AllImages.handSwipeIcon}/>
                      </View>
                    </Pressable>
                    
                    {(state.isAdditionalMenuShow && index == state.menuOpenPosition) &&
                      <>                        
                        <View style={styles.editDeleteIconView}>
                          <Pressable
                            onPress={() => onMenuOptionsPress(0, item)}>
                            <View style={styles.editDeleteIconView}>
                              <Icon
                                name="edit"
                                size={22}
                                color={colors.darkGrey}
                              />
                            </View>
                          </Pressable>
                        </View>
                        <View style={styles.editDeleteIconView}>
                          <Pressable
                            onPress={() => onMenuOptionsPress(1, item)}>
                            <View style={styles.editDeleteIconView}>
                              <Icon
                                name="upload"
                                size={22}
                                color={colors.darkGrey}
                              />
                            </View>
                          </Pressable>
                        </View>
                        <Pressable
                          onPress={() => onMenuOptionsPress(2, item)}>
                          <View style={styles.editDeleteIconView}>
                            <AntIcon
                              name="delete"
                              size={22}
                              color={colors.toastBorderErrorColor}
                            />
                          </View>
                        </Pressable>
                    </>
                    }
                  </View>
                </View>
                
              </View>
            </View>
          </Pressable>
        }
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={state?.loader} />
      <Header/>
      <View style={styles.container}>
        <FlatList
          data={state.petListData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View> 
     
    </SafeAreaView>
  );
};

export default MyPetList;
