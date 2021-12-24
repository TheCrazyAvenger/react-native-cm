import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  Description,
  Illustration,
  SubtitleMedium,
  TitleMedium,
} from '@Typography';
import {Screen, TextButton} from '@ui';
import {styles} from './styles';
import {useAppSelector} from '@hooks';
import {numberWithCommas} from '@utilities';
import {Info} from '@assets/images/buy';
import {Tooltip} from 'react-native-elements';
import {EmptyCart} from '@assets/images/reedem';
import {colors, Screens} from '@constants';
import {
  CartItem,
  CheckBoxItem,
  ItemPicker,
  PaymentMethodPicker,
  TaxItem,
  Wrapper,
} from '@components';

export const Cart: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const [account, setAccount] = useState('');

  const [paymentMethod, setPaymentMethod] = useState('cashBalance');
  const [shipping, setShipping] = useState('baseShipping 7.99');
  const [checkBox, setCheckbox] = useState(false);

  const cashBalance = useAppSelector(state => state.auth.cashBalance);
  const shippingAdress = useAppSelector(state => state.auth.shippingAdress);
  const cart = useAppSelector(state => state.reedem.cart);

  let totalPrice = cart.reduce(
    (acc: number, next: any) => acc + next.price * next.qty,
    0,
  );

  return (
    <Screen>
      <View style={styles.container}>
        <TitleMedium style={styles.mainTitle}>
          Redemption Preferences
        </TitleMedium>

        <View style={{marginBottom: 20}}>
          <Description style={styles.infoTitle}>
            Eligible for Redemption:
          </Description>
          <View style={styles.infoPrice}>
            <SubtitleMedium style={styles.priceText}>{`$${numberWithCommas(
              Number(cashBalance).toFixed(2),
            )}`}</SubtitleMedium>
            {/* 
             //@ts-ignore*/}
            <Tooltip
              withPointer={false}
              containerStyle={{...styles.tooltip, width: 200}}
              backgroundColor={colors.white}
              popover={
                <Description>
                  Cash balance and metal holdings that originated from bank
                  ACHs, Credit/Debit Cards and PayPal must have been in your
                  account for at least 60 days.
                </Description>
              }>
              <Info />
            </Tooltip>
          </View>
        </View>

        {cart.length === 0 ? (
          <View style={styles.cart}>
            <View style={styles.cartImage}>
              <EmptyCart />
            </View>
            <SubtitleMedium style={styles.cartText}>
              There are no items in your cart.
            </SubtitleMedium>
          </View>
        ) : (
          cart.map((item: any) => (
            <CartItem
              key={item.name}
              image={item.image}
              name={item.name}
              qty={item.qty}
              price={item.price}
              availability={item.availability}
              date={item.date}
            />
          ))
        )}

        <Wrapper
          style={{backgroundColor: colors.primary, marginVertical: 24}}
        />
        <PaymentMethodPicker
          setPaymentType={value => setAccount(value)}
          label="Payment Method"
          containerStyle={{marginHorizontal: 0}}
          labelStyle={{marginLeft: 0}}
          onChange={value => setPaymentMethod(value)}
        />

        <ItemPicker
          label="Shipping Method"
          style={{...styles.picker}}
          placeholderStyle={styles.pickerPlaceholder}
          labelStyle={styles.pickerLabel}
          maxHeight={170}
          items={[
            {label: `Base Shipping $7.99`, value: 'baseShipping 7.99'},
            {label: 'USPS Priority $11.99', value: 'usps 11.99'},
            {label: 'UPS 3-Day Air $16.99', value: 'ups 16.99'},
          ]}
          value={shipping}
          onChange={value => {
            setShipping(value);
          }}
        />

        <TaxItem
          subtotal={0}
          salesTax={0}
          shippingFee={shipping}
          shippingTax={0}
          total={totalPrice}
        />

        <View>
          {shippingAdress.city !== '' && cart.length > 0 ? (
            <CheckBoxItem
              value={checkBox}
              style={{marginLeft: 0}}
              onPress={() => setCheckbox(value => !value)}>
              <View style={{marginBottom: 12, width: '90%'}}>
                <Description>
                  <Description style={{color: colors.red}}>
                    Your cart contains item(s) listed on presale.
                  </Description>{' '}
                  Check this box to confirm you understand your entire order
                  will wait for your presale item to ship, on or around
                  11/25/21.
                </Description>
              </View>
            </CheckBoxItem>
          ) : null}
          {shippingAdress.city === '' && (
            <View style={{marginBottom: 12}}>
              <Illustration style={styles.error}>
                Please, indicate the Shipping Address in your
              </Illustration>

              <Illustration
                onPress={() => navigation.navigate(Screens.profile)}
                style={styles.shippingText}>
                Profile.
              </Illustration>
            </View>
          )}
          <TextButton
            solid
            title="Checkout"
            changeDisabledStyle={true}
            disabledStyle={{
              backgroundColor:
                cashBalance < +totalPrice ? '#F39A9A' : '#C1D9FA',
            }}
            disabledTitle={
              cashBalance < +totalPrice ? 'Insufficient Funds' : null
            }
            disabled={
              shippingAdress.city === '' ||
              cart.length === 0 ||
              (account === '' && paymentMethod !== 'cashBalance') ||
              checkBox === false ||
              cashBalance < totalPrice + +shipping.split(' ')[1]
            }
            onPress={() =>
              navigation.navigate(Screens.reviewReedem, {
                paymentMethod,
                shippingMethod: shipping,
                cart,
                account,
                amount: totalPrice,
              })
            }
          />
          <TextButton
            title="Cancel"
            style={{marginTop: 15}}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </Screen>
  );
};
