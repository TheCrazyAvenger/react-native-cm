import {useNavigation} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {
  EmptyDataScreen,
  NumberPagination,
  OperationsPicker,
  TransactonItem,
} from '@components';
import {Screens} from '@constants';
import {useAppSelector} from '@hooks';
import {Screen} from '@ui';
import {View} from 'react-native';
import {getTransactionName} from '@utilities';
import {styles} from './styles';

export const Transactions: React.FC = () => {
  const navigation: any = useNavigation();
  const operations = useAppSelector(state => state.operations.operations);

  const [operationType, setOperationType] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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

  const operationsList = useMemo(
    () =>
      operations.filter((item: any) => {
        if (operationType === 0) {
          return item;
        } else {
          return item.type === getTransactionName(operationType);
        }
      }),
    [operations, operationType],
  );

  const currentOperationsData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return operationsList
      .filter((item: any) => item.type)
      .sort(
        (item: any, next: any) =>
          new Date(`${item.date}, ${item.time}`) <
          new Date(`${next.date}, ${next.time}`),
      )
      .slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize, operationType]);

  return (
    <View style={{flex: 1}}>
      <OperationsPicker
        currentOperation={operationType}
        onPress={value => {
          setOperationType(value);
          setCurrentPage(1);
        }}
      />

      <Screen>
        {operationsList.length !== 0 ? (
          <View>
            {currentOperationsData.map((item: any, i: number) => (
              <TransactonItem
                key={item.id}
                product={item.product}
                quantity={item.oz}
                total={item.total}
                type={item.type}
                account={item.account}
                cart={item.cart}
                shippingMethod={item.shippingMethod}
                oz={item.oz}
                paymentMethod={item.paymentMethod}
                spot={item.spot}
                time={item.time}
                order={item.order}
                date={item.date}
                localeDate={item.localeDate}
                list={operationsList}
                id={i}
                onPress={() => console.log(1)}
              />
            ))}
            <NumberPagination
              currentPage={currentPage}
              totalCount={operationsList.length}
              pageSize={pageSize}
              showView={true}
              onPageChange={page => setCurrentPage(page)}
              changeView={(view: number) => setPageSize(view)}
            />
          </View>
        ) : (
          <EmptyDataScreen
            title="No Transactions"
            titleStyle={styles.titleStyle}
          />
        )}
      </Screen>
    </View>
  );
};
