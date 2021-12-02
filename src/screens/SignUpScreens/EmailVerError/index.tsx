import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, ScrollView, StatusBar, View} from 'react-native';
import {Notification} from '@components';
import {Description, Title} from '@Typography';
import {Screens} from '@constants';
import {Screen, TextButton} from '@ui';
import {styles} from './styles';

export const EmailVerError: React.FC = () => {
  const [showNotify, setShowNotify] = useState(false);
  const route: any = useRoute();
  const navigation: any = useNavigation();

  const changeEmail = () => {
    const values = route.params.values;
    navigation.push(Screens.email, {
      type: 'change',
      values: {...values},
    });
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
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Title style={{marginBottom: 8, textAlign: 'center'}}>
              Password Reset Email Sent
            </Title>
            <Description style={{marginBottom: 20, textAlign: 'center'}}>
              A password reset email has been sent. If you do not receive the
              email, first verify if it is in a spam or junk folder.
            </Description>
          </View>
          <Image
            style={{alignSelf: 'center'}}
            source={require('../../../assets/images/register/error.png')}
          />
        </ScrollView>
        <View style={{marginVertical: 25}}>
          <TextButton
            title="Resend Email"
            solid
            style={{marginVertical: 25}}
            onPress={() => setShowNotify(true)}
          />
          <TextButton title="Use Another Email" onPress={changeEmail} />
        </View>
      </View>
    </Screen>
  );
};
