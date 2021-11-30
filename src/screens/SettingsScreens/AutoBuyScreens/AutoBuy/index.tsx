import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import {
  AutoBuyItem,
  EmptyDataScreen,
  LoadingItem,
  Wrapper,
} from '../../../../components';
import {Subtitle, SubtitleMedium} from '../../../../components/Typography';
import {colors, Screens} from '../../../../constants';
import {useAppDispatch, useAppSelector} from '../../../../hooks/hooks';
import {getAutoBuy} from '../../../../store/actions/autoBuy';
import {setLoading} from '../../../../store/slices/authSlice';
import {Screen, TextButton} from '../../../../ui';
import {styles} from './styles';
import database from '@react-native-firebase/database';
import {deleteAutoBuy} from '../../../../store/slices/autoBuySlice';

export const AutoBuy: React.FC = () => {
  const navigation: any = useNavigation();

  const dispatch = useAppDispatch();

  const autoBuy = useAppSelector(state => state.autoBuy.autoBuy);
  const loading = useAppSelector(state => state.auth.loading);
  const token = useAppSelector(state => state.auth.token);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    dispatch(setLoading(true));
    await dispatch(getAutoBuy());
    dispatch(setLoading(false));
  };

  const removeItem = async (id: number) => {
    await database().ref(`/users/${token}/autoBuy/${id}`).remove();
    await dispatch(deleteAutoBuy(id));
  };

  if (loading) {
    return <LoadingItem />;
  }

  if (autoBuy.length === 0) {
    return (
      <EmptyDataScreen
        title="Set up Auto Buy Now"
        text="CyberMetals Auto Buy program allows you to make recurring
              purchases of digital metals in increments that fit your timeframe
              and budget."
        buttonTitle="Add New"
        onPress={() => navigation.navigate(Screens.chooseProduct)}
      />
    );
  }

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

      {autoBuy && (
        <View style={{marginBottom: 20}}>
          {autoBuy.map(
            (item: any) =>
              item !== null && (
                <AutoBuyItem
                  key={item.id}
                  id={item.id}
                  metal={item.metal}
                  amount={item.amount}
                  frequency={item.frequency}
                  endDate={item.endDate}
                  startDate={item.startDate}
                  paymentMethod={item.paymentMethod}
                  onRemove={removeItem}
                />
              ),
          )}
        </View>
      )}
    </Screen>
  );
};
