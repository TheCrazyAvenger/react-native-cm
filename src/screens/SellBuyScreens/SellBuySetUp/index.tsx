import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Description, SubtitleMedium, TitleMedium} from '@Typography';
import {BuySetUpForm, SellSetUpForm} from '../../../forms';
import {Screen} from '@ui';
import {styles} from './styles';
import {useAppSelector} from '@hooks';
import {numberWithCommas} from '@utilities';

export const SellBuySetUp: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const ownedMetals = useAppSelector(state => state.auth.ownedMetals);

  const {name, spot, premium, buy, sell} = route.params.data;
  const {type} = route.params;

  useEffect(() => {
    navigation.setOptions({title: type});
  }, []);

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
            <SubtitleMedium style={styles.infoText}>{name}</SubtitleMedium>
          </View>
          <View style={styles.infoItem}>
            <Description style={styles.infoTitle}>Spot</Description>
            <SubtitleMedium style={styles.infoText}>{`$${numberWithCommas(
              Number(spot),
            )}/oz`}</SubtitleMedium>
          </View>
          {type === 'Sell' && (
            <View style={styles.infoItem}>
              <Description style={styles.infoTitle}>Total Owned</Description>
              <SubtitleMedium style={styles.infoText}>{`${numberWithCommas(
                Number(ownedMetals[name]).toFixed(3),
              )} oz`}</SubtitleMedium>
            </View>
          )}
          <View style={styles.infoItem}>
            <Description style={styles.infoTitle}>Premium</Description>
            <SubtitleMedium
              style={styles.infoText}>{`+$${premium}/oz`}</SubtitleMedium>
          </View>
          <View style={styles.infoItem}>
            <Description style={styles.infoTitle}>Your Price</Description>
            <SubtitleMedium style={styles.infoText}>{`$${numberWithCommas(
              Number(type === 'Buy' ? buy : sell),
            )}/oz`}</SubtitleMedium>
          </View>
        </View>
        {type === 'Buy' ? <BuySetUpForm /> : <SellSetUpForm metal={name} />}
      </View>
    </Screen>
  );
};
