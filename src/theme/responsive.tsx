import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

// Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 360;
const guidelineBaseHeight = 720;

// TODO: use react native inbuilt Pixel Ratio, available in latest RN version

// For paddingHorizontal, marginHorizontal, paddingLeft, paddingRight, marginLeft, marginRight, width
export const scale = (size: number) =>
  (shortDimension / guidelineBaseWidth) * size;

// For paddingVertical, marginVertical, paddingTop, paddingBottom, marginTop, marginBottom, height
export const verticalScale = (size: number) =>
  (longDimension / guidelineBaseHeight) * size;

// for font scaling
export const moderateScale = (size: number, factor = 0.3) =>
  size + (scale(size) - size) * factor;

// for line height scaling
export const moderateVerticalScale = (size: number, factor = 0.3) =>
  size + (verticalScale(size) - size) * factor;

export const actualScale = (num: number) => num;
export const scalingFactor = (size: number, factor = 0.3) =>
  (size + (scale(size) - size) * factor) * 0.88;
