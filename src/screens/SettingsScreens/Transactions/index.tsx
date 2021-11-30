import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, ScrollView, StatusBar, View} from 'react-native';
import {ShareRefer} from '../../../assets/images/settings';
import {EmptyDataScreen} from '../../../components';
import {Description, Subtitle} from '../../../components/Typography';
import {Screen, TextButton} from '../../../ui';
import {styles} from './styles';

export const Transactions: React.FC = () => {
  const navigation: any = useNavigation();

  return (
    <EmptyDataScreen
      title="No Transactions History"
      text="Get started today to experience a new way to invest in precious metals."
      buttonTitle="Start Investing"
      onPress={() => console.log('Start Investing')}
    />
  );
};
