import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';
import {
  AutoBuyItem,
  EmptyDataScreen,
  LoadingItem,
  Notification,
  Wrapper,
} from '@components';
import {Subtitle, SubtitleMedium} from '@Typography';
import {colors, Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {getAutoBuy} from '@store/actions/autoBuy';
import {setLoading} from '@store/slices/authSlice';
import {Screen, TextButton} from '@ui';
import {styles} from './styles';
import database from '@react-native-firebase/database';
import {deleteAutoBuy} from '@store/slices/autoBuySlice';

export const AutoBuy: React.FC = () => {
  const navigation: any = useNavigation();

  const dispatch = useAppDispatch();

  const autoBuy = useAppSelector(state => state.autoBuy.autoBuy);
  const token = useAppSelector(state => state.auth.token);

  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);
    await dispatch(getAutoBuy());
    setLoading(false);
  };

  const removeItem = async (id: number) => {
    try {
      setError(null);
      setLoading(true);
      await database().ref(`/users/${token}/autoBuy/${id}`).remove();
      await dispatch(deleteAutoBuy(id));

      setLoading(false);
      setModalVisible(true);
    } catch (e: any) {
      await setError(e);
      console.log(e);
      setLoading(false);
      setErrorModalVisible(true);
    }
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
    <>
      <Notification
        text="Auto Buy has been successfully canceled."
        visible={modalVisible}
        style={{top: 0}}
        onPress={() => setModalVisible(false)}
      />
      <Notification
        text={error}
        visible={errorModalVisible}
        buttonColor="white"
        style={{top: 0, backgroundColor: colors.red, borderColor: colors.red}}
        textStyle={{color: colors.white}}
        onPress={() => setErrorModalVisible(false)}
      />

      <Screen>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor={'transparent'}
        />

        <View>
          <SubtitleMedium style={styles.description}>
            CyberMetals Auto Buy program allows you to make recurring purchases
            of digital metals in increments that fit your timeframe and budget.
          </SubtitleMedium>
          <TextButton
            title="Set Up Auto Buy"
            solid
            onPress={() => navigation.navigate(Screens.chooseProduct)}
          />
        </View>
        <Wrapper style={{backgroundColor: colors.primary, marginTop: 44}} />
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
              (item: any, i: number) =>
                item !== null && (
                  <AutoBuyItem
                    key={item.id}
                    account={item.account}
                    status={item.status}
                    id={item.id}
                    usedAmount={item.usedAmount}
                    keyId={i}
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
    </>
  );
};
