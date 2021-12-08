import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  EmptyDataScreen,
  OperationsPicker,
  TransactonItem,
  Wrapper,
} from '@components';
import {colors, Screens} from '@constants';
import {useAppSelector} from '@hooks';
import {Screen} from '@ui';
import {View} from 'react-native';
import {getTransactionName} from '@utilities';
import {TitleMedium} from '@Typography';
import {ShareRefer} from '@assets/images/settings';
import {styles} from './styles';

export const Transactions: React.FC = () => {
  const navigation: any = useNavigation();
  const operations = useAppSelector(state => state.operations.operations);

  const [operationType, setOperationType] = useState(0);

  if (operations.length === 0) {
    return (
      <EmptyDataScreen
        title="No Transactions History"
        text="Get started today to experience a new way to invest in precious metals."
        buttonTitle="Start Investing"
        onPress={() => navigation.navigate(Screens.sellBuyStack, {type: 'Buy'})}
      />
    );
  }

  const operationsList = operations.filter((item: any) => {
    if (operationType === 0) {
      return item;
    } else {
      return item.id.split('_')[1] === getTransactionName(operationType);
    }
  });

  return (
    <View style={{flex: 1}}>
      <OperationsPicker
        currentOperation={operationType}
        onPress={value => setOperationType(value)}
      />

      <Screen>
        {operationsList.length !== 0 ? (
          operationsList.map((item: any, i: number) => (
            <TransactonItem
              product={item.type}
              quantity={item.oz}
              total={item.usd}
              type={item.id}
              date={item.date}
              list={operationsList}
              id={i}
              onPress={() => console.log(1)}
            />
          ))
        ) : (
          <View style={styles.noAlerts}>
            <ShareRefer />
            <TitleMedium style={{fontFamily: 'OpenSans-Regular'}}>
              No Transactions
            </TitleMedium>
          </View>
        )}
      </Screen>
    </View>
  );
};
