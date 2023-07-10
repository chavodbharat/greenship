import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, Pressable } from 'react-native';
import DeviceInfo from 'react-native-device-info';
// Social Login Packagers ----------
import appleAuth, {
    AppleButton,
    AppleRequestOperation,
    AppleRequestScope,
    AppleCredentialState,
    AppleError,
} from '@invertase/react-native-apple-authentication';

//import { LoginManager } from 'react-native-fbsdk-next';

import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
// Social Login Packagers ----------

import { moderateScale, scale, verticalScale } from '../../../theme/responsive';
import { darkColors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';
import { Button } from 'react-native-paper';

const version = parseFloat(DeviceInfo.getSystemVersion());

// Images
const FacebookLogo = require('../../../assets/images/facebook_logo.png');
const GoogleLogo = require('../../../assets/images/logo_google.png');

class SocialLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount = () => {

    };

    callAPI_SocialLogin = () => {
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

    }

    facebookLogin = () => {
        // 'public_profile',
        // LoginManager.logInWithPermissions(['email']).then(
        //     function (result) {
        //         console.warn("facebook login result = ", result);
        //         if (result.isCancelled) {
        //             alert('Login Cancelled ' + JSON.stringify(result));
        //         } else {
        //             alert(
        //                 'Login success with  permisssions: ' +
        //                 result.grantedPermissions.toString(),
        //             );
        //             alert('Login Success ' + result.toString());
        //         }
        //     },
        //     function (error) {
        //         alert('Login failed with error: ' + error);
        //     },
        // );
    };

    onAppleButtonPress = async () => {
        // performs login request
        // https://developer.apple.com/forums/thread/121496
        // https://stackoverflow.com/questions/57545635/cannot-get-name-email-with-sign-in-with-apple-on-real-device
        var appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: AppleRequestOperation.LOGIN,
            // Note: it appears putting FULL_NAME first is important, see issue #293
            requestedScopes: [AppleRequestScope.FULL_NAME, AppleRequestScope.EMAIL],
        });

        console.log('fullName', appleAuthRequestResponse.fullName);
        console.log('FULL_NAME', appleAuthRequestResponse.FULL_NAME);
        console.log('Email', appleAuthRequestResponse.email);
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

    appleLogout = async () => {
        console.log("Logout Pressed");
        var appleAuthRequestLogout = await appleAuth.performRequest({
            requestedOperation: AppleRequestOperation.LOGOUT
        });
        console.warn("logout = ", appleAuthRequestLogout);
        appleAuth.onCredentialRevoked(async () => {
            console.warn('If this function executes, User Credentials have been Revoked');
        });
    }

    gmailSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.signOut();
            const userInfo = await GoogleSignin.signIn();
            console.log('log', userInfo);
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
    }

    render() {
        return (
            <View style={styles.flexOneView}>
                <View style={[styles.flexOneView, { justifyContent: 'center' }]}>
                    {Platform.OS === 'ios' && version >= 13 && (
                        <View style={{ alignSelf: 'center' }}>
                            <AppleButton
                                onPress={this.onAppleButtonPress}
                                buttonStyle={AppleButton.Style.WHITE}
                                cornerRadius={5}
                                buttonType={AppleButton.Type.SIGN_IN}
                                textStyle={{ fontFamily: fonts.MontserratSemiBold }}
                                style={{
                                    width: scale(320), // You must specify a width
                                    height: scale(35), // You must specify a height
                                    borderWidth: scale(1),
                                    borderRadius: scale(4),
                                    marginBottom: verticalScale(8),
                                }}
                            />
                            {/* <Button icon="logout" mode="contained" onPress={this.appleLogout}>
                                Apple Log out
                            </Button> */}
                        </View>
                    )}
                    <Pressable onPress={this.facebookLogin} style={styles.btn}>
                        <Image
                            style={styles.icon}
                            source={FacebookLogo}
                        />
                        <View style={styles.wrapper}>
                            <Text style={styles.socialBtnLabel}>SignIn with facebook</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={this.gmailSignIn} style={styles.btn}>
                        <Image
                            style={styles.icon}
                            source={GoogleLogo}
                        />
                        <View style={styles.wrapper}>
                            <Text style={styles.socialBtnLabel}>SignIn with gmail</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flexOneView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    btn: {
        flexDirection: 'row',
        marginHorizontal: scale(20),
        marginBottom: verticalScale(8),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: verticalScale(6),
        borderWidth: scale(1),
        borderRadius: scale(4),
        borderColor: darkColors.black,
    },
    socialBtnLabel: {
        color: darkColors.black,
        fontSize: moderateScale(13),
        fontFamily: fonts.MontserratSemiBold,
        paddingLeft: scale(12),
    },
    icon: {
        height: scale(20),
        width: scale(20),
        tintColor: darkColors.black,
    },
});

export default SocialLogin;
