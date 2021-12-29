import {InPresale, InStock, PreSale, Sale} from '@assets/images/reedem';
import {ReedemItemProps} from '@components';
import {colors} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {addCart} from '@store/slices/reedemSlice';
import {Illustration, Subtitle, SubtitleMedium} from '@Typography';
import {TextButton} from '@ui';
import {getReedemImage, getTime, numberWithCommas} from '@utilities';
import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

export const ReedemItem: React.FC<ReedemItemProps> = ({
  style,
  image,
  name,
  price,
  availability,
  onSale,
  date,
}) => {
  const cart = useAppSelector(state => state.reedem.cart);

  const dispatch = useAppDispatch();
  const [qty, setQty] = useState(0);

  const presaleDate = getTime(date);

  const {month, day, year} = presaleDate;

  const addToCart = async () => {
    try {
      const newRequest = {
        image,
        name,
        qty,
        availability,
        date,
        price,
      };

      const cartArray = [...cart, newRequest];

      const data = Array.from(
        cartArray
          .reduce((acc, {qty, ...r}) => {
            const key = JSON.stringify(r);
            const current = acc.get(key) || {...r, qty: 0};
            return acc.set(key, {...current, qty: current.qty + qty});
          }, new Map())
          .values(),
      );

      await dispatch(addCart(data));
      setQty(0);
    } catch (e) {
      setQty(0);
      console.log(e);
    }
  };

  return (
    <View style={{...styles.container, ...style}}>
      {onSale && (
        <View style={styles.onSale}>
          <Sale />
        </View>
      )}
      {availability === 'Presale' && (
        <View style={styles.onSale}>
          <PreSale />
        </View>
      )}
      <Image source={getReedemImage(image)} />
      <View style={styles.header}>
        <Illustration numberOfLines={2} style={styles.title}>
          {name}
        </Illustration>
        <View style={styles.price}>
          <SubtitleMedium style={styles.priceTitle}>{`$${numberWithCommas(
            Number(price).toFixed(2),
          )}`}</SubtitleMedium>
          <Illustration>per unit</Illustration>
        </View>
        <View style={{marginBottom: 12}}>
          {availability === 'In Stock' ? (
            <View style={styles.availability}>
              <InStock />
              <Illustration style={styles.inStock}>In Stock</Illustration>
            </View>
          ) : (
            <View style={styles.availability}>
              <InPresale />
              <Illustration style={styles.presale}>
                Presale {`${month}/${day}/${year}`}
              </Illustration>
            </View>
          )}
        </View>
        <View style={styles.availability}>
          <TouchableOpacity
            onPress={() => setQty(qty => (qty = qty - 1))}
            disabled={qty === 0}>
            <Subtitle style={{color: qty === 0 ? colors.gray : colors.black}}>
              -
            </Subtitle>
          </TouchableOpacity>

          <SubtitleMedium
            style={{
              marginHorizontal: 12,
              color: qty === 0 ? colors.gray : colors.black,
            }}>
            {qty === 0 ? 'Qty' : qty}
          </SubtitleMedium>

          <TouchableOpacity
            onPress={() => setQty(qty => (qty = qty + 1))}
            disabled={qty === 9999}>
            <Subtitle
              style={{color: qty === 9999 ? colors.gray : colors.black}}>
              +
            </Subtitle>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 12}}>
          <TextButton
            disabled={qty === 0}
            solid
            title="Add to Cart"
            onPress={addToCart}
          />
        </View>
      </View>
    </View>
  );
};
