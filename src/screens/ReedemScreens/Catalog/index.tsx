import {EmptyDataScreen, LoadingItem, ReedemItem} from '@components';
import {useAppDispatch, useAppSelector} from '@hooks';
import {getReedem} from '@store/actions/reedem';
import {Screen} from '@ui';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from './styles';

export const Catalog: React.FC = () => {
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

  return (
    <Screen type="View">
      <View style={{marginTop: 15}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.catalogList}>
            {reedem.length !== 0 ? (
              reedem.map((item: any, i: number) => (
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
