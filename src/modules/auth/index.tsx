import React from 'react';
import styles from './styles';
import {View, Text, Image, Pressable, Linking} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {navigate} from '../../routing/navigationRef';
import Entypo from 'react-native-vector-icons/Entypo';
import {scale} from '../../theme/responsive';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Welcome = () => {
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
        <View style={styles.btn}>
          <Image
            style={styles.icon}
            source={require('../../assets/images/logo_google.png')}
          />
          <View style={styles.wrapper}>
            <Text style={styles.socialBtnLabel}>SignIn with gmail</Text>
          </View>
        </View>

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
