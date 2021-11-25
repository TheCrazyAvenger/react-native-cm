import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {
  EmptyDataScreen,
  LoadingItem,
  MetalPicker,
  PriceAlertListItem,
  Wrapper,
} from '../../../../components';
import {colors, Screens} from '../../../../constants';
import {useAppDispatch, useAppSelector} from '../../../../hooks/hooks';
import {getPriceAlerts} from '../../../../store/actions/priceAlerts';
import {setLoading} from '../../../../store/slices/authSlice';
import {deletePriceAlerts} from '../../../../store/slices/priceAlertSlice';
import {Screen, TextButton} from '../../../../ui';
import {metals} from '../../../../utilities';
import database from '@react-native-firebase/database';

export const PriceAlerts: React.FC = () => {
  const navigation: any = useNavigation();
  const priceAlerts = useAppSelector(state => state.priceAlerts.priceAlerts);
  const loading = useAppSelector(state => state.auth.loading);
  const token = useAppSelector(state => state.auth.token);
  const [metalType, setMetalType] = useState(1);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    dispatch(setLoading(true));
    await dispatch(getPriceAlerts());
    dispatch(setLoading(false));
  };

  const removeItem = async (id: number) => {
    await database().ref(`/users/${token}/priceAlerts/${id}`).remove();
    await dispatch(deletePriceAlerts(id));
  };

  if (loading) {
    return <LoadingItem />;
  }

  if (priceAlerts.length === 0) {
    return (
      <EmptyDataScreen
        title="No Alerts For Now"
        text="Receive instant text notifications when prices go above or below
          your price targets."
        buttonTitle="Create Price Alert"
        onPress={() => navigation.navigate(Screens.choosePriceAlert)}
      />
    );
  }

  return (
    <Screen type="View">
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <MetalPicker
        colorfull={true}
        currentMetal={metalType}
        onPress={setMetalType}
      />
      <Wrapper
        style={{
          marginTop: 4,
          marginBottom: 24,
          backgroundColor: colors.primary,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {priceAlerts.map(
          (item: any) =>
            item !== null &&
            item.metal === metals[metalType - 1].metal && (
              <PriceAlertListItem
                key={item.id}
                metal={item.metal}
                backgroundColor={item.backgroundColor}
                condition={item.condition}
                date={item.date}
                time={item.time}
                id={item.id}
                color={item.color}
                value={item.value}
                onRemove={removeItem}
              />
            ),
        )}
      </ScrollView>
      <TextButton
        title="Create Price Alert"
        solid
        style={{marginBottom: 25}}
        onPress={() => navigation.navigate(Screens.choosePriceAlert)}
      />
    </Screen>
  );
};
