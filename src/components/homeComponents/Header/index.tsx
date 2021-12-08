import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {Wrapper} from '../..';
import {colors} from '@constants';
import {Description, Illustration, Subtitle, TitleMedium} from '@Typography';
import {styles} from './styles';
import {Logo} from '@assets/images';
import {useAppSelector} from '@hooks';
import {getGainsLosses, numberWithCommas} from '@utilities';
import {useGetDigitalProductsQuery} from '@api';

export const Header: React.FC = () => {
  const [totalHoldings, setTotalHoldings] = useState(0);
  const [totalPerfomance, setTotalPerfomance] = useState(0);

  const cashBalance = useAppSelector(state => state.auth.cashBalance);
  const operations = useAppSelector(state => state.operations.operations);
  const ownedMetals = useAppSelector(state => state.auth.ownedMetals);

  const {data = [], isLoading} =
    // @ts-ignore
    useGetDigitalProductsQuery();

  useEffect(() => {
    if (!isLoading && data !== []) {
      const {gainsLosses, metalHoldings} = getGainsLosses(
        data,
        operations,
        ownedMetals,
      );
      setTotalHoldings(metalHoldings);

      setTotalPerfomance(
        metalHoldings === 0 ? 0 : (gainsLosses / metalHoldings) * 100,
      );
    }
  }, [data, operations]);

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
            <Illustration style={styles.profit}>{`${numberWithCommas(
              Number(totalPerfomance).toFixed(2),
            )} %`}</Illustration>
            {totalPerfomance >= 0 ? (
              <Image
                style={{marginLeft: 6}}
                source={require('../../../assets/images/home/upArrow.png')}
              />
            ) : (
              <Image
                style={{marginLeft: 6}}
                source={require('../../../assets/images/home/downArrow.png')}
              />
            )}
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
