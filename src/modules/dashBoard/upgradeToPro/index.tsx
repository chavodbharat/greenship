import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import styles from './styles';
import Header from '../../../components/header';
import {useTheme} from '../../../providers/ThemeProvider';
import Entypo from 'react-native-vector-icons/Entypo';
import {darkColors} from '../../../theme/colors';
import {scale} from '../../../theme/responsive';
import {
  initConnection,
  endConnection,
  getSubscriptions,
  requestSubscription,
} from 'react-native-iap';
import {goBack} from '../../../routing/navigationRef';
import Spinner from '../../../components/spinner';

const UpgradeToPro = () => {
  const [state, setState] = useState({
    activePackage: 1,
    activeSubscriptions: [],
    loading: false,
  });
  const {colors} = useTheme();
  const itemSkus = Platform.select({
    android: ['com.oneyearsubscription'],
    ios: ['com.1YearSubscription'],
  });

  useEffect(() => {
    start();
    return () => {
      endConnection();
    };
  }, []);

  const start = async () => {
    await initConnection()
      .then(async connection => {
        return await getSubscriptions({skus: itemSkus});
      })
      .then(subscriptions => {
        setState(prev => ({...prev, activeSubscriptions: subscriptions}));
      });
  };

  const handleRequestSubscription = () => {
    console.log('onPress');

    setState(prev => ({...prev, loading: true}));
    requestSubscription({
      sku: state.activeSubscriptions[0]?.productId,
      ...(state.activeSubscriptions[0]?.subscriptionOfferDetails?.[0]
        ?.offerToken && {
        subscriptionOffers: [
          {
            sku: state.activeSubscriptions[0]?.productId, // as a string
            offerToken:
              state.activeSubscriptions[0]?.subscriptionOfferDetails?.[0]
                ?.offerToken, // as a string
          },
        ],
      }),
    })
      .catch(err => {
        console.log('error buying product', err);
        setState(prev => ({...prev, loading: false}));
      })
      .then(async res => {
        setState(prev => ({...prev, loading: false}));
        console.log('request subscription ', JSON.stringify(res));
        // handle/store response
      });
  };

  const onPay = () => {
    if (state.activePackage === 1) {
      handleRequestSubscription();
    } else {
      goBack();
    }
  };

  console.log('fvf', state);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        isFilterShow={false}
        statusBarColor={colors.listBackGradientThree}
      />
      <Spinner visible={state?.loading} />
      <ScrollView>
        <Image
          resizeMode="contain"
          style={styles.img}
          source={require('../../../assets/images/ic_app_landscape_logo.png')}
        />
        <Text style={styles.title}>
          Upgrade to GreenSheep Pro for more benefits
        </Text>

        <View style={styles.benefitsWrapper}>
          <View style={styles.rowWrapper}>
            <Entypo
              name="check"
              size={scale(20)}
              color={darkColors.darkGreen}
            />
            <Text style={styles.value}>Ad Free</Text>
          </View>
          <View style={styles.rowWrapper}>
            <Entypo
              name="check"
              size={scale(20)}
              color={darkColors.darkGreen}
            />
            <Text style={styles.value}>
              Access to the digital medical record
            </Text>
          </View>

          <View style={styles.rowWrapper}>
            <Entypo
              name="check"
              size={scale(20)}
              color={darkColors.darkGreen}
            />
            <Text style={styles.value}>Add more than 5 animals</Text>
          </View>
          <View style={styles.rowWrapper}>
            <Entypo
              name="check"
              size={scale(20)}
              color={darkColors.darkGreen}
            />
            <Text style={styles.value}>Unlimited search requests</Text>
          </View>
        </View>

        <View style={styles.boxWrapper}>
          <Pressable
            onPress={() => {
              setState(prev => ({...prev, activePackage: 0}));
            }}
            style={{
              ...styles.box,
              borderColor:
                state.activePackage === 0 ? darkColors.darkGreen : 'lightgray',
              borderWidth: state.activePackage === 0 ? scale(4) : scale(1),
            }}>
            <Text style={styles.value}>Free</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setState(prev => ({...prev, activePackage: 1}));
            }}
            style={{
              ...styles.box,
              borderColor:
                state.activePackage === 1 ? darkColors.darkGreen : 'lightgray',
              borderWidth: state.activePackage === 1 ? scale(4) : scale(1),
            }}>
            <Text style={styles.value}>4.99€/Year</Text>
          </Pressable>
        </View>

        <Pressable onPress={onPay}>
          <View style={styles.btn}>
            <Text style={styles.btnLabel}>
              {state.activePackage === 0 ? 'Continue' : 'Subscribe'}
            </Text>
          </View>
        </Pressable>

        <Text style={styles.heading}>Frequently Asked Question</Text>
        <Text style={styles.question}>
          Will this subscription renew automatically?
        </Text>
        <Text style={styles.value1}>
          All the subscriptions renew automatically for your convenience and to
          avoid any interruption of service.Your subscriptions can be managed by
          going to {Platform.OS === 'ios' ? 'itunes' : 'playstore'} account.
        </Text>

        <Text style={styles.question1}>How do i cancel my subscription?</Text>
        <Text style={styles.value1}>
          Your subscription can be cancelled through your{' '}
          {Platform.OS === 'ios' ? 'itunes' : 'playstore'} account.
        </Text>

        <Text style={styles.question1}>
          Can I get a refund if i change my mind?
        </Text>
        <Text style={styles.value2}>
          Payment via {Platform.OS === 'ios' ? 'itunes' : 'playstore'} account
          cane be approved and refunded by{' '}
          {Platform.OS === 'ios' ? 'Apple' : 'Google'}. To receive a refund
          request you need to contact{' '}
          {Platform.OS === 'ios' ? 'itunes' : 'playstore'} support within 14
          days from the purchased date
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpgradeToPro;
