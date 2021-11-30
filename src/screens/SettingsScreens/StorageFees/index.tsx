import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, ScrollView, StatusBar, View} from 'react-native';
import {ShareRefer} from '../../../assets/images/settings';
import {EmptyDataScreen} from '../../../components';
import {Description, Subtitle} from '../../../components/Typography';
import {Screen, TextButton} from '../../../ui';
import {styles} from './styles';

export const StorageFees: React.FC = () => {
  const navigation: any = useNavigation();

  return (
    <EmptyDataScreen title="No Invoices" text="You have no active invoices." />
  );
};
