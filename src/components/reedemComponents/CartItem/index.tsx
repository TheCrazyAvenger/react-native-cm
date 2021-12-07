import {InPresale, InStock} from '@assets/images/reedem';
import {CartItemProps} from '@components';
import {colors} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {deleteCart, updateCart} from '@store/slices/reedemSlice';
import {Illustration, Subtitle, SubtitleMedium} from '@Typography';
import {getReedemImage, getTime, numberWithCommas} from '@utilities';
import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

export const CartItem: React.FC<CartItemProps> = ({
  style,
  image,
  name,
  price,
  availability,
  qty,
  date,
}) => {
  const cart = useAppSelector(state => state.reedem.cart);

  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(qty);

  const presaleDate = getTime(date);

  const {month, day, year} = presaleDate;

  return (
    <View style={{...styles.container, ...style}}>
      <Image style={styles.image} source={getReedemImage(image)} />
      <View>
        <View style={styles.header}>
          <SubtitleMedium numberOfLines={2} style={styles.name}>
            {name}
          </SubtitleMedium>
          <View style={styles.availability}>
            <TouchableOpacity
              onPress={() =>
                setAmount((amount: any) => {
                  const newValue = amount - 1;
                  dispatch(updateCart({name, qty: amount - 1}));
                  return newValue;
                })
              }
              disabled={amount === 1}>
              <Subtitle
                style={{color: amount === qty ? colors.gray : colors.black}}>
                -
              </Subtitle>
            </TouchableOpacity>

            <SubtitleMedium
              style={{
                marginHorizontal: 20,
              }}>
              {amount}
            </SubtitleMedium>

            <TouchableOpacity
              onPress={() =>
                setAmount((amount: any) => {
                  const newValue = amount + 1;
                  dispatch(updateCart({name, qty: amount + 1}));
                  return newValue;
                })
              }
              disabled={amount === 9999}>
              <Subtitle
                style={{color: amount === qty ? colors.gray : colors.black}}>
                +
              </Subtitle>
            </TouchableOpacity>
          </View>
        </View>
        <SubtitleMedium style={styles.price}>{`${qty} x $${numberWithCommas(
          Number(price).toFixed(2),
        )} = $${numberWithCommas(
          Number(price * qty).toFixed(2),
        )}`}</SubtitleMedium>
        <View style={styles.header}>
          <View>
            {availability === 'In Stock' ? (
              <View style={styles.availability}>
                <InStock />
                <Illustration style={styles.inStock}>In Stock</Illustration>
              </View>
            ) : (
              <View style={styles.availability}>
                <InPresale />
                <View>
                  <Illustration style={styles.presale}>Presale :</Illustration>
                  <Illustration style={styles.presale}>
                    Ships from {`${month}/${day}/${year}`}
                  </Illustration>
                </View>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={() => dispatch(deleteCart(name))}>
            <Illustration>Remove</Illustration>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
