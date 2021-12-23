import React from 'react';
import {View} from 'react-native';
import {FundWithdrawInfoProps} from '../..';
import {Description, SubtitleMedium} from '@Typography';
import {styles} from './styles';
import {numberWithCommas} from '@utilities';

export const FundWithdrawInfo: React.FC<FundWithdrawInfoProps> = ({
  cashBalance,
  amount,
  method,
  account,
  type,
  style,
}) => {
  return (
    <View>
      <View style={{...styles.info, ...style}}>
        {cashBalance && (
          <View style={styles.infoItem}>
            <Description style={styles.infoTitle}>
              Current Cash Balance
            </Description>
            <SubtitleMedium style={styles.infoText}>
              {`$${numberWithCommas(Number(cashBalance).toFixed(2))} USD`}
            </SubtitleMedium>
          </View>
        )}
        {amount && (
          <View style={styles.infoItem}>
            <Description style={styles.infoTitle}>
              {type === 'Fund' ? 'Funding' : 'Amount'}
            </Description>

            <SubtitleMedium style={styles.infoText}>
              {`$${numberWithCommas(Number(amount).toFixed(2))}`}
            </SubtitleMedium>
          </View>
        )}
        {method && (
          <View style={styles.infoItem}>
            <Description style={styles.infoTitle}>
              {type === 'Fund' ? 'Payment ' : ''}Method
            </Description>
            <SubtitleMedium style={styles.infoText}>{method}</SubtitleMedium>
          </View>
        )}
        {account && !(type === 'Fund' && method === 'Bank Wire') && (
          <View style={styles.infoItem}>
            <Description style={styles.infoTitle}>
              {type === 'Fund' ? 'Account' : 'To account'}
            </Description>
            <SubtitleMedium style={styles.infoText}>{account}</SubtitleMedium>
          </View>
        )}
      </View>
    </View>
  );
};
