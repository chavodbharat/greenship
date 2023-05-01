import React, {useState} from 'react';
import styles from './styles';
import {Text, View} from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';

const CustomTrackMarkSlider = () => {
  
  const DEFAULT_VALUE = 0.2;

  const SliderContainer = (props: {
    caption: string;
    children: React.ReactElement;
    sliderValue?: Array<number>;
    trackMarks?: Array<number>;
    vertical?: boolean;
  }) => {
    const {caption, sliderValue, trackMarks} = props;
    const [value, setValue] = React.useState(
        sliderValue ? sliderValue : DEFAULT_VALUE,
    );
    let renderTrackMarkComponent: React.ReactNode;
  
    if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
        renderTrackMarkComponent = (index: number) => {
          const currentMarkValue = trackMarks[index];
          const currentSliderValue =
              value || (Array.isArray(value) && value[0]) || 0;
          const style =
              currentMarkValue > Math.max(currentSliderValue)
                  ? styles.activeMark
                  : styles.inactiveMark;
          return (
            <>
              <View style={style} />
              <Text style={styles.textIndicatorTitle}>{(index+1)*10}</Text>
            </>
            );
        };
    }
  
    const renderChildren = () => {
      return React.Children.map(
        props.children,
        (child: React.ReactElement) => {
          if (!!child && child.type === Slider) {
              return React.cloneElement(child, {
                  onValueChange: setValue,
                  renderTrackMarkComponent,
                  trackMarks,
                  value,
              });
          }
          return child;
        },
      );
    };
  
    return (
      <View style={styles.sliderContainer}>
        <View style={styles.titleContainer}>
          <Text>{caption}</Text>
          <Text>{Array.isArray(value) ? value.join(' - ') : value}</Text>
        </View>
        {renderChildren()}
      </View>
    );
  };

  return (
    <>
      <SliderContainer
        caption="Radius"
        sliderValue={[0]}
        trackMarks={[5, 10, 15, 20]}>
        <Slider thumbStyle={{width: 0, height: 0}} maximumValue={25} minimumValue={0} step={1} />
      </SliderContainer>
    </>
  );
};

export default CustomTrackMarkSlider;
