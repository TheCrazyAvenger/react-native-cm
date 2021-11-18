import React from 'react';
import {Image, View} from 'react-native';
import {HoldingsHeaderProps, MetalPicker, Wrapper} from '../..';
import {colors} from '../../../constants';
import {metals} from '../../../utilities';
import {
  DescriptionBold,
  Illustration,
  SubtitleMedium,
  TitleMedium,
} from '../../Typography';
import {styles} from './styles';

export const HoldingsHeader: React.FC<HoldingsHeaderProps> = ({
  metalType,
  setMetal,
}) => {
  const {price, ounce, ounceChange} = metals[metalType - 1];

  return (
    <View style={styles.container}>
      <TitleMedium style={styles.title}>Holdings</TitleMedium>
      <MetalPicker currentMetal={metalType} onPress={setMetal} />
      <Wrapper style={{marginTop: 4}} />
      <View style={styles.headerItem}>
        <View>
          <SubtitleMedium style={{color: colors.white}}>
            Balance:
          </SubtitleMedium>
          <TitleMedium style={{color: colors.white, fontSize: 18}}>
            $ 850.40 USD
          </TitleMedium>
          <DescriptionBold style={{color: colors.white}}>
            {ounce}
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
            {price}
          </DescriptionBold>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <SubtitleMedium style={{color: colors.white}}>Change:</SubtitleMedium>
          <View style={styles.change}>
            <DescriptionBold style={{color: colors.white}}>
              {ounceChange}
            </DescriptionBold>
            <Image
              style={{marginLeft: 6}}
              source={require('../../../assets/images/home/upArrow.png')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
