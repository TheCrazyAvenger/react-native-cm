import {useNavigation, useRoute} from '@react-navigation/core';
import React from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import {VerificationComplete as VerComplete} from '../../../../assets/images/settings';
import {
  Description,
  Subtitle,
  SubtitleMedium,
} from '../../../../components/Typography';
import {Screens} from '../../../../constants';
import {useAppSelector} from '../../../../hooks/hooks';
import {Screen, TextButton} from '../../../../ui';

import {styles} from './styles';

export const VerificationComplete: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const verifed = useAppSelector(state => state.auth.verified);

  const values = route.params?.values;

  values && console.log(values);

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
            <VerComplete />
            <Subtitle style={styles.title}>
              {verifed ? 'Verifed' : 'Submitted for Verification'}
            </Subtitle>
            {!verifed && (
              <SubtitleMedium style={styles.description}>
                Thank you for submitting your document. Ypur application is
                currently under review. Our team will begin your application
                review as soon as possible. We will notify you when we have
                completed the verification process.
              </SubtitleMedium>
            )}
          </View>
        </ScrollView>
        <TextButton
          title="Back to Settings"
          style={{marginBottom: 25}}
          solid
          onPress={() => navigation.navigate(Screens.settings)}
        />
      </View>
    </Screen>
  );
};
