import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import {
  EmptyDataScreen,
  LoadingItem,
  Notification,
  PaymentMethodsItem,
} from '@components';
import {Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {setLoading} from '@store/slices/authSlice';
import {Screen, TextButton} from '@ui';
import database from '@react-native-firebase/database';
import {getPaymentMethod} from '@store/actions/paymentMethod';
import {deletePaymentMethods} from '@store/slices/paymentMethodsSlice';

export const PaymentMethods: React.FC = () => {
  const navigation: any = useNavigation();
  const [removeModal, setRemoveModal] = useState(false);
  const [method, setMethod] = useState('');

  const dispatch = useAppDispatch();

  const paymentMethods = useAppSelector(
    state => state.paymentMethod.paymentMethods,
  );
  const loading = useAppSelector(state => state.auth.loading);
  const token = useAppSelector(state => state.auth.token);

  const isEmpty =
    paymentMethods.cashBalance.length === 0 &&
    paymentMethods.creditCard.length === 0 &&
    paymentMethods.bankWire.length === 0 &&
    paymentMethods.payPal.length === 0 &&
    paymentMethods.eCheck.length === 0
      ? true
      : false;

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    dispatch(setLoading(true));
    await dispatch(getPaymentMethod());
    dispatch(setLoading(false));
  };

  const removeItem = async (type: string, id: number) => {
    await database().ref(`/users/${token}/paymentMethods/${id}`).remove();

    await dispatch(deletePaymentMethods({paymentMethod: type, id}));
    await setMethod(
      type === 'creditCard'
        ? 'Credit Cart'
        : type === 'payPal'
        ? 'PayPal'
        : 'bank account',
    );

    setRemoveModal(true);
  };

  useEffect(() => {
    isEmpty && setRemoveModal(false);
  }, [isEmpty]);

  if (isEmpty) {
    return (
      <EmptyDataScreen
        title="No Payment Methods Available"
        text="CyberMetals accepts ACH/eChecks, Credit/Debit Cards, Bank Wire, Cryptos and more. You can even connect your bank account to enjoy the ease of quick payments."
        buttonTitle="Add New Payment Method"
        onPress={() => {
          setRemoveModal(false);
          navigation.navigate(Screens.paymentMethodsSetUp, {
            type: 'creditCard',
          });
        }}
      />
    );
  }

  return (
    <Screen type="View">
      <Notification
        text={`The linked ${method} has been successfully removed from your CyberMetals account.`}
        visible={removeModal}
        style={{top: 0, paddingRight: 70}}
        onPress={() => setRemoveModal(false)}
      />
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
                      fullName={item.fullName}
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
        onPress={() =>
          navigation.navigate(Screens.paymentMethodsSetUp, {
            type: 'creditCard',
          })
        }
      />
    </Screen>
  );
};
