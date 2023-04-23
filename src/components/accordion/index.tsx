import React, {useState} from 'react';
import styles from './styles';
import {View, Text, Pressable} from 'react-native';
import {darkColors} from '../../theme/colors';
import {scale} from '../../theme/responsive';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Accordion = (item: any) => {
  const [state, setState] = useState({
    showView: false,
  });

  return (
    <LinearGradient
      colors={[darkColors.gradientGary, darkColors.gradientLightGray, 'white']}>
      <Pressable
        onPressIn={() => {
          setState(prev => ({...prev, showView: !state.showView}));
        }}
        style={styles.accordionBox}
        onPress={() => {}}>
        <View style={styles.rowWrapper}>
          <Text style={styles.accordionTitle}>{item.item?.title}</Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            color={darkColors.darkGreen}
            size={scale(30)}
          />
        </View>

        {state.showView ? <Text>{item?.item?.desc}</Text> : null}
      </Pressable>
    </LinearGradient>
  );
};

export default Accordion;
