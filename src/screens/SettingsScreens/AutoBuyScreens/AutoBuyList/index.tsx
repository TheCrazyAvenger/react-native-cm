import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {AutoBuyItem, Wrapper} from '../../../../components';
import {Subtitle, SubtitleMedium} from '../../../../components/Typography';
import {colors, Screens} from '../../../../constants';
import {useAppSelector} from '../../../../hooks/hooks';

import {Screen, TextButton} from '../../../../ui';
import {styles} from './styles';

export const AutoBuyList: React.FC = () => {
  const navigation: any = useNavigation();

  const autoBuy = useAppSelector(state => state.autoBuy.autoBuy);

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

      {autoBuy ? (
        <View style={{marginBottom: 20}}>
          {autoBuy.map((item: any) => (
            <AutoBuyItem
              key={item.id}
              id={item.id}
              metal={item.metal}
              amount={item.amount}
              frequency={item.frequency}
              endDate={item.endDate}
              startDate={item.startDate}
              paymentMethod={item.paymentMethod}
            />
          ))}
        </View>
      ) : (
        <View style={styles.activeList}>
          <Subtitle style={{marginTop: 100, textAlign: 'center'}}>
            Empty
          </Subtitle>
        </View>
      )}
    </Screen>
  );
};
