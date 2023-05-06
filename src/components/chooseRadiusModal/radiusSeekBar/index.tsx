import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View, Animated, StyleSheet, Pressable, Text} from 'react-native';
import styles from './styles';
import {darkColors} from '../../../theme/colors';
import {scale} from '../../../theme/responsive';
interface radiusSeekBarProps {
  dots?: any;
  onRadiusChange?: any;
  radius?: any;
}

const RadiusSeekBar: React.FC<radiusSeekBarProps> = ({
  dots,
  onRadiusChange,
  radius,
}) => {
  const [selectedIndex, setIndex] = useState(0);
  let animation = useRef(new Animated.Value(10));

  useEffect(() => {
    setIndex(radius);
  }, [radius]);

  useEffect(() => {
    let to =
      selectedIndex === 0
        ? 10
        : selectedIndex === 1
        ? 36
        : selectedIndex === 2
        ? 60
        : 111.5;
    Animated.timing(animation.current, {
      toValue: to,
      duration: 20,
    }).start();
  }, [selectedIndex]);

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
            backgroundColor: darkColors.dashboardEmergencyBG,
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
                onPress={() => {
                  setIndex(index);
                  onRadiusChange(index);
                }}
                style={{
                  ...styles.dot,
                  backgroundColor:
                    selectedIndex >= index
                      ? darkColors.dashboardEmergencyBG
                      : 'black',
                }}></Pressable>
              <Text style={styles.radiusLabel}>
                {index === 0
                  ? '25'
                  : index === 1
                  ? '50'
                  : index === 2
                  ? '100'
                  : '200'}{' '}
                km
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default RadiusSeekBar;
