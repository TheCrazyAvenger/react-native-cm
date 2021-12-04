import {useNavigation, useRoute} from '@react-navigation/core';
import React from 'react';
import {View} from 'react-native';
import {Description, SubtitleMedium, TitleMedium} from '@Typography';
import {BuySetUpForm, SellSetUpForm} from '../../../forms';
import {Screen} from '@ui';
import {styles} from './styles';
import {useAppSelector} from '@hooks';

export const SellBuySetUp: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const ownedMetals = useAppSelector(state => state.auth.ownedMetals);

  const {metal, spot, premium, ask} = route.params.data;
  const {type} = route.params;

  return (
    <Screen>
      <View style={styles.container}>
        <TitleMedium style={styles.mainTitle}>
          {type === 'Buy' ? 'Buying' : 'Selling'} Preferences
        </TitleMedium>
        <View style={styles.info}>
          <View style={styles.infoItem}>
            <Description style={styles.infoTitle}>
              {type === 'Buy' ? 'Buying' : 'Selling'}
            </Description>
            <SubtitleMedium>{metal}</SubtitleMedium>
          </View>
          <View style={styles.infoItem}>
            <Description style={styles.infoTitle}>Spot</Description>
            <SubtitleMedium>{`$${spot}/oz`}</SubtitleMedium>
          </View>
          {type === 'Sell' && (
            <View style={styles.infoItem}>
              <Description style={styles.infoTitle}>Total Owned</Description>
              <SubtitleMedium>{`$${ownedMetals[metal]}/oz`}</SubtitleMedium>
            </View>
          )}
          <View style={styles.infoItem}>
            <Description style={styles.infoTitle}>Premium</Description>
            <SubtitleMedium>{`+$${premium}/oz`}</SubtitleMedium>
          </View>
          <View style={styles.infoItem}>
            <Description style={styles.infoTitle}>Your Price</Description>
            <SubtitleMedium>{`$${ask}/oz`}</SubtitleMedium>
          </View>
        </View>
        {type === 'Buy' ? <BuySetUpForm /> : <SellSetUpForm metal={metal} />}
      </View>
    </Screen>
  );
};
