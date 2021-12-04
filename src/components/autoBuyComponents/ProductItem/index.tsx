import React from 'react';
import {View} from 'react-native';
import {ProductItemProps, Wrapper} from '../..';
import {colors} from '@constants';
import {TextButton} from '@ui';
import {Description, Illustration, Subtitle, SubtitleMedium} from '@Typography';
import {styles} from './styles';
import {Info} from '@assets/images/buy';
import {Tooltip} from 'react-native-elements';
import {useAppSelector} from '@hooks';

export const ProductItem: React.FC<ProductItemProps> = ({
  vault,
  premium,
  storageFee,
  spread,
  metal,
  onPress,
  price,
  style,
  type,
}) => {
  const ownedMetals = useAppSelector(state => state.auth.ownedMetals);

  return (
    <View style={{...styles.container, ...style}}>
      <View style={styles.cardItem}>
        <Subtitle style={styles.cardTitle}>{metal}</Subtitle>
        <Subtitle style={styles.cardTitle}>$ {price} USD</Subtitle>
      </View>
      {type === 'Sell' && (
        <View>
          <Description>Total Owned {ownedMetals[metal]} oz</Description>
        </View>
      )}
      <Wrapper style={{backgroundColor: colors.primary, marginVertical: 12}} />
      <View style={styles.cardItem}>
        <View>
          <Illustration style={{fontSize: 14, marginBottom: 5}}>
            Vault
          </Illustration>
          <View style={styles.row}>
            <SubtitleMedium style={{marginRight: 5}}>{vault}</SubtitleMedium>
            {/* 
          //@ts-ignore*/}
            <Tooltip
              withPointer={false}
              containerStyle={{...styles.tooltip, width: 200}}
              backgroundColor={colors.white}
              popover={
                <Description>
                  Our {metal} is a digital representation of fully-backed
                  physical {metal}, which is fully insured, regularly audited,
                  and securely stored in Dallas with our vaulting partners, JM
                  Bullion and A-Mark Precious Metals.
                </Description>
              }>
              <Info />
            </Tooltip>
          </View>
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

          <View style={styles.row}>
            <SubtitleMedium style={{marginRight: 5}}>
              $ {spread}/oz
            </SubtitleMedium>
            {/* 
          //@ts-ignore*/}
            <Tooltip
              withPointer={false}
              containerStyle={{...styles.tooltip, width: 190}}
              backgroundColor={colors.white}
              popover={
                <Description>
                  Spread is the difference between current buy price and current
                  sell price.
                </Description>
              }>
              <Info />
            </Tooltip>
          </View>
        </View>
      </View>
      <TextButton
        title={`${type === 'Sell' ? 'Sell' : 'Buy'} ${metal}`}
        solid
        disabled={type === 'Sell' && ownedMetals[metal] === 0 ? true : false}
        onPress={onPress}
        style={{marginTop: 20}}
      />
    </View>
  );
};
