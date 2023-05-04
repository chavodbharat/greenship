import React, {useEffect} from 'react';
import styles from './styles';
import {View, Text, Image, Pressable, Linking, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {navigate} from '../../routing/navigationRef';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import appleAuth, {
  AppleButton,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
  AppleAuthError,
} from '@invertase/react-native-apple-authentication';
import DeviceInfo from 'react-native-device-info';
import {scale} from '../../theme/responsive';
const version = parseFloat(DeviceInfo.getSystemVersion());

const Welcome = () => {
  useEffect(() => {
    configureGmail();
  }, []);

  const configureGmail = () => {
    GoogleSignin.configure({
      webClientId:
        '1050826608828-8hjbfv4ocrq1f3fs92smnd1airjejkdc.apps.googleusercontent.com',
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

  const onAppleButtonPress = async () => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    console.log('fff', appleAuthRequestResponse);

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
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

        {Platform.OS === 'ios' && version >= 13 && (
          <View style={{alignSelf: 'center'}}>
            <AppleButton
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.SIGN_IN}
              style={{
                width: scale(85),
                height: scale(6.2),
              }}
              onPress={onAppleButtonPress}
            />
          </View>
        )}

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
