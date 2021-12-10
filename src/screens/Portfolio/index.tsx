import React, {useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';
import {LoadingItem, MetalsInfo, PortfolioHeader} from '@components';
import {Subtitle} from '@Typography';
import {Screen} from '@ui';
import {styles} from './styles';
import {useGetDigitalProductsQuery} from '@api';
import {useAppSelector} from '@hooks';
import {getGainsLosses, numberWithCommas} from '@utilities';

export const Portfolio: React.FC = () => {
  const cashBalance = useAppSelector(state => state.auth.cashBalance);
  const operations = useAppSelector(state => state.operations.operations);
  const ownedMetals = useAppSelector(state => state.auth.ownedMetals);
  const [gainsLosses, setGainsLosses] = useState(0);

  const {data = [], isLoading} =
    // @ts-ignore
    useGetDigitalProductsQuery();

  useEffect(() => {
    if (!isLoading && data !== []) {
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
