import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  Alert,
  Platform,
  Share,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {
  Alerts,
  Autobuy,
  ChangePassword,
  FaceID,
  Notifications,
  Passcode,
  PaymentMethods,
  Profile,
  Referal,
  StorageFees,
  TouchID,
  Transactions,
  Verification,
} from '@assets/images/settings';
import {
  MenuItem,
  MenuItemSmall,
  ModalWindow,
  Notification,
  SettingsHeader,
  Wrapper,
} from '@components';
import {Subtitle, SubtitleMedium} from '@Typography';
import {colors, Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {logout} from '@store/actions';
import {Screen} from '@ui';
import {styles} from './styles';
import {Linking} from 'react-native';
import {
  deleteLoginMethod,
  deletePasscode,
  setPasscode,
} from '@store/slices/authSlice';
import database from '@react-native-firebase/database';
import {cleanAutoBuy} from '@store/slices/autoBuySlice';
import {cleanOperations} from '@store/slices/operationsSlice';
import {cleanPaymentMethods} from '@store/slices/paymentMethodsSlice';
import {cleanPriceAlerts} from '@store/slices/priceAlertSlice';
import {cleanCart} from '@store/slices/reedemSlice';

export const Settings: React.FC = () => {
  const [touchIdModal, setTouchIdModal] = useState(false);
  const [faceIdModal, setFaceIdModal] = useState(false);
  const [passcodeModal, setPasscodeModal] = useState(false);

  const loginMethods = useAppSelector(state => state.auth.loginMethods);
  const token = useAppSelector(state => state.auth.token);

  const {faceId, touchId}: any = loginMethods;

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const navigation: any = useNavigation();

  const shareApp = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const createLoginMethod = async (value: boolean, method: string) => {
    try {
      setLoading(true);
      await database().ref(`/users/${token}/loginMethods/${method}`).set(value);
      await dispatch(setPasscode({loginMethod: method, value}));
      await setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const removeLoginMethod = async (method: string, value: boolean | null) => {
    try {
      setLoading(true);
      await database().ref(`/users/${token}/loginMethods/${method}`).set(value);
      (await method) === 'passcode'
        ? dispatch(deletePasscode(method))
        : dispatch(deleteLoginMethod(method));
      await setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Notification
        text="Passcode setup complete!"
        visible={passcodeModal}
        onPress={() => setPasscodeModal(false)}
      />
      <Screen>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor={'transparent'}
        />
        <ModalWindow
          title="Secure with Touch ID"
          text="To enable, you must first add Touch ID in your phone’s settings.
When complete, navigate back to the CyberMetals app to proceed."
          confirmTitle="Settings"
          cancelTitle="Cancel"
          onConfirm={() => {
            if (Platform.OS === 'ios') {
              Linking.openURL('app-settings:');
            } else {
              Linking.openSettings();
            }
            createLoginMethod(true, 'touchId');

            setTouchIdModal(false);
          }}
          onCancel={() => {
            setTouchIdModal(false);
          }}
          visible={touchIdModal}
        />
        <ModalWindow
          title="Secure with Face ID"
          text="To enable, you must first add Face ID in your phone’s settings.
        When complete, navigate back to the CyberMetals app to proceed."
          confirmTitle="Settings"
          cancelTitle="Cancel"
          onConfirm={() => {
            if (Platform.OS === 'ios') {
              Linking.openURL('app-settings:');
            } else {
              Linking.openSettings();
            }
            createLoginMethod(true, 'faceId');

            setFaceIdModal(false);
          }}
          onCancel={() => {
            setFaceIdModal(false);
          }}
          visible={faceIdModal}
        />

        <SettingsHeader />

        <Subtitle style={styles.title}>Account</Subtitle>
        <MenuItem
          title="Profile"
          description="Edit name and view address detail"
          onPress={() => navigation.navigate(Screens.profile)}
          Image={Profile}
        />
        <MenuItem
          title="Payment Methods"
          description="View and manage your payment methods"
          onPress={() => navigation.navigate(Screens.paymentMethodsStack)}
          Image={PaymentMethods}
        />
        <MenuItem
          title="Transactions"
          description="View your tansaction history"
          onPress={() => navigation.navigate(Screens.transactions)}
          Image={Transactions}
        />
        <MenuItem
          title="Invoices"
          description="Edit name and view address detail"
          onPress={() => navigation.navigate(Screens.storageFees)}
          Image={StorageFees}
        />
        <MenuItem
          title="Verification"
          description="Enter or view your verification status"
          onPress={() => navigation.navigate(Screens.verificationStack)}
          Image={Verification}
        />
        <MenuItem
          title="Change Your Password"
          description="Set up your new password"
          onPress={() =>
            navigation.navigate(Screens.password, {type: 'Change'})
          }
          Image={ChangePassword}
          style={{marginBottom: 50}}
        />

        <Subtitle style={styles.title}>Security</Subtitle>
        <MenuItem
          title="Secure with Touch ID"
          description="Use your fingerprint to log into CyberMetals without having to type your password"
          onPress={() => {
            if (touchId) {
              removeLoginMethod('touchId', false);
            } else {
              setTouchIdModal(true);
            }
          }}
          disabledSwitch={loading}
          Image={TouchID}
          type="switch"
          switchValue={touchId}
        />
        <MenuItem
          title="Secure With a Face ID"
          description="Use your Face ID to log into CyberMetals without having to type your password"
          onPress={() => {
            if (faceId) {
              removeLoginMethod('faceId', false);
            } else {
              setFaceIdModal(true);
            }
          }}
          disabledSwitch={loading}
          Image={FaceID}
          type="switch"
          switchValue={faceId}
        />
        <MenuItem
          title="Secure With a Passcode"
          description="Set up a passcode to access CyberMetals without having to type your password"
          onPress={() =>
            loginMethods.passcode
              ? removeLoginMethod('passcode', null)
              : navigation.navigate(Screens.passcode)
          }
          Image={Passcode}
          style={{marginBottom: 50}}
          type="switch"
          disabledSwitch={loading}
          switchValue={loginMethods.passcode ? true : false}
        />

        <Subtitle style={styles.title}>Others</Subtitle>
        <MenuItem
          title="Refer a Friend"
          description="Share your love of CyberMetals and get $5 for every friend that makes a purchase"
          onPress={() => navigation.navigate(Screens.refer)}
          Image={Referal}
        />
        <MenuItem
          title="Auto Buy"
          description="Share your love of CyberMetals and get $5 for every friend that makes a purchase"
          onPress={() => navigation.navigate(Screens.autoBuyStack)}
          Image={Autobuy}
        />
        <MenuItem
          title="Spot Price Alerts"
          description="Keep track of fast-moving precious metal markets with custom Spot Price Alerts"
          onPress={() => navigation.navigate(Screens.priceAlertsStack)}
          Image={Alerts}
        />
        <MenuItem
          title="Notifications"
          description="Set up custom market alerts, receive the latest precious metals news and special offers from"
          onPress={() => navigation.navigate(Screens.notifications)}
          Image={Notifications}
          style={{marginBottom: 50}}
        />

        <Subtitle style={styles.title}>About</Subtitle>
        <Wrapper
          style={{marginBottom: 15, marginTop: 0, backgroundColor: colors.gray}}
        />
        <MenuItemSmall
          title="Contact Us"
          onPress={() => navigation.navigate(Screens.contactUs)}
        />
        <MenuItemSmall title="FAQ" onPress={() => console.log('Go to FAQ')} />
        <MenuItemSmall
          title="Privacy Policy"
          onPress={() => console.log('Go to Privacy Policy')}
        />
        <MenuItemSmall
          title="Cookie Policy"
          onPress={() => navigation.navigate(Screens.cookiePolicy)}
          style={{marginBottom: 26}}
        />
        <Wrapper style={{backgroundColor: colors.gray, marginBottom: 15}} />
        <MenuItemSmall
          title="Rate us on the App Store"
          onPress={() => console.log('Go to Rate us on the App Store')}
        />
        <MenuItemSmall title="Share" onPress={shareApp} />

        <TouchableOpacity
          onPress={async () => {
            await dispatch(cleanAutoBuy());
            await dispatch(cleanOperations());
            await dispatch(cleanPaymentMethods());
            await dispatch(cleanPriceAlerts());
            await dispatch(cleanCart());
            dispatch(logout());
          }}>
          <SubtitleMedium style={{color: colors.primary}}>
            Log out
          </SubtitleMedium>
        </TouchableOpacity>
        <SubtitleMedium style={{marginTop: 15, marginBottom: 100}}>
          v1.0
        </SubtitleMedium>
      </Screen>
    </>
  );
};
