import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {Wrapper} from '../..';
import {colors} from '@constants';
import {
  Description,
  Illustration,
  Subtitle,
  SubtitleMedium,
  TitleMedium,
} from '@Typography';
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

  const {data = [], isLoading, error} =
    // @ts-ignore
    useGetDigitalProductsQuery();

  useEffect(() => {
    if (!isLoading && data !== [] && !error) {
      const {gainsLosses, metalHoldings} = getGainsLosses(
        data,
        operations,
        ownedMetals,
        'percent',
      );
      setTotalHoldings(metalHoldings);

      setTotalPerfomance(metalHoldings === 0 ? 0 : gainsLosses);
    }
  }, [data, operations, ownedMetals]);

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 37, alignSelf: 'center'}}>
        <Logo />
      </View>
      <View style={styles.headerItem}>
        <View style={{maxWidth: '65%'}}>
          <SubtitleMedium style={styles.value}>
            Your Account Value:
          </SubtitleMedium>
          <TitleMedium
            numberOfLines={1}
            style={{
              color: colors.white,
            }}>{`$${numberWithCommas(
            Number(cashBalance + totalHoldings).toFixed(2),
          )} USD`}</TitleMedium>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Illustration style={{...styles.headerText, fontSize: 12}}>
            Total Performance
          </Illustration>
          <View style={styles.perfomance}>
            <Illustration style={styles.profit}>{`${numberWithCommas(
              Number(totalPerfomance).toFixed(2),
            )} %`}</Illustration>
            {totalPerfomance >= 0 ? (
              <Image
                style={{marginLeft: 6}}
                source={require('@assets/images/home/upArrow.png')}
              />
            ) : (
              <Image
                style={{marginLeft: 6}}
                source={require('@assets/images/home/downArrow.png')}
              />
            )}
          </View>
        </View>
      </View>

      <Wrapper />

      <View style={styles.headerItem}>
        <View style={{maxWidth: '50%'}}>
          <Description style={styles.headerText}>Cash Balance:</Description>
          <Subtitle
            numberOfLines={1}
            style={{color: colors.white}}>{`$${numberWithCommas(
            Number(cashBalance).toFixed(2),
          )} USD`}</Subtitle>
        </View>
        <View style={{maxWidth: '50%', alignItems: 'flex-end'}}>
          <Description style={styles.headerText}>Metal Holdings:</Description>
          <Subtitle
            numberOfLines={1}
            style={{color: colors.white}}>{`$${numberWithCommas(
            Number(totalHoldings).toFixed(2),
          )} USD`}</Subtitle>
        </View>
      </View>
    </View>
  );
};
