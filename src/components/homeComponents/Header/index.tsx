import React from 'react';
import {Image, View} from 'react-native';
import {Wrapper} from '../..';
import {colors} from '@constants';
import {Description, Illustration, Subtitle, TitleMedium} from '@Typography';
import {styles} from './styles';
import {Logo} from '@assets/images';
import {useAppSelector} from '@hooks';
import {numberWithCommas} from '@utilities';

export const Header: React.FC = () => {
  const cashBalance = useAppSelector(state => state.auth.cashBalance);
  const ownedMetals = useAppSelector(state => state.auth.ownedMetals);

  const totalHoldings =
    Object.values(ownedMetals).reduce((acc, next) => acc + next, 0) * 1887;

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 37, alignSelf: 'center'}}>
        <Logo />
      </View>
      <View style={styles.headerItem}>
        <View>
          <Description style={{color: colors.white}}>
            Your Account Value:
          </Description>
          <TitleMedium style={{color: colors.white}}>{`$${numberWithCommas(
            Number(cashBalance + totalHoldings).toFixed(2),
          )} USD`}</TitleMedium>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Illustration style={{color: colors.white}}>
            Total Performance
          </Illustration>
          <View style={styles.perfomance}>
            <Illustration style={styles.profit}>-4.76 %</Illustration>
            <Image
              style={{marginLeft: 6}}
              source={require('../../../assets/images/home/downArrow.png')}
            />
          </View>
        </View>
      </View>

      <Wrapper />

      <View style={styles.headerItem}>
        <View>
          <Description style={{color: colors.white}}>Cash Balance:</Description>
          <Subtitle style={{color: colors.white}}>{`$${numberWithCommas(
            Number(cashBalance).toFixed(2),
          )} USD`}</Subtitle>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Description style={{color: colors.white}}>
            Metal Holdings:
          </Description>
          <Subtitle style={{color: colors.white}}>{`$${numberWithCommas(
            Number(totalHoldings).toFixed(2),
          )} USD`}</Subtitle>
        </View>
      </View>
    </View>
  );
};
