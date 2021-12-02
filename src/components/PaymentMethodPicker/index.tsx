import {CashBalance} from '@assets/images/settings';
import {ItemPicker} from '@components';
import {useAppSelector} from '@hooks';
import {Description, SubtitleMedium} from '@Typography';
import {getPaymentImage} from '@utilities';
import React, {useState} from 'react';
import {View} from 'react-native';
import {styles} from './styles';

export const PaymentMethodPicker: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('cashBalance');

  const paymentMethods = useAppSelector(
    state => state.paymentMethod.paymentMethods,
  );

  return (
    <View>
      <ItemPicker
        LeftIcon={getPaymentImage(paymentMethod)}
        label="Payment Method"
        style={styles.picker}
        placeholderStyle={styles.pickerPlaceholder}
        items={[
          {label: 'Cash Balance', value: 'cashBalance'},
          {label: 'Credit/Debit Card', value: 'creditCard'},
          {label: 'Bank Wire', value: 'bankWire'},
          {label: 'PayPal', value: 'payPal'},
          {label: 'ACH/eCheck', value: 'eCheck'},
        ]}
        value={paymentMethod}
        onChange={setPaymentMethod}
      />
      {paymentMethod === 'eCheck' &&
        paymentMethods[paymentMethod].length === 0 && (
          <View>
            <Description>Account</Description>
          </View>
        )}
    </View>
  );
};
