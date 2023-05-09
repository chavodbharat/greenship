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
import {scale, verticalScale} from '../../theme/responsive';
import { fonts } from '../../theme/fonts';
import {LoginManager} from 'react-native-fbsdk-next';

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

  const facebookLogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          alert('Login Cancelled ' + JSON.stringify(result));
        } else {
          alert(
            'Login success with  permisssions: ' +
              result.grantedPermissions.toString(),
          );
          alert('Login Success ' + result.toString());
        }
      },
      function (error) {
        alert('Login failed with error: ' + error);
      },
    );
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
        <View style={styles.flexOneView}>
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
        </View>
        <View style={styles.flexOneView}>
          <View style={[styles.flexOneView,{justifyContent: 'center'}]}>
            {Platform.OS === 'ios' && version >= 13 && (
              <View style={{alignSelf: 'center'}}>
                <AppleButton
                  onPress={onAppleButtonPress}
                  buttonStyle={AppleButton.Style.WHITE}
                  cornerRadius={5}
                  buttonType={AppleButton.Type.SIGN_IN}
                  textStyle={{fontFamily: fonts.MontserratSemiBold}}
                  style={{
                    width: scale(320), // You must specify a width
                    height: scale(35), // You must specify a height
                    borderWidth: scale(1),
                    borderRadius: scale(4),
                    marginBottom: verticalScale(8),
                  }}
                />
              </View>
            )}
            <Pressable onPress={facebookLogin} style={styles.btn}>
              <Image
                style={styles.icon}
                source={require('../../assets/images/facebook_logo.png')}
              />
              <View style={styles.wrapper}>
                <Text style={styles.socialBtnLabel}>SignIn with facebook</Text>
              </View>
            </Pressable>
            <Pressable onPress={gmailSignIn} style={styles.btn}>
              <Image
                style={styles.icon}
                source={require('../../assets/images/logo_google.png')}
              />
              <View style={styles.wrapper}>
                <Text style={styles.socialBtnLabel}>SignIn with gmail</Text>
              </View>
            </Pressable>
          </View>

          <View style={styles.end}>
            <Pressable
              onPress={() => Linking.openURL('mailto:support@example.com')}
              style={styles.accordion}>
              <Text style={styles.accordionTitle}>Do You need help ??</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
