import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  MenuItem,
  MenuItemSmall,
  SettingsHeader,
  Wrapper,
} from '../../../components';
import {Subtitle, SubtitleMedium} from '../../../components/Typography';
import {colors, Screens} from '../../../constants';
import {useAppDispatch} from '../../../hooks/hooks';
import {logout} from '../../../store/actions';
import {Screen} from '../../../ui';
import {styles} from './styles';

export const Settings: React.FC = () => {
  const [fingerprint, setFingerprint] = useState(false);
  const [faceId, setFaceId] = useState(false);
  const [passcode, setPasscode] = useState(false);
  const dispatch = useAppDispatch();

  const navigation: any = useNavigation();

  return (
    <Screen>
      <SettingsHeader />

      <Subtitle style={styles.title}>Account</Subtitle>
      <MenuItem
        title="Profile"
        description="Edit name and view address detail"
        onPress={() => console.log('Go to Profile')}
        image={require('../../../assets/images/settings/profile.png')}
      />
      <MenuItem
        title="Payment Methods"
        description="View and manage your payment methods"
        onPress={() => console.log('Go to Payments Methods')}
        image={require('../../../assets/images/settings/payment.png')}
      />
      <MenuItem
        title="Transactions"
        description="View your tansaction history"
        onPress={() => console.log('Go to Transactions')}
        image={require('../../../assets/images/settings/transactions.png')}
      />
      <MenuItem
        title="Storage Fees"
        description="Edit name and view address detail"
        onPress={() => console.log('Go to Storage Fees')}
        image={require('../../../assets/images/settings/fees.png')}
      />
      <MenuItem
        title="Verification"
        description="Enter or view your verification status"
        onPress={() => console.log('Go to Verification')}
        image={require('../../../assets/images/settings/verification.png')}
      />
      <MenuItem
        title="Change Your Password"
        description="Set up your new password"
        onPress={() => console.log('Go to Change Your Password')}
        image={require('../../../assets/images/settings/changePass.png')}
        style={{marginBottom: 50}}
      />

      <Subtitle style={styles.title}>Security</Subtitle>
      <MenuItem
        title="Secure With Fingerprint"
        description="Set up a passcode to access CyberMetals without having to type your password"
        onPress={() => setFingerprint(prev => !prev)}
        image={require('../../../assets/images/settings/fingerprint.png')}
        type="switch"
        switchValue={fingerprint}
      />
      <MenuItem
        title="Secure With a Face ID"
        description="Set up a passcode to access CyberMetals without having to type your password"
        onPress={() => setFaceId(prev => !prev)}
        image={require('../../../assets/images/settings/faceId.png')}
        type="switch"
        switchValue={faceId}
      />
      <MenuItem
        title="Secure With a Passcode"
        description="Set up a passcode to access CyberMetals without having to type your password"
        onPress={() => setPasscode(prev => !prev)}
        image={require('../../../assets/images/settings/padlock.png')}
        style={{marginBottom: 50}}
        type="switch"
        switchValue={passcode}
      />

      <Subtitle style={styles.title}>Others</Subtitle>
      <MenuItem
        title="Refer a Friend"
        description="Share your love of CyberMetals and get $5 for every friend that makes a purchase "
        onPress={() => navigation.navigate(Screens.refer)}
        image={require('../../../assets/images/settings/referal.png')}
      />
      <MenuItem
        title="Auto Buy"
        description="Share your love of CyberMetals and get $5 for every friend that makes a purchase "
        onPress={() => navigation.navigate(Screens.autoBuyStack)}
        image={require('../../../assets/images/settings/autobuy.png')}
      />
      <MenuItem
        title="Spot Price Alerts"
        description="Share your love of CyberMetals and get $5 for every friend that makes a purchase "
        onPress={() => console.log('Go to Price Alerts')}
        image={require('../../../assets/images/settings/alerts.png')}
      />
      <MenuItem
        title="Notifications"
        description="Set up custom market alerts, receive the latest precious metals news and special offers from"
        onPress={() => console.log('Go to Notifications')}
        image={require('../../../assets/images/settings/notifications.png')}
        style={{marginBottom: 50}}
      />

      <Subtitle style={styles.title}>About</Subtitle>
      <Wrapper
        style={{marginBottom: 15, marginTop: 0, backgroundColor: colors.gray}}
      />
      <MenuItemSmall
        title="Contact Us"
        onPress={() => console.log('Go to Contact Us')}
      />
      <MenuItemSmall title="FAQ" onPress={() => console.log('Go to FAQ')} />
      <MenuItemSmall
        title="Privacy Policy"
        onPress={() => console.log('Go to Privacy Policy')}
      />
      <MenuItemSmall
        title="Cookie Policy"
        onPress={() => console.log('Go to Cookie Policy')}
        style={{marginBottom: 26}}
      />
      <Wrapper style={{backgroundColor: colors.gray, marginBottom: 15}} />
      <MenuItemSmall
        title="Rate us on the App Store"
        onPress={() => console.log('Go to Rate us on the App Store')}
      />
      <MenuItemSmall title="Share" onPress={() => console.log('Go to Share')} />

      <TouchableOpacity onPress={() => dispatch(logout())}>
        <SubtitleMedium style={{color: colors.primary}}>Log out</SubtitleMedium>
      </TouchableOpacity>
      <SubtitleMedium style={{marginTop: 15, marginBottom: 100}}>
        v1.0
      </SubtitleMedium>
    </Screen>
  );
};
