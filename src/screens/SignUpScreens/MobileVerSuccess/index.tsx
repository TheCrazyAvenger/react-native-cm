import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
    <Screen type="View">
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={styles.header}>
            <Title style={styles.title}>Mobile Verification Complete</Title>
            <Description style={styles.description}>
              Thank you for opening a CyberMetals account!
            </Description>
          </View>
          <Image
            style={{alignSelf: 'center'}}
            source={require('../../../assets/images/register/complete.png')}
          />
        </ScrollView>

        <TextButton
          title="Go To Dashboard"
          onPress={goToNext}
          solid
          style={{marginVertical: 25}}
        />
      </View>
    </Screen>
  );
};
