import * as React from 'react';
import {View, Text, Modal, ActivityIndicator} from 'react-native';
import {darkColors} from '../../theme/colors';
import styles from './styles';

export interface SpinnerPropTypes {
  cancelable?: boolean;
  color?: string;
  animation?: 'none' | 'slide' | 'fade';
  overlayColor?: string;
  size?: 'small' | 'large' | number; // size props does not support value normal
  visible?: boolean;
  children?: React.ReactNode;
  spinnerKey?: string;
}

const Spinner = ({
  cancelable = false,
  animation = 'none',
  overlayColor = 'rgba(0, 0, 0, 0.25)',
  size = 'large',
  visible = false,
  children,
  spinnerKey,
  color
}: SpinnerPropTypes) => {
  const [spinnerVisible, setSpinnerVisibility] = React.useState(visible);
  const close = () => {
    setSpinnerVisibility(false);
  };

  const _handleOnRequestClose = () => {
    if (cancelable) {
      close();
    }
  };

  React.useEffect(() => {
    setSpinnerVisibility(visible);
  }, [visible]);
  const _renderDefaultContent = () => {
    return (
      <View style={styles.background}>
        <View style={styles.textContainer}>
          <ActivityIndicator color={color ? color : darkColors.darkGreen} size={size} />

          <Text style={[styles.textContent,{color:  color ? color : darkColors.darkGreen}]}>Please wait...</Text>
        </View>
      </View>
    );
  };

  const _renderSpinner = () => {
    const spinner = (
      <View
        style={[styles.container, {backgroundColor: overlayColor}]}
        key={spinnerKey || `spinner_${Date.now()}`}>
        {children || _renderDefaultContent()}
      </View>
    );

    return (
      <Modal
        animationType={animation}
        onRequestClose={() => {
          _handleOnRequestClose();
        }}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={spinnerVisible}
        statusBarTranslucent={true}>
        {spinner}
      </Modal>
    );
  };

  return _renderSpinner();
};

export default Spinner;
