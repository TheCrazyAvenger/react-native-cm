import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, ScrollView, StatusBar, View} from 'react-native';
import {PaginationFooter} from '@components';
import {Title} from '@Typography';
import {Screens} from '@constants';
import {Screen} from '@ui';
import {slides} from '@utilities';
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
    <Screen type="View">
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Title style={styles.title}>Email Verification Complete</Title>
          </View>
          <Image
            style={{alignSelf: 'center'}}
            source={require('@assets/images/register/complete.png')}
          />
        </ScrollView>
        <PaginationFooter
          data={slides}
          currentIndex={3}
          onPress={goToNext}
          title="Continue"
          style={styles.footer}
        />
      </View>
    </Screen>
  );
};
