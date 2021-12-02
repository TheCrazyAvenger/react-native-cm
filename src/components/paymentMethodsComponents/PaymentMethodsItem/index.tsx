import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ModalWindow, PaymentMethodsItemProps, Wrapper} from '../..';
import {Delete, Warning} from '@assets/images/settings';
import {colors} from '@constants';
import {
  getCardImage,
  getCardType,
  getPaymentImage,
  setExpiring,
} from '@utilities';

import {Illustration, SubtitleMedium} from '@Typography';
import {styles} from './styles';

export const PaymentMethodsItem: React.FC<PaymentMethodsItemProps> = ({
  paymentMethod,
  cardNumber,
  expiring,
  type,
  id,
  style,
  onRemove,
}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [isExpiried, setIsExpiried] = useState(false);
  const Image = getPaymentImage(paymentMethod);
  const CardImage = getCardImage(type);

  useEffect(() => {
    setIsExpiried(setExpiring(expiring));
  }, []);

  return (
    <>
      <ModalWindow
        title="Remove Payment Method"
        text={`Are you sure you want to remove linked ${
          type ? getCardType(type) : ''
        } ${paymentMethod} ${
          paymentMethod === 'PayPal' || paymentMethod === 'ACH/eCheck'
            ? cardNumber
            : `ending with ${cardNumber.split('').splice(-4).join('')}`
        }?`}
        confirmTitle="Remove"
        cancelTitle="Cancel"
        onConfirm={() => onRemove(id)}
        onCancel={() => setVisibleModal(false)}
        visible={visibleModal}
      />
      <View style={{...styles.container, ...style}}>
        <View style={styles.header}>
          <View>
            <Image />
          </View>

          <View style={{marginLeft: 12}}>
            <View style={styles.row}>
              <SubtitleMedium
                style={{fontFamily: 'OpenSans-Bold', marginRight: 5}}>
                {paymentMethod}
              </SubtitleMedium>
              {isExpiried && <Warning />}
            </View>
            <View style={styles.row}>
              {CardImage !== null && (
                <View style={{marginRight: 10}}>
                  <CardImage />
                </View>
              )}
              {cardNumber && (
                <Illustration style={{marginRight: 10}}>
                  {paymentMethod === 'PayPal' || paymentMethod === 'ACH/eCheck'
                    ? cardNumber
                    : `Ending with ${cardNumber.split('').splice(-4).join('')}`}
                </Illustration>
              )}
              {isExpiried && (
                <Illustration style={{color: colors.red}}>
                  Expired {expiring}
                </Illustration>
              )}
            </View>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={() => setVisibleModal(true)}>
            <Delete />
          </TouchableOpacity>
        </View>
      </View>
      <Wrapper style={{backgroundColor: colors.gray}} />
    </>
  );
};
