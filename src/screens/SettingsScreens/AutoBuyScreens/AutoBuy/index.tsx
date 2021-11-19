import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, ScrollView, StatusBar, View} from 'react-native';
import {Description, Subtitle} from '../../../../components/Typography';
import {Screens} from '../../../../constants';
import {Screen, TextButton} from '../../../../ui';
import {styles} from './styles';

export const AutoBuy: React.FC = () => {
  const navigation: any = useNavigation();

  return (
    <Screen type="View">
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Image
              style={{marginBottom: 20}}
              source={require('../../../../assets/images/settings/shareRefer.png')}
            />
            <Subtitle style={styles.title}>Set up Auto Buy Now</Subtitle>
            <Description style={styles.description}>
              CyberMetals Auto Buy program allows you to make recurring
              purchases of digital metals in increments that fit your timeframe
              and budget.
            </Description>
          </View>
        </ScrollView>
        <TextButton
          title="Add New"
          style={{marginBottom: 25}}
          solid
          onPress={() => navigation.navigate(Screens.autoBuyList)}
        />
      </View>
    </Screen>
  );
};
