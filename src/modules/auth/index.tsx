import React, {useEffect, useState} from 'react';
import styles from './styles';
import { View, Text, Image, Pressable, Linking, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigate } from '../../routing/navigationRef';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import appleAuth, {
  AppleButton,
  AppleRequestScope,
  AppleCredentialState,
  AppleError,
} from '@invertase/react-native-apple-authentication';
import DeviceInfo from 'react-native-device-info';
import AllImages from '../../utils/Constants/AllImages';
import LanguageListModal from '../../components/languageListModal';
import Localization from '../../locales/Localization';
import { useIsFocused } from '@react-navigation/native';
import { scale, verticalScale } from '../../theme/responsive';
import SocialLogin from './socialLogin/socialLogin';
import { Appbar } from 'react-native-paper';
// import {LoginManager} from 'react-native-fbsdk-next';

const version = parseFloat(DeviceInfo.getSystemVersion());

const Welcome = () => {

  const isFocused = useIsFocused();
  const [state, setState] = useState({
    isLanguageModalShow: false,
  });

  useEffect(() => {
    configureGmail();
  }, []);

  useEffect(() => {
    setState(prev => ({...prev, isLanguageModalShow: false}));
    console.log("cak====================", Localization.getLanguage())
  }, [isFocused]);

  const configureGmail = () => {
    GoogleSignin.configure({
      webClientId:
        '1050826608828-8hjbfv4ocrq1f3fs92smnd1airjejkdc.apps.googleusercontent.com',
      offlineAccess: false,
    });
  };

  // const gmailSignIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     await GoogleSignin.signOut();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log('log', userInfo);
  //   } catch (error) {
  //     console.log('log0', error);

  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };

  const facebookLogin = () => {
    // LoginManager.logInWithPermissions(['public_profile', 'email']).then(
    //   function (result) {
    //     if (result.isCancelled) {
    //       alert('Login Cancelled ' + JSON.stringify(result));
    //     } else {
    //       alert(
    //         'Login success with  permisssions: ' +
    //           result.grantedPermissions.toString(),
    //       );
    //       alert('Login Success ' + result.toString());
    //     }
    //   },
    //   function (error) {
    //     alert('Login failed with error: ' + error);
    //   },
    // );
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
    <View style={{
      flex: 1
    }}>
      <View></View>
      {/* <StatusBar
        backgroundColor={"green"}
        animated={true}
        // backgroundColor="green"
        barStyle={"default"}
        showHideTransition={"fade"}
        hidden={false}
      /> */}
      < SafeAreaView style={styles.container} >
        <View style={styles.main}>
          <Pressable
            onPress={() => setState(prev => ({...prev, isLanguageModalShow: true}))}>
            <View style={[styles.rowView,{marginVertical: scale(20), marginHorizontal: scale(20),
              justifyContent: 'flex-end'}]}>
              <Image
                style={styles.englishLanIcon}
                source={AllImages.englishLanIcon}
              />
              <Image
                style={styles.germanLanIcon}
                source={AllImages.germanLanIcon}
              />
            </View>
          </Pressable>
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
              <Pressable
                onPress={() => navigate('Login')}
                style={styles.loginBtn}>
                <Text style={styles.btnLabel}>LOGIN</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.flexOneView}>
            <SocialLogin />
            {/* <View style={[styles.flexOneView, {justifyContent: 'center'}]}>
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
          </View> */}

          <View style={styles.end}>
            <Pressable
              onPress={() => Linking.openURL('mailto:help@greensheep.earth')}
              style={styles.accordion}>
              <Text style={styles.accordionTitle}>Do You need help ??</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <LanguageListModal
        isModalVisible={state.isLanguageModalShow}
        onClose={() => setState(prev => ({...prev, isLanguageModalShow: false}))}/>
    </SafeAreaView>
    </View>
  );
};

export default Welcome;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
