import React, {useEffect, useMemo, useState} from 'react';
import {Image, View} from 'react-native';
import {HoldingsHeaderProps, Wrapper} from '../..';
import {metals, numberWithCommas} from '@utilities';
import {
  DescriptionBold,
  Illustration,
  Subtitle,
  SubtitleMedium,
} from '@Typography';
import {styles} from './styles';
import {useAppSelector} from '@hooks';
import {DownArrow, UpArrow} from '@assets/images/home';
import LinearGradient from 'react-native-linear-gradient';

export const HoldingsHeader: React.FC<HoldingsHeaderProps> = ({
  metalType,
  data,
}) => {
  const {name, buy, digitalMetal} = data[metalType];
  const {oneDayChange} = digitalMetal;

  const [gainsLosses, setGainLosses] = useState(0);
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
            new Date(`${item.date}, ${item.time}`) <
            new Date(`${next.date}, ${next.time}`),
        ),
    [operations, metalType],
  );

  const holdingsPriceAsk = useMemo(
    () => ownedMetals[name] * buy,
    [ownedMetals[name]],
  );

  const totalAcquisitionCost = useMemo(
    () =>
      buyOperations.reduce(
        (acc: number, next: any) => acc + +next.oz * +next.spot,
        0,
      ),
    [buyOperations],
  );

  useEffect(() => {
    setGainLosses(holdingsPriceAsk - totalAcquisitionCost);
  }, [holdingsPriceAsk, totalAcquisitionCost, buyOperations]);

  const totalPerfomance = useMemo(
    () => (holdingsPriceAsk === 0 ? 0 : gainsLosses / totalAcquisitionCost),
    [gainsLosses],
  );

  return (
    <LinearGradient colors={metals[metalType].linearGradient} style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.headerItem}>
          <View>
            <SubtitleMedium style={styles.headerText}>Balance:</SubtitleMedium>
            <Subtitle style={styles.balance}>
              {`$${numberWithCommas(
                Number(ownedMetals[name] * 1887).toFixed(2),
              )}`}
            </Subtitle>
            <DescriptionBold
              style={{...styles.headerText, fontFamily: 'OpenSans-SemiBold'}}>
              {`${numberWithCommas(Number(ownedMetals[name]).toFixed(3))} oz`}
            </DescriptionBold>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Illustration style={styles.headerText}>
              Total Performance
            </Illustration>
            <View style={styles.perfomance}>
              <Illustration style={styles.profit}>
                {numberWithCommas(Number(totalPerfomance).toFixed(2))}%
              </Illustration>
              <View style={{marginLeft: 6}}>
                {totalPerfomance >= 0 ? (
                  <Image source={require('@assets/images/home/upArrow.png')} />
                ) : (
                  <DownArrow />
                )}
              </View>
            </View>
          </View>
        </View>

        <Wrapper />

        <View style={styles.headerItem}>
          <View>
            <SubtitleMedium style={{...styles.headerText, marginBottom: 6}}>
              Metal Price:
            </SubtitleMedium>
            <DescriptionBold style={styles.headerText}>
              {`$${numberWithCommas(Number(buy).toFixed(2))}`}
            </DescriptionBold>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <SubtitleMedium style={styles.headerText}>Change:</SubtitleMedium>
            <View style={styles.change}>
              <DescriptionBold style={styles.headerText}>
                {`$${numberWithCommas(
                  Number(Math.abs(oneDayChange)).toFixed(2),
                )}`}
              </DescriptionBold>
              <View
                style={{
                  marginLeft: 6,
                  transform: [{rotate: oneDayChange >= 0 ? '0deg' : '180deg'}],
                }}>
                <UpArrow />
              </View>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};
