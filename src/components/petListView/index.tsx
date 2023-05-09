import React, {useState} from 'react';
import styles from './styles';
import {FlatList, Image, Pressable, Text, TouchableWithoutFeedback, View} from 'react-native';
import { PetListViewTypePropsInterface } from './types';
import LinearGradient from '../linearGradient';
import { scale, verticalScale } from '../../theme/responsive';
import AllImages from '../../utils/Constants/AllImages';
import Icon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { darkColors } from '../../theme/colors';
import { navigate } from '../../routing/navigationRef';
import { PET_PASSPORT_MENU_SCREEN } from '../../modules/pet/petPassport/petPassportMenu';
import { PetListArrayInterface } from '../../modules/pet/myPetList/types';
import { ADD_PET_SCREEN } from '../../modules/pet/addPet';
import Share from 'react-native-share';
import DeleteModal from '../deleteModal';

const PetListView = ({petListData, isEmergency=false, onDeletePress, isModalVisible=false,
  onDeleteModalShowOrHide, onItemPress}: PetListViewTypePropsInterface) => {
  
  const [state, setState] = useState({
    isAdditionalMenuShow: false,
    menuOpenPosition: -1,
    currentPetId: ""
  });

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

  const onMenuOptionsPress = (index: number, data: PetListArrayInterface) => {
    setState(prev => ({...prev, menuOpenPosition: -1, isAdditionalMenuShow: false}));  
    if(index == 0){
      //Edit
      navigate(ADD_PET_SCREEN.name, {formId: data.form_id, petId: data.pet_id, 
        isEditMode: true, isViewOnly: false})
    } else if(index == 1) {
      //Share
      const shareOptions = {
        message: data.pet_name + "\n",
        url: data.pet_image_url ? data.pet_image_url : data.pet_image,
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
      setState(prev => ({...prev, currentPetId: data.pet_id, isAdditionalMenuShow: false}));
      onDeleteModalShowOrHide(true);
    }
  };

  const onOpenCloseDeleteModal = (status: boolean) => {
    setState(prev => ({...prev, isAdditionalMenuShow: false}));
    onDeleteModalShowOrHide(false);
  }

  const renderItem = ({item, index}: any) => {
    return (
      <LinearGradient
        allColorsArray={ isEmergency ? ['#B72C36', '#ED626C'] : null}
        childrean={
          <Pressable
            onPress={() => isEmergency ? onItemPress(item) : onPetListItemPress(item)}>
            <View style={styles.petViewParentView}>
              <View style={styles.flexZero}>
                <Image
                  style={styles.petImageStyle}
                  source={{uri: isEmergency ? item.pet_image_url : item.pet_image}}/>
                <Text style={styles.missingStatusTextStyle}>{item.pet_vermisst}</Text>
              </View>
              <View style={[styles.flexOne,{marginLeft: scale(10)}]}> 
                <View style={[styles.flexDirectionRowView]}>
                  <View style={styles.flexOne}>
                    <Text style={styles.petListItemTextLabelStyle}>Name</Text>
                  </View>
                  <View style={styles.flexTwo}>
                    <Text style={styles.petListItemTextValueStyle}>{item.pet_name}</Text>
                  </View>
                </View>
                <View style={[styles.flexDirectionRowView,{marginTop: verticalScale(3)}]}>
                  <View style={styles.flexOne}>
                    <Text style={styles.petListItemTextLabelStyle}>Art</Text>
                  </View>
                  <View style={styles.flexTwo}>
                    <Text style={styles.petListItemTextValueStyle}>{item.pet_art}</Text>
                  </View>
                </View>
                <View style={[styles.flexDirectionRowView,{marginTop: verticalScale(3)}]}>
                  <View style={styles.flexOne}>
                    <Text style={styles.petListItemTextLabelStyle}>Geschlecht</Text>
                  </View>
                  <View style={styles.flexTwo}>
                    <Text style={styles.petListItemTextLabelStyle}>{item.pet_gender}</Text>
                  </View>
                </View>
                <View style={[styles.flexDirectionRowView,{marginTop: verticalScale(3)}]}>
                  <View style={styles.flexOne}>
                    <Text style={styles.petListItemTextLabelStyle}>Alter</Text>
                  </View>
                  <View style={styles.flexTwo}>
                    <Text style={styles.petListItemTextLabelStyle}>{item.pet_age} Jahre</Text>
                  </View>
                </View>
                <View style={[styles.flexDirectionRowView,{marginTop: verticalScale(3)}]}>
                  <View style={styles.flexOne}>
                    <Text style={styles.petListItemTextLabelStyle}>Größe</Text>
                  </View>
                  <View style={styles.flexTwo}>
                    <Text style={styles.petListItemTextLabelStyle}>{item.pet_size} cm</Text>
                  </View>
                </View>
                {!isEmergency &&  
                  <TouchableWithoutFeedback
                    onPress={() => onHandSwipeIconPress(index)}>
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
                                    color={darkColors.darkGrey}
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
                                    color={darkColors.darkGrey}
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
                                  color={darkColors.toastBorderErrorColor}
                                />
                              </View>
                            </Pressable>
                        </>
                        }
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                }             
              </View>
            </View>
          </Pressable>
        }
      />
    )
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={petListData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <DeleteModal
        isModalVisible={isModalVisible}
        onClose={() => onOpenCloseDeleteModal(false)}
        onDelete={() => onDeletePress(state.currentPetId)}/> 
    </View>
  );
};

export default PetListView;
