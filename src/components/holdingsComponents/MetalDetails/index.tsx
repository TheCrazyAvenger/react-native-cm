import React from 'react';
import {View} from 'react-native';
import {getColor, metals} from '../../../utilities';
import {Illustration, Subtitle} from '../../Typography';
import {styles} from './styles';

export const MetalsDetails: React.FC<{id: number}> = ({id}) => {
  const {ounce, usd, ounceChange, usdChange} = metals[id - 1];

  return (
    <View style={styles.container}>
      <Subtitle style={styles.cardTitle}>Details</Subtitle>

      <View>
        <View style={styles.cardItem}>
          <Illustration style={{fontSize: 14}}>Balance in USD</Illustration>
          <Illustration style={{fontSize: 14}}>{usd}</Illustration>
        </View>

        <View style={styles.cardItem}>
          <Illustration style={{fontSize: 14}}>Balance in Ounce</Illustration>
          <Illustration style={{fontSize: 14}}>{ounce}</Illustration>
        </View>

        <View style={styles.cardItem}>
          <Illustration style={{fontSize: 14}}>
            % Change total performance
          </Illustration>
          <Illustration style={{fontSize: 14, color: getColor(ounceChange)}}>
            {ounceChange}
          </Illustration>
        </View>

        <View style={styles.cardItem}>
          <Illustration style={{fontSize: 14}}>
            $ Change total performance
          </Illustration>
          <Illustration style={{fontSize: 14, color: getColor(usdChange)}}>
            {usdChange}
          </Illustration>
        </View>
      </View>
    </View>
  );
};
