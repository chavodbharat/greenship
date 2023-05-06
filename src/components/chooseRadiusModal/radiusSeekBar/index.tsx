import React, {useRef, useState} from 'react';
import {View, Animated, StyleSheet, Pressable, Text} from 'react-native';
import styles from './styles';
import {darkColors} from '../../../theme/colors';
import {scale} from '../../../theme/responsive';

interface radiusSeekBarProps {
  dots?: any;
  onRadiusChange?: any;
  dotsColor?: any;
  dataArray: any
}

const RadiusSeekBar: React.FC<radiusSeekBarProps> = ({
  dots,
  onRadiusChange,
  dotsColor,
  dataArray
}) => {
  const [selectedIndex, setIndex] = useState(0);
  let animation = useRef(new Animated.Value(10));

  const update = index => {
    setIndex(index);
    onRadiusChange(
      index === 0 ? dataArray[0] : index === 1 ? dataArray[1] : index === 2 ? dataArray[2] : dataArray[3],
    );
    let to = index === 0 ? 10 : index === 1 ? 36 : index === 2 ? 60 : 111.5;
    Animated.timing(animation.current, {
      toValue: to,
      duration: 20,
    }).start();
  };

  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '90%'],
    extrapolate: 'extend',
  });
  return (
    <View style={styles.seekBar}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: dotsColor ? dotsColor : darkColors.dashboardEmergencyBG,
            width,
            borderRadius: 8,
          },
        ]}
      />

      <View style={styles.wrapper}>
        {[...Array(dots)]?.map((item, index) => {
          return (
            <View
              style={{
                marginRight:
                  index === 0 ? -scale(20) : index === 1 ? -scale(5) : 0,
              }}>
              <Pressable
                onPress={() => update(index)}
                style={{
                  ...styles.dot,
                  backgroundColor:
                    selectedIndex >= index
                      ? dotsColor ? dotsColor : darkColors.dashboardEmergencyBG
                      : darkColors.petPassportTextColor,
                }}></Pressable>
              <Text style={styles.radiusLabel}>
                {index === 0
                  ? dataArray[0]
                  : index === 1
                  ? dataArray[1]
                  : index === 2
                  ? dataArray[2]
                  : dataArray[3]}{' '}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default RadiusSeekBar;
