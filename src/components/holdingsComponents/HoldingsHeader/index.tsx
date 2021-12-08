import React from 'react';
import {Image, View} from 'react-native';
import {HoldingsHeaderProps, MetalPicker, Wrapper} from '../..';
import {colors} from '@constants';
import {getMetalsColor, metals, numberWithCommas} from '@utilities';
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

  const ownedMetals = useAppSelector(state => state.auth.ownedMetals);

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
            <Illustration style={styles.profit}>0.00%</Illustration>
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
