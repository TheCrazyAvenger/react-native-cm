import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import {EmptyDataScreen, LoadingItem, PaymentMethodsItem} from '@components';
import {Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {setLoading} from '@store/slices/authSlice';
import {Screen, TextButton} from '@ui';
import database from '@react-native-firebase/database';
import {getPaymentMethod} from '@store/actions/paymentMethod';
import {deletePaymentMethods} from '@store/slices/paymentMethodsSlice';

export const PaymentMethods: React.FC = () => {
  const navigation: any = useNavigation();

  const dispatch = useAppDispatch();

  const paymentMethods = useAppSelector(
    state => state.paymentMethod.paymentMethods,
  );
  const loading = useAppSelector(state => state.auth.loading);
  const token = useAppSelector(state => state.auth.token);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    dispatch(setLoading(true));
    await dispatch(getPaymentMethod());
    dispatch(setLoading(false));
  };

  const removeItem = async (type: string, id: number) => {
    await database()
      .ref(`/users/${token}/paymentMethods/${type}/${id}`)
      .remove();
    await dispatch(deletePaymentMethods({paymentMethod: type, id}));
  };

  if (loading) {
    return <LoadingItem />;
  }

  if (paymentMethods.length === 0) {
    return (
      <EmptyDataScreen
        title="No Payment Methods Available"
        text="CyberMetals accepts ACH/eChecks, Credit/Debit Cards, Bank Wire, Cryptos and more. You can even connect your bank account to enjoy the ease of quick payments."
        buttonTitle="Add New Payment Method"
        onPress={() => navigation.navigate(Screens.paymentMethodsSetUp)}
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

      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 25}}>
        {paymentMethods && (
          <View style={{marginBottom: 20}}>
            {[...Object.values(paymentMethods)].map((paymentMethod: any) =>
              paymentMethod.map(
                (item: any) =>
                  item !== null && (
                    <PaymentMethodsItem
                      key={item.id}
                      type={item.cardType ? item.cardType : 'Unknown'}
                      id={item.id}
                      expiring={
                        item.expirationDate ? item.expirationDate : null
                      }
                      label={item.label}
                      paymentMethod={item.paymentMethod}
                      cardNumber={item.cardNumber}
                      onRemove={removeItem}
                    />
                  ),
              ),
            )}
          </View>
        )}
      </ScrollView>

      <TextButton
        solid
        title="Add New Payment Method"
        style={{marginBottom: 25}}
        onPress={() => navigation.navigate(Screens.paymentMethodsSetUp)}
      />
    </Screen>
  );
};
