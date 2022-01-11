import React from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import {MenuModalItem, MenuModalProps} from '../..';
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

  const handleNavigation = (screen: string, type?: string) => {
    navigation.navigate(screen, {
      type,
    });
    onPress();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.container}>
        <View style={styles.menu}>
          <MenuModalItem
            title="Buy"
            text="Buy gold, silver, platinum and palladium"
            Image={BuyMetal}
            onPress={() => handleNavigation(Screens.sellBuyStack, 'Buy')}
          />
          <MenuModalItem
            title="Sell"
            text="Sell your gold, silver, platinum or palladium"
            Image={SellMetal}
            onPress={() => handleNavigation(Screens.sellBuyStack, 'Sell')}
          />
          <MenuModalItem
            title="Fund"
            text="Deposit your funds"
            Image={Fund}
            onPress={() => handleNavigation(Screens.fundWithdrawStack, 'Fund')}
          />
          <MenuModalItem
            title="Withdraw"
            text="Widthdraw your funds"
            Image={Withdraw}
            onPress={() =>
              handleNavigation(Screens.fundWithdrawStack, 'Withdraw')
            }
          />
          <MenuModalItem
            title="Redeem"
            text="Redeem your holdings for physical metals"
            Image={Redeem}
            onPress={() => handleNavigation(Screens.reedemStack)}
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
