import React, {useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {Wrapper} from '../..';
import {colors} from '@constants';
import {getColor, getMetalsColor, numberWithCommas} from '@utilities';
import {Subtitle, SubtitleMedium} from '@Typography';
import {styles} from './styles';
import {useAppSelector} from '@hooks';
import {GainsLossesArrow} from '@assets/images/potfolio';

export const MetalsInfo: React.FC<{
  data: any;
}> = ({data}) => {
  const [gainsLosses, setGainLosses] = useState(0);
  const [acquisitionCost, setAcquisitionCost] = useState(0);
  const ownedMetals = useAppSelector(state => state.auth.ownedMetals);
  const operations = useAppSelector(state => state.operations.operations);

  const {name, buy} = data;
  const color = getMetalsColor(name);

  const buyOperations = useMemo(
    () =>
      operations
        .filter((item: any) =>
          item.type === 'Buy' && item.product === name ? true : false,
        )
        .sort(
          (item: any, next: any) =>
            new Date(`${item.date}, ${item.time}`) <
            new Date(`${next.date}, ${next.time}`),
        ),
    [operations, data],
  );

  const holdingsPriceAsk = ownedMetals[name] * buy;

  const totalAcquisitionCost = useMemo(
    () =>
      buyOperations.reduce(
        (acc: number, next: any) => acc + +next.oz * +next.total,
        0,
      ),
    [buyOperations],
  );

  useEffect(() => {
    if (buyOperations[0]) {
      setAcquisitionCost(
        buyOperations[0].oz * +buyOperations[0].total * ownedMetals[name],
      );
    }
    setGainLosses(holdingsPriceAsk - acquisitionCost);
  }, [holdingsPriceAsk, acquisitionCost, buyOperations]);

  const totalOwned = ownedMetals[name];

  return (
    <View>
      <View>
        <View style={{...styles.cardItem, marginTop: 0}}>
          <Subtitle style={{...styles.cardTitle, color}}>{name}</Subtitle>
          <Subtitle style={styles.cardTitle}>{`$${numberWithCommas(
            Number(totalOwned * 1887).toFixed(2),
          )} USD`}</Subtitle>
        </View>

        <View style={styles.cardItem}>
          <SubtitleMedium>Gains/Losses</SubtitleMedium>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <SubtitleMedium style={{color: getColor(gainsLosses)}}>
              {`$${numberWithCommas(
                Number(Math.abs(gainsLosses)).toFixed(2),
              )} USD`}
            </SubtitleMedium>
            <View
              style={{
                marginLeft: 5,
                transform: [{rotate: gainsLosses >= 0 ? '0deg' : '180deg'}],
              }}>
              <GainsLossesArrow fill={gainsLosses >= 0 ? 'green' : 'red'} />
            </View>
          </View>
        </View>
        <View style={styles.cardItem}>
          <SubtitleMedium>Total Acquisition Cost</SubtitleMedium>
          <SubtitleMedium>{`$${numberWithCommas(
            Number(totalAcquisitionCost).toFixed(2),
          )} USD`}</SubtitleMedium>
        </View>
        <View style={styles.cardItem}>
          <SubtitleMedium>Total Owned</SubtitleMedium>
          <SubtitleMedium>
            {numberWithCommas(Number(totalOwned).toFixed(3))} oz
          </SubtitleMedium>
        </View>
      </View>
      <Wrapper style={{backgroundColor: colors.primary, marginTop: 20}} />
    </View>
  );
};
