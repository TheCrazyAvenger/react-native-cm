import {useNavigation, useRoute} from '@react-navigation/core';
import React from 'react';
import {View} from 'react-native';
import {
  Description,
  SubtitleMedium,
  TitleMedium,
} from '../../../components/Typography';
import {BuySetUpForm} from '../../../forms';
import {Screen} from '../../../ui';
import {styles} from './styles';

export const BuySetUp: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const {metal, spot, premium, ask} = route.params.data;

  return (
    <Screen>
      <View style={styles.container}>
        <TitleMedium style={styles.mainTitle}>Buying Preferences</TitleMedium>
        <View style={styles.info}>
          <View>
            <View style={styles.infoItem}>
              <Description style={styles.infoTitle}>Buying</Description>
              <SubtitleMedium>{metal}</SubtitleMedium>
            </View>
            <View style={styles.infoItem}>
              <Description style={styles.infoTitle}>Premium</Description>
              <SubtitleMedium>+$ {premium}/oz</SubtitleMedium>
            </View>
          </View>
          <View>
            <View style={styles.infoItem}>
              <Description style={styles.infoTitle}>Spot</Description>
              <SubtitleMedium>$ {spot}/oz</SubtitleMedium>
            </View>
            <View style={styles.infoItem}>
              <Description style={styles.infoTitle}>Your Price</Description>
              <SubtitleMedium>$ {ask}/oz</SubtitleMedium>
            </View>
          </View>
        </View>
        <BuySetUpForm />
      </View>
    </Screen>
  );
};
