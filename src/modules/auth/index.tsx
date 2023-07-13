/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {
  View,
  Text,
  Image,
  Pressable,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {navigate} from '../../routing/navigationRef';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import appleAuth, {
  AppleButton,
  AppleRequestOperation,
  // AppleRequestScope,
  // AppleCredentialState,
  // AppleError,
} from '@invertase/react-native-apple-authentication';
import DeviceInfo from 'react-native-device-info';
import AllImages from '../../utils/Constants/AllImages';
import LanguageListModal from '../../components/languageListModal';
import Localization from '../../locales/Localization';
import {useIsFocused} from '@react-navigation/native';
import {scale, verticalScale} from '../../theme/responsive';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SocialLogin from './socialLogin/socialLogin';
// import {Appbar} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {LoginManager} from 'react-native-fbsdk-next';

// import {LoginManager} from 'react-native-fbsdk-next';

import {loginSocialLoginRequest} from '../../redux/actions/authAction';
import {fonts} from '../../theme/fonts';

const version = parseFloat(DeviceInfo.getSystemVersion());

const Welcome = () => {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();
  const [state, setState] = useState({
    isLanguageModalShow: false,
  });

  useEffect(() => {
    configureGmail();
  }, []);

  useEffect(() => {
    setState(prev => ({...prev, isLanguageModalShow: false}));
    console.log('cak====================', Localization.getLanguage());
  }, [isFocused]);

  const configureGmail = () => {
    GoogleSignin.configure({
      webClientId:
        '1050826608828-8hjbfv4ocrq1f3fs92smnd1airjejkdc.apps.googleusercontent.com',
      offlineAccess: false,
    });
  };

  const callAPI_SocialLogin = (
    strLoignType: String,
    strSocialToken: String,
    strFirstName: String,
    strLastName: String,
    strEmail: String,
    strProfilePicture: String,
  ) => {
    // Note: beclow JSON params is created by our side, for social login
    // {
    //     "loignType":"fb", //, "google", "apple",
    //     "deviceType":"android", //"iOS"
    //     "socialToken":"asfjlsjfdsl", //String
    //     "firstName":"Vivek", // Any User Name will provide from Social Login
    //     "lastName":"xyz", //
    //     "email":"abc@gmail.com",
    //     "profilePicture":"url",
    // }
    // API Call social Login
    // Apple Login Response Sample
    // {
    //     "authorizationCode": "baa345144b68b483c4dcbb6",
    //     "authorizedScopes": [],
    //     "email": null,
    //     "fullName": {
    //         "familyName": null,
    //         "givenName": null,
    //         "middleName": null,
    //         "namePrefix": null,
    //         "nameSuffix": null,
    //         "nickname": null
    //     },
    //     "identityToken": "eyJraWQiOiJXNldj",
    //     "nonce": "OTjpR5cU2T42wZjGfk",
    //     "realUserStatus": 1,
    //     "state": null,
    //     "user": "0e9d46289b7b4733b569baf107cd1dd2"
    // }
    // {
    //     "authorizationCode": "0.rzyr.VjNevHl1mXa0YHvXGePgAw",
    //     "authorizedScopes": [],
    //     "email": "vivek.vithlani.v@gmail.com",
    //     "fullName": {
    //         "familyName": "Vithalani",
    //         "givenName": "Vivek",
    //         "middleName": null,
    //         "namePrefix": null,
    //         "nameSuffix": null,
    //         "nickname": null
    //     },
    //     "identityToken": "iwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLmVhcnRoLmdyZWVuc2hlZXAiLCJleHAiOjE2ODgzMDE5OTgsImlhdCI6MTY4ODIxNTU5OCwic3ViIjoiMDAwOTgxLjBlOWQ0NjI4OWI3YjQ3MzNiNTY5YmFmMTA3Y2QxZGQyLjA5MzgiLCJub25jZSI6IjIzZDZhN2I5OGQwYjUyMzY1ODBiNDU0NzRmNDNmNzA5OGQ2ODdhMmI1N2JlMWNmOGY1OTA2ODE5OGQzNTVhOTciLCJjX2hhc2giOiJFdUdRMElYcmF3U1BrNmhFNkg4QTVRIiwiZW1haWwiOiJ2aXZlay52aXRobGFuaS52QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjoidHJ1ZSIsImF1dGhfdGltZSI6MTY4ODIxNTU5OCwibm9uY2Vfc3VwcG9ydGVkIjp0cnVlLCJyZWFsX3VzZXJfc3RhdHVzIjoyfQ.oXhYYPizzuHA2GyiJQNXc8YItxbAFcGprfHsqtluZfl-vBPOhUOBFqSKr0TWH7y72p7UNq1hM6L-i7gur18cTWa-q6cO9cc1Zzicsqx1b-_X0wwQ6BN-4JGtNZGRTQxHeBHIFuuDVLmIh2uuGIlKPH39XxU98jh_HelxjdPfDU8DP2XaOeYCGZpZwCsLgExx_11K9sIao2u4t-XEDsp4sg9KlLcLSc-i2CvmTKGjQoFG2HbohQhAsSbG-dZDuGtzBD17uNESzbGopf7j-XLDsaBFa1TCw163LKr0yHO-BXClLYNMP_FZ1GBW3zSAUoy_aSxbmYVYoFbbqcBMMXtXhg",
    //     "nonce": "svRDZDNRfIHNVFeglSo",
    //     "realUserStatus": 2,
    //     "state": null,
    //     "user": "b569baf107cd1dd2.0938"
    //}
    var isError = false;
    var strMessage = '';
    console.log('Email ', strEmail);

    if (strEmail.length <= 0) {
      isError = true;
      strMessage = 'Email is missing';
    }

    if (isError) {
      alert('Error found = ' + strMessage);
    } else {
      let body = {
        loignType: strLoignType,
        deviceType: Platform.OS === 'ios' ? 'iOS' : 'android',
        socialToken: strSocialToken,
        firstName: strFirstName,
        lastName: strLastName,
        email: strEmail,
        profilePicture: strProfilePicture,
      };

      // API Call
      setState(prev => ({...prev, loader: true}));

      dispatch(
        loginSocialLoginRequest(body, (res: any) => {
          setState(prev => ({...prev, loader: false}));
          console.log('response = ', res);
        }),
      );
    }
  };

  const gmailSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log('log', userInfo);
      callAPI_SocialLogin(
        'google',
        userInfo.idToken ?? '',
        userInfo.user.givenName ?? '',
        userInfo.user.familyName ?? '',
        userInfo.user.email ?? '',
        userInfo.user.photo ?? '',
      );

      //             email: appgreensheep@gmail.com
      // pass: appgreensheep@23
      // {
      //     "email": "vivek.vithlani.v@gmail.com",
      //     "familyName": "Vithalani",
      //     "givenName": "Vivek",
      //     "id": "11748329794",
      //     "name": "Vivek Vithalani",
      //     "photo": "https://lh3.googleusercontent.com/a/AAcHTtd5KHg4FbisIeH4_FgXhcoenQhvc8bNNMxpcG7DBkmVAtk=s120"
      // }
    } catch (error: any) {
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

  // const oldFacebookLogin = () => {
  //   // LoginManager.logInWithPermissions(['public_profile', 'email']).then(
  //   //   function (result) {
  //   //     if (result.isCancelled) {
  //   //       alert('Login Cancelled ' + JSON.stringify(result));
  //   //     } else {
  //   //       alert(
  //   //         'Login success with  permisssions: ' +
  //   //           result.grantedPermissions.toString(),
  //   //       );
  //   //       alert('Login Success ' + result.toString());
  //   //     }
  //   //   },
  //   //   function (error) {
  //   //     alert('Login failed with error: ' + error);
  //   //   },
  //   // );
  // };

  const facebookLogin = () => {
    // 'public_profile',
    LoginManager.logInWithPermissions(['email']).then(
      function (result) {
        console.warn('facebook login result = ', result);
        if (result.isCancelled) {
          alert('Login Cancelled ' + JSON.stringify(result));
        } else {
          alert('facebook login success');
          // alert(
          //   'Login success with  permisssions: ' +
          //     result.grantedPermissions.toString(),
          // );
          // alert('Login Success ' + JSON.stringify(result));
        }
      },
      // function (error) {
      //   alert('Login failed with error: ' + error);
      // },
    );
  };

  const appleLogin = async () => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    // {
    //     "authorizationCode": "0.rzyr.VjNevHl1mXa0YHvXGePgAw",
    //     "authorizedScopes": [],
    //     "email": "vivek.vithlani.v@gmail.com",
    //     "fullName": {
    //         "familyName": "Vithalani",
    //         "givenName": "Vivek",
    //         "middleName": null,
    //         "namePrefix": null,
    //         "nameSuffix": null,
    //         "nickname": null
    //     },
    //     "identityToken": "iwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLmVhcnRoLmdyZWVuc2hlZXAiLCJleHAiOjE2ODgzMDE5OTgsImlhdCI6MTY4ODIxNTU5OCwic3ViIjoiMDAwOTgxLjBlOWQ0NjI4OWI3YjQ3MzNiNTY5YmFmMTA3Y2QxZGQyLjA5MzgiLCJub25jZSI6IjIzZDZhN2I5OGQwYjUyMzY1ODBiNDU0NzRmNDNmNzA5OGQ2ODdhMmI1N2JlMWNmOGY1OTA2ODE5OGQzNTVhOTciLCJjX2hhc2giOiJFdUdRMElYcmF3U1BrNmhFNkg4QTVRIiwiZW1haWwiOiJ2aXZlay52aXRobGFuaS52QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjoidHJ1ZSIsImF1dGhfdGltZSI6MTY4ODIxNTU5OCwibm9uY2Vfc3VwcG9ydGVkIjp0cnVlLCJyZWFsX3VzZXJfc3RhdHVzIjoyfQ.oXhYYPizzuHA2GyiJQNXc8YItxbAFcGprfHsqtluZfl-vBPOhUOBFqSKr0TWH7y72p7UNq1hM6L-i7gur18cTWa-q6cO9cc1Zzicsqx1b-_X0wwQ6BN-4JGtNZGRTQxHeBHIFuuDVLmIh2uuGIlKPH39XxU98jh_HelxjdPfDU8DP2XaOeYCGZpZwCsLgExx_11K9sIao2u4t-XEDsp4sg9KlLcLSc-i2CvmTKGjQoFG2HbohQhAsSbG-dZDuGtzBD17uNESzbGopf7j-XLDsaBFa1TCw163LKr0yHO-BXClLYNMP_FZ1GBW3zSAUoy_aSxbmYVYoFbbqcBMMXtXhg",
    //     "nonce": "svRDZDNRfIHNVFeglSo",
    //     "realUserStatus": 2,
    //     "state": null,
    //     "user": "b569baf107cd1dd2.0938"
    //}

    console.log('fullName', appleAuthRequestResponse.fullName);
    console.log('user', appleAuthRequestResponse.user);
    console.log('Email', appleAuthRequestResponse.email);
    console.log('response', appleAuthRequestResponse);
    var userInfo = appleAuthRequestResponse;
    var fullName = userInfo.fullName ?? {familyName: '', givenName: ''};

    if (appleAuthRequestResponse.email == null) {
      Alert.alert('Apple login', 'Email not found.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      callAPI_SocialLogin(
        'apple',
        userInfo.identityToken ?? '',
        fullName.givenName ?? '',
        fullName.familyName ?? '',
        appleAuthRequestResponse.email ?? '',
        '',
      );
    }
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    // const credentialState = await appleAuth.getCredentialStateForUser(
    //   appleAuthRequestResponse.user,
    // );

    // // use credentialState response to ensure the user is authenticated
    // if (credentialState === appleAuth.State.AUTHORIZED) {
    //   // user is authenticated
    // }
  };

  const appleLogout = async () => {
    // const appleAuthRequestLogout = await appleAuth.performRequest({
    //   requestedOperation: appleAuth.Operation.LOGOUT,
    //   //AppleRequestOperation.LOGOUT,
    // });
    // console.warn('logout = ', appleAuthRequestLogout);
    // console.log('Logout Pressed');

    // const appleAuthRequestRefresh = await appleAuth.performRequest({
    //   requestedOperation: AppleRequestOperation.REFRESH,
    // });
    // console.warn('logout + refresh = ', appleAuthRequestRefresh);

    // appleAuth.onCredentialRevoked(async () => {
    //   console.warn(
    //     'If this function executes, User Credentials have been Revoked',
    //   );

    // });
    appleLogin();
  };

  return (
    <View
      style={{
        flex: 1,
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
      <SafeAreaView style={styles.container}>
        <View style={styles.main}>
          <Pressable
            onPress={() =>
              setState(prev => ({...prev, isLanguageModalShow: true}))
            }>
            <View
              style={[
                styles.rowView,
                {
                  marginVertical: scale(20),
                  marginHorizontal: scale(20),
                  justifyContent: 'flex-end',
                },
              ]}>
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
            {/* <SocialLogin /> */}
            <></>
            <View style={[styles.flexOneView, {justifyContent: 'center'}]}>
              {Platform.OS === 'ios' && version >= 13 && (
                <View style={{alignSelf: 'center'}}>
                  <AppleButton
                    onPress={appleLogin} //appleLogin //appleLogout
                    buttonStyle={AppleButton.Style.WHITE}
                    cornerRadius={5}
                    buttonType={AppleButton.Type.DEFAULT}
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
                  <Text style={styles.socialBtnLabel}>
                    SignIn with facebook
                  </Text>
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
            <></>
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
          onClose={() =>
            setState(prev => ({...prev, isLanguageModalShow: false}))
          }
        />
      </SafeAreaView>
    </View>
  );
};

export default Welcome;

function alert(arg0: String) {
  throw new Error('Function not implemented.');
}
