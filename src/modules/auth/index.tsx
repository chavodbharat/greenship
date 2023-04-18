import React from 'react';
import styles from './styles';
import {View, Text, Image, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {replace} from '../../routing/navigationRef';

const Welcome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Image
          resizeMode="contain"
          style={styles.img}
          source={require('../../assets/images/ic_app_landscape_logo.png')}
        />

        <View style={styles.btnView}>
          <Pressable onPress={() => replace('SignUp')} style={styles.signUpBtn}>
            <Text style={styles.btnLabel}>CREATE ACCOUNT</Text>
          </Pressable>
          <Pressable onPress={() => replace('Login')} style={styles.loginBtn}>
            <Text style={styles.btnLabel}>LOGIN</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
