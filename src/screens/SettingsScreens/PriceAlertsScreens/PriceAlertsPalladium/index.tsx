import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {EmptyDataScreen, LoadingItem, PriceAlertListItem} from '@components';
import {Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {getPriceAlerts} from '@store/actions/priceAlerts';
import {deletePriceAlerts} from '@store/slices/priceAlertSlice';
import {Screen, TextButton} from '@ui';
import {getMetal, metals} from '@utilities';
import database from '@react-native-firebase/database';
import {useGetDigitalProductsQuery} from '@api';

export const PriceAlertsPalladium: React.FC = () => {
  const navigation: any = useNavigation();
  const priceAlerts = useAppSelector(state => state.priceAlerts.priceAlerts);
  const [loading, setLoading] = useState(false);
  const token = useAppSelector(state => state.auth.token);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      setLoading(true);
      await dispatch(getPriceAlerts());
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const removeItem = async (data: any) => {
    await database().ref(`/users/${token}/priceAlerts/${data.id}`).remove();
    await dispatch(deletePriceAlerts({metal: data.metal, id: data.id}));
  };

  //@ts-ignore
  const {data = [], isLoading, error} = useGetDigitalProductsQuery();

  if (loading || isLoading || data === []) {
    return <LoadingItem />;
  }

  return (
    <Screen style={{paddingTop: 20}} type="View">
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {priceAlerts.Palladium.length ? (
          priceAlerts.Palladium.map(
            (item: any) =>
              item !== null &&
              item.metal === metals[3].metal && (
                <PriceAlertListItem
                  key={item.id}
                  metal={item.metal}
                  backgroundColor={item.backgroundColor}
                  condition={item.condition}
                  date={item.date}
                  time={item.time}
                  id={item.id}
                  keyId={getMetal(item.metal) + 1}
                  error={error}
                  data={data.data}
                  color={item.color}
                  value={item.value}
                  onRemove={removeItem}
                />
              ),
          )
        ) : (
          <EmptyDataScreen title="No alerts" />
        )}
      </ScrollView>
      <TextButton
        title={error ? 'No data' : 'Create Price Alert'}
        solid
        disabled={error}
        style={{marginBottom: 25}}
        onPress={() =>
          navigation.navigate(Screens.priceAlertSetUp, {
            id: 4,
            data: data.data,
          })
        }
      />
    </Screen>
  );
};
