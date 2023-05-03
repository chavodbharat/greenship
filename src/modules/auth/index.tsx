import React, {useEffect} from 'react';
import styles from './styles';
import {View, Text, Image, Pressable, Linking} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {navigate} from '../../routing/navigationRef';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Welcome = () => {
  useEffect(() => {
    configureGmail();
  }, []);

  const configureGmail = () => {
    GoogleSignin.configure({
      webClientId:
        '479686451206-b6g9qb2jqv990v4v2a7mcjhg5gtl1b0k.apps.googleusercontent.com',
      offlineAccess: false,
    });
  };

  const gmailSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      await GoogleSignin.signOut();

      const userInfo = await GoogleSignin.signIn();
      console.log('log', userInfo);
    } catch (error) {
      console.log('log0', error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Image
          resizeMode="contain"
          style={styles.img}
          source={require('../../assets/images/logo_name.png')}
        />

        <View style={styles.btnView}>
          <Pressable
            onPress={() => navigate('SignUp')}
            style={styles.signUpBtn}>
            <Text style={styles.btnLabel}>SIGN UP</Text>
          </Pressable>
          <Pressable onPress={() => navigate('Login')} style={styles.loginBtn}>
            <Text style={styles.btnLabel}>LOGIN</Text>
          </Pressable>
        </View>

        <View style={styles.btn}>
          <Image
            style={styles.icon}
            source={require('../../assets/images/facebook_logo.png')}
          />
          <View style={styles.wrapper}>
            <Text style={styles.socialBtnLabel}>SignIn with facebook</Text>
          </View>
        </View>
        <View style={styles.btn}>
          <Image
            style={styles.icon}
            source={require('../../assets/images/facebook_logo.png')}
          />
          <View style={styles.wrapper}>
            <Text style={styles.socialBtnLabel}>SignIn with facebook</Text>
          </View>
        </View>
        <Pressable onPress={gmailSignIn} style={styles.btn}>
          <Image
            style={styles.icon}
            source={require('../../assets/images/logo_google.png')}
          />
          <View style={styles.wrapper}>
            <Text style={styles.socialBtnLabel}>SignIn with gmail</Text>
          </View>
        </Pressable>

        <View style={styles.end}>
          <Pressable
            onPress={() => Linking.openURL('mailto:support@example.com')}
            style={styles.accordion}>
            <Text style={styles.accordionTitle}>Do You need help ??</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
