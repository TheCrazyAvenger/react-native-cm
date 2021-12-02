import React from 'react';
import {Image, View} from 'react-native';
import {MetalsCardProps, Wrapper} from '../..';
import {colors} from '@constants';
import {getColor} from '@utilities';
import {Subtitle, SubtitleMedium} from '@Typography';
import {styles} from './styles';

export const MetalsInfo: React.FC<MetalsCardProps> = ({data}) => {
  const {color, metal, owned, gainLose, totalCost, totalOwned} = data;

  return (
    <View>
      <View>
        <View style={{...styles.cardItem, marginTop: 0}}>
          <Subtitle style={{...styles.cardTitle, color}}>{metal}</Subtitle>
          <Subtitle style={styles.cardTitle}>$ {owned} USD</Subtitle>
        </View>

        <View style={styles.cardItem}>
          <SubtitleMedium>Gains/Losses</SubtitleMedium>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <SubtitleMedium style={{color: getColor(gainLose)}}>
              $ {gainLose} USD
            </SubtitleMedium>
            <Image
              style={{marginLeft: 5}}
              source={require('../../../assets/images/potfolio/upArrow.png')}
            />
          </View>
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
