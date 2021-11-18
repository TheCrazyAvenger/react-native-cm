import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {MetalsCardProps, Wrapper} from '../..';
import {colors, Screens} from '../../../constants';
import {Illustration, Subtitle, SubtitleMedium} from '../../Typography';
import {styles} from './styles';

export const MetalsCard: React.FC<MetalsCardProps> = ({data}) => {
  const {color, metal, price, ounce, usd, ounceChange, usdChange, id} = data;
  const navigation: any = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate(Screens.holdings, {id})}
      style={styles.container}>
      <View style={styles.cardItem}>
        <Subtitle style={{...styles.cardTitle, color}}>{metal}</Subtitle>
        <Subtitle style={styles.cardTitle}>{price}</Subtitle>
      </View>
      <Wrapper style={{backgroundColor: colors.primary, marginVertical: 12}} />
      <View style={styles.cardItem}>
        <View>
          <Illustration style={{fontSize: 14, marginBottom: 5}}>
            Balance in Ounce
          </Illustration>
          <SubtitleMedium>{ounce}</SubtitleMedium>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Illustration style={{fontSize: 14, marginBottom: 5}}>
            Balance in USD
          </Illustration>
          <SubtitleMedium>{usd}</SubtitleMedium>
        </View>
      </View>

      <View style={{...styles.cardItem, marginTop: 10}}>
        <View>
          <Illustration style={{fontSize: 14, marginBottom: 5}}>
            % Change
          </Illustration>
          <SubtitleMedium>{ounceChange}</SubtitleMedium>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Illustration style={{fontSize: 14, marginBottom: 5}}>
            % Change
          </Illustration>
          <SubtitleMedium>{usdChange}</SubtitleMedium>
        </View>
      </View>
    </TouchableOpacity>
  );
};
