import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  View,
} from 'react-native';
import {Description, Title} from '../../../components/Typography';
import {Screen, TextButton} from '../../../ui';
import {styles} from './styles';

export const MobileVerSuccess: React.FC = () => {
  const route: any = useRoute();
  const navigation: any = useNavigation();

  const goToNext = () => {
    console.log('Done');
    console.log(route.params);
    // navigation.push(Screens.mobileVerification, {
    //   values: {...route.params.values},
    // });
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
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.header}>
              <Title style={styles.title}>Mobile Verification Complete</Title>
              <Description style={styles.description}>
                Thank you for opening a CyberMetals account!
              </Description>
            </View>
            <Image
              source={require('../../../assets/images/register/complete.png')}
            />
          </View>
          <View style={styles.buttons}>
            <TextButton
              title="Go To Dashboard"
              onPress={goToNext}
              solid
              style={{marginBottom: 20}}
            />
          </View>
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
};
