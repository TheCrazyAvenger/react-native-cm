import React, {useEffect, useMemo, useState} from 'react';
import {Image, View} from 'react-native';
import {HoldingsHeaderProps, MetalPicker, Wrapper} from '../..';
import {colors} from '@constants';
import {getMetalsColor, numberWithCommas} from '@utilities';
import {
  DescriptionBold,
  Illustration,
  SubtitleMedium,
  TitleMedium,
} from '@Typography';
import {styles} from './styles';
import {useAppSelector} from '@hooks';
import {DownArrow, UpArrow} from '@assets/images/home';

export const HoldingsHeader: React.FC<HoldingsHeaderProps> = ({
  metalType,
  setMetal,
  data,
}) => {
  const {name, buy, digitalMetal, id} = data[metalType - 1];
  const {oneDayChange} = digitalMetal;

  const [gainsLosses, setGainLosses] = useState(0);
  const [acquisitionCost, setAcquisitionCost] = useState(0);
  const ownedMetals = useAppSelector(state => state.auth.ownedMetals);
  const operations = useAppSelector(state => state.operations.operations);

  const buyOperations = useMemo(
    () =>
      operations
        .filter((item: any) =>
          item.type === 'Buy' && item.product === name ? true : false,
        )
        .sort(
          (item: any, next: any) =>
            new Date(`${item.date}, ${item.time}`) >
            new Date(`${next.date}, ${next.time}`),
        ),
    [operations],
  );

  const holdingsPriceAsk = ownedMetals[name] * buy;

  useEffect(() => {
    if (buyOperations[0]) {
      setAcquisitionCost(
        buyOperations[0].oz * buyOperations[0].usd.split('$')[1],
      );
    }
    setGainLosses(holdingsPriceAsk - acquisitionCost);
  }, [holdingsPriceAsk, acquisitionCost, buyOperations]);

  const totalPerfomance = useMemo(
    () => (gainsLosses / holdingsPriceAsk) * 1,
    [gainsLosses, holdingsPriceAsk],
  );

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: getMetalsColor(id),
      }}>
      <TitleMedium style={styles.title}>Holdings</TitleMedium>
      <MetalPicker currentMetal={metalType} onPress={setMetal} />
      <Wrapper style={{marginTop: 4}} />
      <View style={styles.headerItem}>
        <View>
          <SubtitleMedium style={{color: colors.white}}>
            Balance:
          </SubtitleMedium>
          <TitleMedium style={{color: colors.white, fontSize: 18}}>
            {`$${(ownedMetals[name] * 1887).toFixed(2)}`}
          </TitleMedium>
          <DescriptionBold style={{color: colors.white}}>
            {`${numberWithCommas(Number(ownedMetals[name]).toFixed(3))} oz`}
          </DescriptionBold>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Illustration style={{color: colors.white}}>
            Total Performance
          </Illustration>
          <View style={styles.perfomance}>
            <Illustration style={styles.profit}>
              {numberWithCommas(Number(totalPerfomance).toFixed(2))}%
            </Illustration>
            <Image
              style={{marginLeft: 6}}
              source={require('../../../assets/images/home/upArrow.png')}
            />
          </View>
        </View>
      </View>

      <Wrapper />

      <View style={styles.headerItem}>
        <View>
          <SubtitleMedium style={{color: colors.white, marginBottom: 6}}>
            Metal Price:
          </SubtitleMedium>
          <DescriptionBold style={{color: colors.white}}>
            {`$${numberWithCommas(Number(buy).toFixed(2))}`}
          </DescriptionBold>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <SubtitleMedium style={{color: colors.white}}>Change:</SubtitleMedium>
          <View style={styles.change}>
            <DescriptionBold style={{color: colors.white}}>
              {`${oneDayChange < 0 ? '-' : '+'}$${numberWithCommas(
                Number(Math.abs(oneDayChange)).toFixed(2),
              )}`}
            </DescriptionBold>
            <View style={{marginLeft: 6}}>
              {oneDayChange >= 0 ? <UpArrow /> : <DownArrow />}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
