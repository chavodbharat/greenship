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
  getAvailablePurchases,
  acknowledgePurchaseAndroid,
} from 'react-native-iap';
import {goBack} from '../../../routing/navigationRef';
import Spinner from '../../../components/spinner';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {updateSubscriptionDetailsReq} from '../../../redux/actions/homeAction';
import {showMessage} from 'react-native-flash-message';

const UpgradeToPro = () => {
  const dispatch = useDispatch();
  const {subscriptionDetails} = useSelector(
    state => ({
      subscriptionDetails: state.auth?.subscriptionDetails,
    }),
    shallowEqual,
  );
  const [state, setState] = useState({
    activePackage: 1,
    activeSubscriptions: [],
    loading: false,
  });
  const {colors} = useTheme();
  const itemSkus = Platform.select({
    android: ['com.1yearsubscription'],
    ios: ['com.OneYearsubscription'],
  });

  useEffect(() => {
    start();
    return () => {
      endConnection();
    };
  }, []);

  const start = async () => {
    setState(prev => ({...prev, loading: true}));
    await initConnection()
      .then(async connection => {
        return await getSubscriptions({skus: itemSkus});
      })
      .then(subscriptions => {
        setState(prev => ({...prev, loading: false}));
        setState(prev => ({...prev, activeSubscriptions: subscriptions}));
        // getAndroidPurchase();
      });
  };

  const getAndroidPurchase = async () => {
    if (Platform.OS === 'android') {
      const subscriptionPurchase = await getAvailablePurchases();
      if (subscriptionPurchase) {
        console.log('cdccdcd', subscriptionPurchase);
      }
    }
  };

  const handleRequestSubscription = () => {
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
      })
      .then(async res => {
        if (Platform.OS === 'android' && res?.[0]?.purchaseToken) {
          acknowledgePurchaseAndroid({token: res?.[0]?.purchaseToken});
          updateSubscriptionDetails(res?.[0]);
        } else if (
          Platform.OS === 'ios' &&
          subscriptionDetails?.sub_status !== 0 &&
          res?.transactionReceipt
        ) {
          updateSubscriptionDetails(res);
        }
      });
  };

  const updateSubscriptionDetails = details => {
    setState(prev => ({...prev, loading: true}));
    let body = {
      inapp_data: details,
      inapp_type: Platform.OS === 'ios' ? 'apple' : 'android',
      inapp_product: state.activeSubscriptions[0]?.productId,
    };
    dispatch(
      updateSubscriptionDetailsReq(body, res => {
        setState(prev => ({...prev, loading: false}));
        showMessage({
          message: 'Wow you subscribed successfully!!',
          type: 'success',
        });
        goBack();
      }),
    );
  };

  const onPay = () => {
    if (state.activePackage === 1) {
      handleRequestSubscription();
    } else {
      goBack();
    }
  };

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
