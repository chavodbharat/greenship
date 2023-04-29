// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, CheckBox, Picker } from 'react-native';
// import { useForm, Controller } from 'react-hook-form';

// const DynamicForm = () => {
//   const [formData, setFormData] = useState(null);
//   const { control, handleSubmit, formState: { errors } } = useForm();

//   useEffect(() => {
//     // fetch data from API and set formData state
//     const fetchData = async () => {
//       const response = await fetch('https://example.com/formData');
//       const data = await response.json();
//       setFormData(data);
//     };
//     fetchData();
//   }, []);

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   const renderForm = () => {
//     if (formData) {
//       return formData.map((field, index) => {
//         const { name, label, type, value, options, required, pattern, errorMessage } = field;

//         let validationRules = {};
//         if (required) {
//           validationRules.required = `${label} is required`;
//         }
//         if (pattern) {
//           validationRules.pattern = {
//             value: new RegExp(pattern),
//             message: `Invalid ${label}`
//           };
//         }

//         if (type === 'text') {
//           return (
//             <View key={index}>
//               <Text>{label} {required ? '*' : null}</Text>
//               <Controller
//                 control={control}
//                 name={name}
//                 defaultValue={value}
//                 rules={{required:true}}
//                 render={({ field: { onChange, onBlur, value } }) => (
//                   <TextInput
//                     placeholder={label}
//                     onChangeText={onChange}
//                     onBlur={onBlur}
//                     value={value}
//                   />
//                 )}
//               />
//               {errors[name] && <Text style={{ color: 'red' }}>{errors[name].message}</Text>}
//             </View>
//           );
//         } else if (type === 'checkbox') {
//           return (
//             <View key={index}>
//               <Text>{label} {required ? '*' : null}</Text>
//               <Controller
//                 control={control}
//                 name={name}
//                 defaultValue={value}
//                 rules={validationRules}
//                 render={({ field: { onChange, onBlur, value } }) => (
//                   <View>
//                     <CheckBox
//                       value={value}
//                       onValueChange={onChange}
//                     />
//                     <Text>{label}</Text>
//                   </View>
//                 )}
//               />
//               {errors[name] && <Text style={{ color: 'red' }}>{errors[name].message}</Text>}
//             </View>
//           );
//         } else if (type === 'dropdown') {
//           return (
//             <View key={index}>
//               <Text>{label} {required ? '*' : null}</Text>
//               <Controller
//                 control={control}
//                 name={name}
//                 defaultValue={value}
//                 rules={validationRules}
//                 render={({ field: { onChange, onBlur, value } }) => (
//                   <Picker
//                     selectedValue={value}
//                     onValueChange={onChange}>
//                     {options.map((option, optionIndex) => (
//                       <Picker.Item
//                         key={optionIndex}
//                         label={option.label}
//                         value={option.value}
//                       />
//                     ))}
//                   </Picker>
//                 )}
//               />
//               {errors[name] && <Text style={{ color: 'red' }}>{errors[name].message}</Text>}
//             </View>
//           );
//         }
//       });

import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {MultiSelect} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DATA = [
  {label: 'React Naive', value: '1'},
  {label: 'Javascript', value: '2'},
  {label: 'Laravel', value: '3'},
  {label: 'PHP', value: '4'},
  {label: 'jQuery', value: '5'},
  {label: 'Bootstrap', value: '6'},
  {label: 'HTML', value: '7'},
  {label: 'CSS', value: '8'},
];

const App = () => {
  const [selected, setSelected] = React.useState([]);

  const renderDataItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={DATA}
        labelField="label"
        valueField="value"
        placeholder="Multi Select item"
        value={selected}
        search
        searchPlaceholder="Search..."
        onChange={item => {
          setSelected(item);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
        renderItem={renderDataItem}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <Text style={styles.textSelectedStyle}>{item.label}</Text>
              <AntDesign color="black" name="delete" size={17} />
            </View>
          </TouchableOpacity>
        )}
      />
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#37d5d2a2',
    paddingTop: 30,
    flex: 1,
  },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});

export default App;
