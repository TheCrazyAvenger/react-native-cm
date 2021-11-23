import React from 'react';
import {Image, View} from 'react-native';
import {Wrapper} from '../..';
import {colors} from '../../../constants';
import {
  Description,
  Illustration,
  Subtitle,
  TitleMedium,
} from '../../Typography';
import {styles} from './styles';
import {Logo} from '../../../assets/images';

export const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <Logo style={{marginBottom: 37, alignSelf: 'center'}} />

      <View style={styles.headerItem}>
        <View>
          <Description style={{color: colors.white}}>
            Your Account Value:
          </Description>
          <TitleMedium style={{color: colors.white}}>$1,850.40 USD</TitleMedium>
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
          <Subtitle style={{color: colors.white}}>$1,084.10 USD</Subtitle>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Description style={{color: colors.white}}>
            Metal Holdings:
          </Description>
          <Subtitle style={{color: colors.white}}>$755.30 USD</Subtitle>
        </View>
      </View>
    </View>
  );
};
