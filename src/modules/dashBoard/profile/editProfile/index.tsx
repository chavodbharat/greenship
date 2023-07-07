import React, {useEffect, useMemo, useState} from 'react';
import styles from './styles';
import {View, Text, SafeAreaView, Pressable, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {goBack} from '../../../../routing/navigationRef';
import {darkColors} from '../../../../theme/colors';
import {scale} from '../../../../theme/responsive';
import ProfilePicDashboard from '../../../../components/profilePicDashboard';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
  getProfileFieldsReq,
  updateProfileReq,
} from '../../../../redux/actions/homeAction';
import {useForm, Controller} from 'react-hook-form';
import {TextInput} from 'react-native-paper';
import Spinner from '../../../../components/spinner';
import {serviceUrl} from '../../../../utils/Constants/ServiceUrls';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SelectDropdown from 'react-native-select-dropdown';
import MultiSelect from 'react-native-multiple-select';
import {fonts} from '../../../../theme/fonts';
import DateTimePicker from '../../../../components/dateTimePicker';
import {CheckBox} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';

const EditProfile = () => {
  const [state, setState] = useState({
    fields: [],
    loading: false,
  });

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const {userData} = useSelector(
    state => ({
      userData: state.auth?.loginData,
    }),
    shallowEqual,
  );

  useEffect(() => {
    setState(prev => ({...prev, loading: true}));
    dispatch(
      getProfileFieldsReq(res => {
        fetchData(res);
      }),
    );
  }, []);

  const fetchData = async fields => {
    // Map array to an array of Promises for API requests
    const promises = fields.map(obj => {
      return fetch(
        `${serviceUrl.apiUrl}buddypress/v1/xprofile/${obj?.id}/data/${userData?.id}`,
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Request failed.');
          }
        })
        .then(data => {
          if (
            obj?.type === 'textbox' ||
            obj?.type === 'telephone' ||
            obj.type === 'url' ||
            obj.type === 'number'
          ) {
            obj.otherValue = data?.[0]?.value?.unserialized?.[0];
          } else if (obj.type === 'multiselectbox') {
            obj.options.map(item1 => {
              if (item1?.name === data?.[0]?.value?.unserialized?.[0]) {
                obj.otherValue = item1?.id;
              }
            });
          } else if (obj.type === 'checkbox') {
            obj.options.map(item1 => {
              if (data?.[0]?.value?.unserialized.includes(item1?.name)) {
                item1.checked = true;
              } else {
                item1.checked = false;
              }
            });
            obj.otherValue = data?.[0]?.value?.unserialized;
          } else {
            obj.otherValue = data?.[0]?.value?.unserialized;
          }
          return obj;
        })
        .catch(error => {
          console.error(error);
        });
    });

    // Wait for all Promises to resolve and log final array
    const newData = await Promise.all(promises);
    setState(prev => ({...prev, fields: newData, loading: false}));
  };

  const onSubmit = data => {
    const newArray = filteredData.map(
      ({id, name, type, is_required, options}) => ({
        id,
        name,
        type,
        is_required,
        options,
      }),
    );
    for (const key in data) {
      newArray?.map(arr => {
        if (key === arr?.name) {
          arr.value = data[key];
          return arr;
        }

        if (
          arr?.type === 'textbox' ||
          arr?.type === 'telephone' ||
          arr.type === 'url' ||
          arr.type === 'number' ||
          arr.type === 'member_types' ||
          arr.type === 'datebox' ||
          arr.type === 'selectbox' ||
          arr.type === 'radio' ||
          arr.type === 'checkbox' ||
          arr.type === 'textarea'
        ) {
          delete arr.options;
        }
      });
    }

    const finalArray = newArray?.map(newArr => {
      if (newArr?.type === 'checkbox') {
        newArr.value = newArr?.value
          ?.filter(obj => obj.checked) // keep only objects with checked: true
          .map(obj => obj.name);
        return newArr;
      }

      if (newArr?.type === 'multiselectbox') {
        newArr.value = newArr?.options
          ?.filter(obj => newArr?.value?.includes(obj.id))
          .map(obj => obj.name);
        delete newArr?.options;
        let field_id = newArr.id;
        delete newArr.id;
        return {
          ...newArr,
          field_id,
        };
      }
      let field_id = newArr.id;
      delete newArr.id;
      return {
        ...newArr,
        field_id,
      };
    });

    callUpdateUserProfileFn(finalArray);
  };

  const callUpdateUserProfileFn = finalArray => {
    setState(prev => ({...prev, loading: true}));

    dispatch(
      updateProfileReq(finalArray, res => {
        console.log('Resss', res);
        if (res?.success) {
          showMessage({
            message: 'Profile updated successfully',
            type: 'success',
          });
        }
        setState(prev => ({...prev, loading: false}));
      }),
    );
  };

  const filteredData = useMemo(() => {
    return state.fields?.filter(
      item => item?.name && item?.type !== 'textarea',
    );
  }, [state.fields]);

  const toggleValue = index => {
    let fields = filteredData?.map(item => {
      if (item?.type === 'checkbox') {
        item.options[index].checked = !item?.options?.[index]?.checked;
        return item;
      }
      return item;
    });
    setState(prev => ({...prev, fields: [...fields]}));
  };

  const renderForm = () => {
    if (filteredData) {
      return filteredData?.map((field, index) => {
        const {name, type, is_required} = field;

        let validationRules = {};
        if (is_required) {
          validationRules.required = `${name} is required`;
        }

        if (
          type === 'textbox' ||
          type === 'telephone' ||
          type === 'url' ||
          type === 'number'
        ) {
          return (
            <View key={index}>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => {
                  return (
                    <TextInput
                      value={value}
                      mode="outlined"
                      keyboardType={
                        field?.type === 'number' ? 'number-pad' : 'default'
                      }
                      label={name}
                      activeOutlineColor={darkColors.darkGreen}
                      outlineColor={darkColors.darkGreen}
                      onChangeText={onChange}
                      style={styles.txtInput}
                      placeholder={name}
                      placeholderTextColor={'gray'}
                      autoCapitalize="none"
                    />
                  );
                }}
                name={name}
                defaultValue={field?.otherValue}
                rules={validationRules}
              />
              {errors[name] && (
                <Text style={styles.errorMsg}>{errors?.[name]?.message}</Text>
              )}
            </View>
          );
        } else if (type === 'selectbox') {
          return (
            <View key={index}>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => {
                  return (
                    <SelectDropdown
                      data={field?.options}
                      onSelect={onChange}
                      buttonStyle={styles.dropDown}
                      rowTextForSelection={(item, index) => {
                        return item?.name;
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <MaterialIcons
                            name="arrow-drop-down"
                            size={scale(30)}
                            color={darkColors.darkGreen}
                          />
                        );
                      }}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={styles.dropDownBtnWrapper}>
                            <Text style={styles.dropDownPlaceHolder}>
                              {field?.otherValue?.[0] && !selectedItem?.name
                                ? field?.otherValue?.[0]
                                : selectedItem?.name || name}
                            </Text>
                          </View>
                        );
                      }}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                  );
                }}
                name={name}
                defaultValue={field?.otherValue?.[0]}
                rules={validationRules}
              />
              {errors[name] && (
                <Text style={styles.errorMsg}>{errors?.[name]?.message}</Text>
              )}
            </View>
          );
        } else if (type === 'multiselectbox') {
          return (
            <View key={index}>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => {
                  return (
                    <MultiSelect
                      items={field?.options}
                      uniqueKey="id"
                      displayKey="name"
                      onSelectedItemsChange={onChange}
                      selectedItems={value}
                      selectText={name}
                      styleDropdownMenu={styles.dropDown1Inner}
                      styleIndicator={styles.styleIndicator}
                      styleDropdownMenuSubsection={styles.dropDown1Outer}
                      selectedItemIconColor={darkColors.darkGreen}
                      selectedItemFontFamily={fonts.MontserratSemiBold}
                      selectedItemTextColor={darkColors.darkGreen}
                      styleMainWrapper={styles.styleMainWrapper}
                      tagBorderColor={darkColors.darkGreen}
                      tagTextColor={darkColors.darkGreen}
                      submitButtonColor={darkColors.darkGreen}
                      tagRemoveIconColor={darkColors.darkGreen}
                      styleItemsContainer={styles.styleItemsContainer}
                      submitButtonText="DONE"
                    />
                  );
                }}
                name={name}
                defaultValue={[field?.otherValue]}
                rules={validationRules}
              />
              {errors[name] && (
                <Text style={styles.errorMsg}>{errors?.[name]?.message}</Text>
              )}
            </View>
          );
        } else if (type === 'datebox') {
          return (
            <View key={index}>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => {
                  return (
                    <DateTimePicker
                      value={value}
                      onChange={onChange}
                      name={name}
                    />
                  );
                }}
                name={name}
                defaultValue={field?.otherValue[0]}
                rules={validationRules}
              />
              {errors[name] && (
                <Text style={styles.errorMsg}>{errors?.[name]?.message}</Text>
              )}
            </View>
          );
        } else if (type === 'radio') {
          return (
            <View key={index}>
              <Text style={styles.label1}>{name}</Text>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => {
                  return (
                    <View style={styles.rowWrapper}>
                      {field?.options?.map(btn => {
                        return (
                          <Pressable
                            onPress={() => {
                              onChange(btn?.name);
                            }}
                            style={styles.radioWrapper}>
                            <Text style={styles.label}>{btn?.name}</Text>
                            <View style={styles.radioView}>
                              <View
                                style={{
                                  ...styles.dot,
                                  backgroundColor:
                                    btn?.name === value
                                      ? darkColors.darkGreen
                                      : 'white',
                                }}
                              />
                            </View>
                          </Pressable>
                        );
                      })}
                    </View>
                  );
                }}
                name={name}
                defaultValue={field?.otherValue[0]}
                rules={validationRules}
              />
              {errors[name] && (
                <Text style={styles.errorMsg}>{errors?.[name]?.message}</Text>
              )}
            </View>
          );
        } else if (type === 'checkbox') {
          return (
            <View key={index}>
              <Text style={styles.label1}>{name}</Text>

              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => {
                  return (
                    <View style={styles.checkBoxWrapper}>
                      {field?.options?.map((btn, ind) => {
                        return (
                          <CheckBox
                            containerStyle={styles.checkbox}
                            checkedColor={darkColors.darkGreen}
                            title={btn?.name}
                            checked={btn?.checked}
                            onPress={() => {
                              toggleValue(ind);
                            }}
                          />
                        );
                      })}
                    </View>
                  );
                }}
                name={name}
                defaultValue={field?.options}
                rules={validationRules}
              />
              {errors[name] && (
                <Text style={styles.errorMsg}>{errors?.[name]?.message}</Text>
              )}
            </View>
          );
        } else if (type === 'member_types') {
          const allData = Object.values(field?.options);
          return (
            <View key={index}>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => {
                  return (
                    <SelectDropdown
                      data={allData}
                      onSelect={onChange}
                      buttonStyle={styles.dropDown}
                      rowTextForSelection={(item, index) => {
                        return (
                          item.substring(0, 1).toUpperCase() + item.substring(1)
                        );
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <MaterialIcons
                            name="arrow-drop-down"
                            size={scale(30)}
                            color={darkColors.darkGreen}
                          />
                        );
                      }}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={styles.dropDownBtnWrapper}>
                            <Text style={styles.dropDownPlaceHolder}>
                              {selectedItem
                                ? selectedItem.substring(0, 1).toUpperCase() +
                                  selectedItem.substring(1)
                                : ''}
                            </Text>
                          </View>
                        );
                      }}
                      defaultValue={field?.otherValue[0].toString()}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                  );
                }}
                name={name}
                rules={validationRules}
              />
              {errors[name] && (
                <Text style={styles.errorMsg}>{errors?.[name]?.message}</Text>
              )}
            </View>
          );
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <Spinner visible={state.loading} />
        <Ionicons
          onPress={() => goBack()}
          name="arrow-back"
          color={darkColors.darkGreen}
          size={scale(30)}
        />
        <ScrollView
          keyboardShouldPersistTaps={true}
          showsVerticalScrollIndicator={false}>
          <ProfilePicDashboard />

          <View style={styles.form}>{renderForm()}</View>

          {filteredData?.length > 0 ? (
            <Pressable
              style={styles.submitBtn}
              onPress={handleSubmit(onSubmit)}>
              <Text style={styles.btnLabel}>Submit</Text>
            </Pressable>
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
