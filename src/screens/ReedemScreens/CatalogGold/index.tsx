import {EmptyDataScreen, LoadingItem, ReedemItem} from '@components';
import {useAppDispatch, useAppSelector} from '@hooks';
import {getReedem} from '@store/actions/reedem';
import {Screen} from '@ui';
import {metals} from '@utilities';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from './styles';

export const CatalogGold: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const reedem = useAppSelector(state => state.reedem.redeem);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      await dispatch(getReedem());
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  if (loading) {
    return <LoadingItem />;
  }

  const reedemList = reedem.filter(
    (item: any) => item.product_metal === metals[0].metal,
  );

  return (
    <Screen type="View">
      <View style={{marginTop: 15}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.catalogList}>
            {reedemList.length !== 0 ? (
              reedemList.map((item: any, i: number) => (
                <ReedemItem
                  key={i}
                  image={item.product_image}
                  name={item.product_name}
                  price={item.product_price}
                  availability={item.product_availability}
                  onSale={item.on_sale}
                  date={item.presale_date}
                />
              ))
            ) : (
              <EmptyDataScreen title="No data" />
            )}
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
};
