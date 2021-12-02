import React from 'react';
import {View} from 'react-native';
import {ProductItemProps, Wrapper} from '../..';
import {colors} from '@constants';
import {TextButton} from '@ui';
import {Illustration, Subtitle, SubtitleMedium} from '@Typography';
import {styles} from './styles';

export const ProductItem: React.FC<ProductItemProps> = ({
  vault,
  premium,
  storageFee,
  spread,
  metal,
  onPress,
  price,
  style,
}) => (
  <View style={{...styles.container, ...style}}>
    <View style={styles.cardItem}>
      <Subtitle style={styles.cardTitle}>{metal}</Subtitle>
      <Subtitle style={styles.cardTitle}>$ {price} USD</Subtitle>
    </View>
    <Wrapper style={{backgroundColor: colors.primary, marginVertical: 12}} />
    <View style={styles.cardItem}>
      <View>
        <Illustration style={{fontSize: 14, marginBottom: 5}}>
          Vault
        </Illustration>
        <SubtitleMedium>{vault}</SubtitleMedium>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Illustration style={{fontSize: 14, marginBottom: 5}}>
          Premium
        </Illustration>
        <SubtitleMedium>$ {premium}/oz</SubtitleMedium>
      </View>
    </View>

    <View style={{...styles.cardItem, marginTop: 10}}>
      <View>
        <Illustration style={{fontSize: 14, marginBottom: 5}}>
          Storage Fee
        </Illustration>
        <SubtitleMedium>{storageFee}% per anuum</SubtitleMedium>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Illustration style={{fontSize: 14, marginBottom: 5}}>
          Spread
        </Illustration>
        <SubtitleMedium>$ {spread}/oz</SubtitleMedium>
      </View>
    </View>
    <TextButton
      title={`Buy ${metal}`}
      solid
      onPress={onPress}
      style={{marginTop: 20}}
    />
  </View>
);
