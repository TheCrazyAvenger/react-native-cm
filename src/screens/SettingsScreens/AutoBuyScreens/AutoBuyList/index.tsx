import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, ScrollView, StatusBar, View} from 'react-native';
import {Wrapper} from '../../../../components';
import {
  Description,
  Subtitle,
  SubtitleMedium,
} from '../../../../components/Typography';
import {colors, Screens} from '../../../../constants';
import {Screen, TextButton} from '../../../../ui';
import {styles} from './styles';

export const AutoBuyList: React.FC = () => {
  const navigation: any = useNavigation();

  return (
    <Screen>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View>
        <SubtitleMedium style={styles.description}>
          CyberMetals Auto Buy program allows you to make recurring purchases of
          digital metals in increments that fit your timeframe and budget.
        </SubtitleMedium>
        <TextButton
          title="Set Up Auto Buy"
          solid
          onPress={() => navigation.navigate(Screens.chooseProduct)}
        />
      </View>
      <Wrapper style={{backgroundColor: colors.paleBlue, marginTop: 44}} />
      <View style={styles.activeSectionHeader}>
        <Subtitle style={styles.activeSectionTitle}>
          Active Auto Buy Transactions
        </Subtitle>
        <SubtitleMedium>
          View, edit, or cancel your existing Auto Buy transactions.
        </SubtitleMedium>
      </View>
      <View style={styles.activeList}>
        <Subtitle style={{marginTop: 100, textAlign: 'center'}}>Empty</Subtitle>
      </View>
    </Screen>
  );
};
