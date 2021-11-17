import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import {Notification} from '../../../components';
import {Description, Illustration, Title} from '../../../components/Typography';
import {Screens} from '../../../constants';
import {Screen, TextButton} from '../../../ui';
import {styles} from './styles';

export const EmailVerification: React.FC = () => {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const [showNotify, setShowNotify] = useState(false);
  console.log(route.params);

  const changeEmail = () => {
    const values = route.params.values;
    navigation.push(Screens.email, {
      type: 'change',
      values: {...values},
    });
  };

  const goToNext = () => {
    navigation.push(Screens.emailVerSuccess, {
      values: {...route.params.values},
    });
  };

  const goToError = () => {
    navigation.push(Screens.emailVerError, {
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
    setSeconds(59);
  };

  return (
    <Screen type="View">
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <Notification
        text="An account verification email has been resent."
        visible={showNotify}
        onPress={() => setShowNotify(false)}
      />

      <View style={{flex: 1}}>
        <ScrollView style={styles.header}>
          <Title style={{marginBottom: 25}}>Email Verification</Title>
          <Description>
            You will receive an account verification email shortly. Please
            follow the instructions in the email to complete the registration
            process.
          </Description>
        </ScrollView>
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

          <TextButton title="Use Another Email" onPress={changeEmail} />
          <TextButton
            title="Skip(dev)"
            onPress={goToNext}
            solid
            style={{marginTop: 20}}
          />
          <TextButton
            title="Go to Error(dev)"
            onPress={goToError}
            solid
            style={{marginTop: 20}}
          />
        </View>
      </View>
    </Screen>
  );
};
