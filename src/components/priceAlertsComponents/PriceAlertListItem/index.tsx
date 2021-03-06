import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ModalWindow, PriceAlertListItemProps, Wrapper} from '../..';
import {Delete, Edit} from '@assets/images/settings';
import {colors, Screens} from '@constants';
import {getMetalImage} from '@utilities';
import {Illustration, SubtitleMedium} from '@Typography';
import {styles} from './styles';

export const PriceAlertListItem: React.FC<PriceAlertListItemProps> = ({
  metal,
  backgroundColor,
  condition,
  date,
  time,
  color,
  value,
  keyId,
  data,
  error,
  id,
  style,
  onRemove,
}) => {
  const [visibleModal, setVisibleModal] = useState(false);

  const Image = getMetalImage(metal);
  const navigation: any = useNavigation();

  const goToEdit = () => {
    navigation.navigate(Screens.priceAlertSetUp, {
      type: 'edit',
      prevValues: {
        metal,
        backgroundColor,
        color,
        date,
        time,
        value,
        condition,
        id,
      },
      id: keyId,
      data,
    });
  };

  return (
    <>
      <ModalWindow
        title="Cancel ALert"
        text="Are you sure you want to cancel this Alert?"
        confirmTitle="Yes, cancel"
        cancelTitle="No, keep it"
        onConfirm={() => onRemove({metal, id})}
        onCancel={() => setVisibleModal(false)}
        visible={visibleModal}
      />
      <View style={{...styles.container, ...style}}>
        <View style={styles.header}>
          <View style={{...styles.image, backgroundColor: backgroundColor}}>
            <Image />
          </View>

          <View style={{marginLeft: 8}}>
            <SubtitleMedium style={{fontFamily: 'OpenSans-Bold'}}>
              {`${condition.split(' ').slice(0, 2).join(' ')} ${value}${
                condition.split(' ')[2]
              }`}
            </SubtitleMedium>
            <Illustration>
              Created on {date} {time}
            </Illustration>
          </View>
        </View>
        <View style={styles.actionButtons}>
          {!error && (
            <TouchableOpacity onPress={goToEdit}>
              <Edit />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{marginLeft: 15}}
            onPress={() => setVisibleModal(true)}>
            <Delete />
          </TouchableOpacity>
        </View>
      </View>
      <Wrapper style={{backgroundColor: colors.gray}} />
    </>
  );
};
