import React from 'react';
import {Modal, Image, TouchableOpacity, View} from 'react-native';
import {MenuModalProps} from '..';
import {MenuModalItem} from '../..';
import {colors} from '../../../constants';
import {styles} from './styles';

export const MenuModal: React.FC<MenuModalProps> = ({visible, onPress}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.container}>
        <View style={styles.menu}>
          <MenuModalItem
            title="Buy"
            text="Buy gold, silver, platinum and palladium"
            uri={require('../../../assets/images/navigation/buyMetal.png')}
            onPress={() => console.log(1)}
          />
          <MenuModalItem
            title="Sell"
            text="Sell your gold, silver, platinum or palladium"
            uri={require('../../../assets/images/navigation/sellMetal.png')}
            onPress={() => console.log(1)}
          />
          <MenuModalItem
            title="Fund"
            text="Deposit your funds"
            uri={require('../../../assets/images/navigation/fund.png')}
            onPress={() => console.log(1)}
          />
          <MenuModalItem
            title="Withdraw"
            text="Widthdraw your funds"
            uri={require('../../../assets/images/navigation/withdraw.png')}
            onPress={() => console.log(1)}
          />
          <MenuModalItem
            title="Redeem"
            text="Redeem your holdings for physical metals"
            uri={require('../../../assets/images/navigation/redeem.png')}
            onPress={() => console.log(1)}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.closeButton}
          onPress={onPress}>
          <Image
            source={require('../../../assets/images/navigation/close.png')}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
