import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  View,
} from 'react-native';
import {PaginationFooter} from '../../../components';
import {Title} from '../../../components/Typography';
import {Screens} from '../../../constants';
import {Screen} from '../../../ui';
import {slides} from '../../../utilities';
import {styles} from './styles';

export const EmailVerSuccess: React.FC = () => {
  const route: any = useRoute();
  const navigation: any = useNavigation();

  const goToNext = () => {
    navigation.push(Screens.mobileVerification, {
      values: {...route.params.values},
    });
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
        <View style={{flex: 0.85, alignItems: 'center'}}>
          <View style={styles.header}>
            <Title style={styles.title}>Email Verification Complete</Title>
          </View>
          <Image
            source={require('../../../assets/images/register/complete.png')}
          />
        </View>
        <PaginationFooter
          data={slides}
          currentIndex={3}
          onPress={goToNext}
          title="Continue"
          style={styles.footer}
        />
      </Screen>
    </KeyboardAvoidingView>
  );
};
