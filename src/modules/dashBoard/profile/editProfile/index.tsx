import React from 'react';
import styles from './styles';
import {View, Text, SafeAreaView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {goBack} from '../../../../routing/navigationRef';
import {darkColors} from '../../../../theme/colors';
import {scale} from '../../../../theme/responsive';
import ProfilePicDashboard from '../../../../components/profilePicDashboard';

const EditProfile = () => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <Ionicons
          onPress={() => goBack()}
          name="arrow-back"
          color={darkColors.darkGreen}
          size={scale(30)}
        />

        <ProfilePicDashboard />
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
