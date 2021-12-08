import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
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

  const buyOperations = operations.filter((item: any) =>
    item.image === 'buy' && item.type.split(' ')[1] === name ? true : false,
  );

  const holdingsPriceAsk = ownedMetals[name] * buy;
  // buyOperations.reduce((acc: number, next: any) => acc + +next.oz, 0) * buy;

  const totalAcquisitionCost = buyOperations.reduce(
    (acc: number, next: any) => acc + +next.oz * +next.usd.split('$')[1],
    0,
  );

  useEffect(() => {
    if (buyOperations[0]) {
      setAcquisitionCost(
        buyOperations[0].oz * buyOperations[0].usd.split('$')[1],
      );
    }
    setGainLosses(holdingsPriceAsk - acquisitionCost);
  }, [holdingsPriceAsk, acquisitionCost]);

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
