import React from 'react';
import {View} from 'react-native';
import {MetalsItemProps, Wrapper} from '../..';
import {colors} from '@constants';
import {Illustration, Subtitle, SubtitleMedium} from '@Typography';
import {styles} from './styles';
import {getMetalsColor, numberWithCommas} from '@utilities';
import {useAppSelector} from '@hooks';

export const MetalsItem: React.FC<MetalsItemProps> = ({data}) => {
  const {id, name, buy, digitalMetal, spot} = data;
  const {oneDayChange, oneDayPercentChange} = digitalMetal;

  const ownedMetals = useAppSelector(state => state.auth.ownedMetals);

  return (
    <View>
      <View style={styles.cardItem}>
        <Subtitle
          style={{
            ...styles.cardTitle,
            color: getMetalsColor(id),
          }}>
          {name}
        </Subtitle>
        <Subtitle style={styles.cardTitle}>
          {`$${numberWithCommas(Number(buy).toFixed(2))}`}
        </Subtitle>
      </View>
      <Wrapper style={{backgroundColor: colors.primary, marginVertical: 12}} />
      <View style={styles.cardItem}>
        <View>
          <Illustration style={{fontSize: 14, marginBottom: 5}}>
            Total Owned
          </Illustration>
          <SubtitleMedium>
            {Number(ownedMetals[name]).toFixed(3)} oz
          </SubtitleMedium>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Illustration style={{fontSize: 14, marginBottom: 5}}>
            Performance
          </Illustration>
          <SubtitleMedium>{`${
            oneDayPercentChange > 0 ? '+' : ''
          }${numberWithCommas(
            Number(oneDayPercentChange).toFixed(2),
          )}%`}</SubtitleMedium>
        </View>
      </View>

      <View style={{...styles.cardItem, marginTop: 10}}>
        <View>
          <Illustration style={{fontSize: 14, marginBottom: 5}}>
            Spot
          </Illustration>
          <SubtitleMedium>
            {`$${numberWithCommas(Number(spot).toFixed(2))}/oz`}
          </SubtitleMedium>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Illustration style={{fontSize: 14, marginBottom: 5}}>
            $ Change
          </Illustration>
          <SubtitleMedium>{`${oneDayChange > 0 ? '+' : '-'}$${numberWithCommas(
            Number(Math.abs(oneDayChange)).toFixed(2),
          )}`}</SubtitleMedium>
        </View>
      </View>
    </View>
  );
};
