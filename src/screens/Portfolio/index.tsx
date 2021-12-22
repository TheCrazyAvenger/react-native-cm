import React, {useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';
import {
  EmptyDataScreen,
  LoadingItem,
  MetalsInfo,
  PortfolioHeader,
  Wrapper,
} from '@components';
import {Subtitle} from '@Typography';
import {Screen} from '@ui';
import {styles} from './styles';
import {useGetDigitalProductsQuery} from '@api';
import {useAppSelector} from '@hooks';
import {getGainsLosses, numberWithCommas} from '@utilities';
import {colors} from '@constants';

export const Portfolio: React.FC = () => {
  const cashBalance = useAppSelector(state => state.auth.cashBalance);
  const operations = useAppSelector(state => state.operations.operations);
  const ownedMetals = useAppSelector(state => state.auth.ownedMetals);
  const [gainsLosses, setGainsLosses] = useState(0);

  const {data = [], isLoading, error} =
    // @ts-ignore
    useGetDigitalProductsQuery();

  useEffect(() => {
    if (!isLoading && data !== [] && !error) {
      const {gainsLosses} = getGainsLosses(data, operations, ownedMetals);
      setGainsLosses(gainsLosses);
    }
  }, [data, operations]);

  if (isLoading) return <LoadingItem />;

  return (
    <Screen>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />

      <PortfolioHeader gainsLosses={gainsLosses} />
      <View style={{marginTop: -80}}>
        {data === [] || isLoading ? (
          <LoadingItem />
        ) : error ? (
          <View>
            <View style={styles.noData}>
              <EmptyDataScreen style={{marginTop: 20}} title="No data" />
            </View>
            <Wrapper style={{backgroundColor: colors.primary, marginTop: 0}} />
          </View>
        ) : (
          data.data.map((item: any) => (
            <MetalsInfo key={item.name} data={item} />
          ))
        )}
      </View>
      <View style={styles.cardItem}>
        <Subtitle style={styles.cardTitle}>Cash</Subtitle>
        <Subtitle style={styles.cardTitle}>{`$${numberWithCommas(
          Number(cashBalance).toFixed(2),
        )} USD`}</Subtitle>
      </View>
    </Screen>
  );
};
