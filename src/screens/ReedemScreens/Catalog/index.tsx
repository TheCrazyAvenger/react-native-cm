import {LoadingItem, MetalPicker, ReedemItem, Wrapper} from '@components';
import {colors} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {getReedem} from '@store/actions/reedem';
import {setLoading} from '@store/slices/authSlice';
import {Screen} from '@ui';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from './styles';

export const Catalog: React.FC = () => {
  const [currentMetal, setCurrentMetal] = useState(0);
  const loading = useAppSelector(state => state.auth.loading);
  const reedem = useAppSelector(state => state.reedem.redeem);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      dispatch(setLoading(true));
      await dispatch(getReedem());
      dispatch(setLoading(false));
    } catch (e) {
      dispatch(setLoading(false));
      console.log(e);
    }
  };

  if (loading) {
    return <LoadingItem />;
  }

  return (
    <Screen type="View">
      <View style={{marginTop: 15}}>
        <MetalPicker
          currentMetal={currentMetal}
          onPress={id => setCurrentMetal(id)}
          colorfull
          markedColor={colors.primary}
          showAll={true}
        />
        <Wrapper style={{marginTop: 4, backgroundColor: colors.primary}} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.catalogList}>
            {reedem &&
              reedem.map((item: any, i: number) => (
                <ReedemItem
                  key={i}
                  image={item.product_image}
                  name={item.product_name}
                  price={item.product_price}
                  availability={item.product_availability}
                  onSale={item.on_sale}
                  date={item.presale_date}
                  onPress={() => console.log(1)}
                />
              ))}
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
};
