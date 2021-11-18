import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {MetalsCardProps, Wrapper} from '../..';
import {colors, Screens} from '../../../constants';
import {Illustration, Subtitle, SubtitleMedium} from '../../Typography';
import {styles} from './styles';

export const MetalsInfo: React.FC<MetalsCardProps> = ({data}) => {
  const {color, metal, owned, gainLose, totalCost, totalOwned} = data;
  const navigation: any = useNavigation();

  return (
    <View>
      <View>
        <View style={{...styles.cardItem, marginTop: 0}}>
          <Subtitle style={{...styles.cardTitle, color}}>{metal}</Subtitle>
          <Subtitle style={styles.cardTitle}>$ {owned} USD</Subtitle>
        </View>

        <View style={styles.cardItem}>
          <SubtitleMedium>Gains/Losses</SubtitleMedium>
          <SubtitleMedium>$ {gainLose} USD</SubtitleMedium>
        </View>
        <View style={styles.cardItem}>
          <SubtitleMedium>Total Acquisition Cost</SubtitleMedium>
          <SubtitleMedium>$ {totalCost} USD</SubtitleMedium>
        </View>
        <View style={styles.cardItem}>
          <SubtitleMedium>Total Owned</SubtitleMedium>
          <SubtitleMedium>{totalOwned} oz</SubtitleMedium>
        </View>
      </View>
      <Wrapper style={{backgroundColor: colors.primary, marginTop: 20}} />
    </View>
  );
};
