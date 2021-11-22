import React, {useState} from 'react';
import {Image, Modal, TouchableOpacity, View} from 'react-native';
import {MenuModalItemProps, ModalWindowProps} from '..';
import {TextButton} from '../../ui';
import {Description, Illustration, Subtitle} from '../Typography';

import {styles} from './styles';

export const ModalWindow: React.FC<ModalWindowProps> = ({
  title,
  text,
  confirmTitle,
  cancelTitle,
  onConfirm,
  onCancel,
  visible = false,
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.container}>
        <View style={styles.inner}>
          <View style={{marginBottom: 40}}>
            <Subtitle style={styles.title}>{title}</Subtitle>
            <Description style={{textAlign: 'center'}}>{text}</Description>
          </View>

          <View>
            <TextButton
              style={{marginBottom: 20}}
              solid
              title={confirmTitle}
              onPress={onConfirm}
            />

            <TextButton title={cancelTitle} onPress={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};
