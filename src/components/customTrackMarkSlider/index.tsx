import React, {useState} from 'react';
import styles from './styles';
import {Text, View} from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { fonts } from '../../theme/fonts';
import { CustomTrackMarkPropsInterface } from './types';

const CustomTrackMarkSlider = ({selectedColorCode}: CustomTrackMarkPropsInterface) => {
  
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
                  ? styles.inactiveMark
                  : [styles.activeMark, selectedColorCode && {backgroundColor: selectedColorCode}];
          return (
            <>
              <View style={style} />
              <Text style={styles.textIndicatorTitle}>{(index+1)*25} km</Text>
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
          <Text style={styles.titleTextColor}>{caption}</Text>
          {/* <Text>{Array.isArray(value) ? value.join(' - ') : value}</Text> */}
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
        trackMarks={[25, 50, 100, 200]}>
        <Slider trackStyle={styles.trackSliderParentView} 
          thumbStyle={{width: 0, height: 0}} maximumValue={250} 
          minimumValue={0} step={25} />
      </SliderContainer>
    </>
  );
};

export default CustomTrackMarkSlider;
