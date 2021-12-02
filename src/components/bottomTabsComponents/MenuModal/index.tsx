import React from 'react';
import {Modal, Image, TouchableOpacity, View} from 'react-native';
import {MenuModalProps} from '..';
import {MenuModalItem} from '../..';
import {Screens} from '@constants';
import {styles} from './styles';
import {
  BuyMetal,
  SellMetal,
  Fund,
  Withdraw,
  Redeem,
  Close,
} from '@assets/images/navigation';
import {useNavigation} from '@react-navigation/core';

export const MenuModal: React.FC<MenuModalProps> = ({visible, onPress}) => {
  const navigation: any = useNavigation();
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.container}>
        <View style={styles.menu}>
          <MenuModalItem
            title="Buy"
            text="Buy gold, silver, platinum and palladium"
            Image={BuyMetal}
            onPress={() => navigation.navigate(Screens.buyStack)}
          />
          <MenuModalItem
            title="Sell"
            text="Sell your gold, silver, platinum or palladium"
            Image={SellMetal}
            onPress={() => console.log(1)}
          />
          <MenuModalItem
            title="Fund"
            text="Deposit your funds"
            Image={Fund}
            onPress={() => console.log(1)}
          />
          <MenuModalItem
            title="Withdraw"
            text="Widthdraw your funds"
            Image={Withdraw}
            onPress={() => console.log(1)}
          />
          <MenuModalItem
            title="Redeem"
            text="Redeem your holdings for physical metals"
            Image={Redeem}
            onPress={() => console.log(1)}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.closeButton}
          onPress={onPress}>
          <Close />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
