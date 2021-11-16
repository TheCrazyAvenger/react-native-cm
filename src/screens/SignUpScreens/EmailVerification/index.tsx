import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {Description, Illustration, Title} from '../../../components/Typography';
import {colors, Screens} from '../../../constants';
import {Screen, TextButton} from '../../../ui';
import {styles} from './styles';

export const EmailVerification: React.FC = () => {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const [showNotify, setShowNotify] = useState(false);
  // console.log(route.params);

  const goToNext = () => {
    navigation.push(Screens.emailVerSuccess, {
      values: {...route.params.values},
    });
  };

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }
  }, [seconds]);

  const resentEmail = () => {
    setShowNotify(true);
    setSeconds(20);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'android' ? undefined : 'padding'}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />

      <Screen>
        {showNotify ? (
          <TouchableOpacity onPress={() => setShowNotify(false)}>
            <View style={styles.notification}>
              <Image
                style={styles.closeIcon}
                source={require('../../../assets/images/register/close.png')}
              />

              <Description style={{color: colors.primary}}>
                An account verification email has been resent.
              </Description>
            </View>
          </TouchableOpacity>
        ) : null}

        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View style={styles.header}>
            <Title style={{marginBottom: 25}}>Email Verification</Title>
            <Description>
              You will receive an account verification email shortly. Please
              follow the instructions in the email to complete the registration
              process.
            </Description>
          </View>
          <View style={styles.buttons}>
            {seconds > 0 ? (
              <Illustration style={styles.resendTimer}>
                Please wait 1 minute before clicking Resend Email (0:
                {`${seconds < 10 ? '0' : ''}${seconds}`})
              </Illustration>
            ) : null}
            <TextButton
              title="Resend Email"
              onPress={resentEmail}
              disabled={seconds > 0 ? true : false}
              solid
              style={{marginBottom: 20}}
            />

            <TextButton
              title="Use Another Email"
              onPress={() => console.log('Pressed')}
            />
            <TextButton
              title="Skip(dev)"
              onPress={goToNext}
              solid
              style={{marginTop: 20}}
            />
          </View>
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
};
