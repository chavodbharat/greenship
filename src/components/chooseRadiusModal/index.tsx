import React, {useState} from 'react';
import {View, Text, Modal, Pressable} from 'react-native';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import {darkColors} from '../../theme/colors';
import {scale} from '../../theme/responsive';
import RadiusSeekBar from './radiusSeekBar';
import LinearGradient from 'react-native-linear-gradient';

interface chooseRadiusModalProps {
  modalVisible?: boolean;
  setModalVisible?: Function;
  onSubmit?: any;
}
const ChooseRadiusModal: React.FC<chooseRadiusModalProps> = ({
  modalVisible = false,
  setModalVisible,
  onSubmit,
}) => {
  const [radius, selectedRadius] = useState(0);

  const onRadiusChange = value => {
    selectedRadius(value);
  };

  const submit = () => {
    onSubmit(radius);
    setModalVisible && setModalVisible();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible && setModalVisible()}>
      <View style={styles.overlay}>
        <LinearGradient
          style={styles.modalContainer}
          colors={[darkColors.gradientLightGray, darkColors.gradientGary]}>
          <Entypo
            onPress={setModalVisible}
            name="circle-with-cross"
            size={scale(30)}
            style={styles.crossIcon}
            color={darkColors.dashboardEmergencyBG}
          />
          <Text style={styles.title}>please choose a radius</Text>

          <RadiusSeekBar dots={4} onRadiusChange={onRadiusChange} />

          <Pressable onPress={submit} style={styles.submitBtn}>
            <Text style={styles.btnLabel}>submit</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default ChooseRadiusModal;
