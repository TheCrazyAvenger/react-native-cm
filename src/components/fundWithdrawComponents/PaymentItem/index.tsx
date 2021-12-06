import {PaymentItemProps} from '@components';
import {SubtitleMedium} from '@Typography';
import {TextButton} from '@ui';
import {getPaymentImage} from '@utilities';
import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';

export const PaymentItem: React.FC<PaymentItemProps> = ({
  title,
  onPress,
  buttonTitle,
  image,
}) => {
  const Image = getPaymentImage(image);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image />
        <SubtitleMedium style={styles.title}>{title}</SubtitleMedium>
      </View>
      <TextButton solid onPress={onPress} title={buttonTitle} />
    </View>
  );
};
