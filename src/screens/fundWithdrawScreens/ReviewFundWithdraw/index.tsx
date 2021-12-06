import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {FundWithdrawInfo, LoadingItem} from '@components';
import {Description, Subtitle, SubtitleMedium, TitleMedium} from '@Typography';
import {useAppDispatch, useAppSelector} from '@hooks';
import {Screen, TextButton} from '@ui';
import {styles} from './styles';
import {getMonth, getPaymentName, numberWithCommas} from '@utilities';
import {setLoading, updateCash} from '@store/slices/authSlice';
import database from '@react-native-firebase/database';
import {addOperation} from '@store/slices/operationsSlice';
import {Screens} from '@constants';

export const ReviewFundWithdraw: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const loading = useAppSelector(state => state.auth.loading);
  const cashBalance = useAppSelector(state => state.auth.cashBalance);
  const token = useAppSelector(state => state.auth.token);

  const dispatch = useAppDispatch();

  const {paymentMethod, amount} = route.params;
  const {type} = route.params;

  const fundWithDraw = async () => {
    try {
      const date = new Date();
      const month = getMonth(date.getMonth());
      const day = date.getDate();
      const year = date.getFullYear();

      const id = `${Math.round(Math.random() * 1000000)}_${
        type === 'Fund' ? 'fund' : 'withdraw'
      }`;

      const data = {
        type: `${type === 'Fund' ? 'Fund' : 'Withdraw'} Cash`,
        date: `${month} ${day}, ${year}`,
        usd: `${type === 'Fund' ? '+' : '-'} $${amount}`,
        image: `${type === 'Fund' ? 'fund' : 'withdraw'}`,
        id,
      };

      dispatch(setLoading(true));

      await database().ref(`/users/${token}/operations/${id}`).set(data);

      await dispatch(addOperation(data));

      const newCashValue =
        type === 'Fund'
          ? cashBalance + +amount
          : cashBalance - (+amount - +amount * 0.1);

      await database()
        .ref(`/users/${token}`)
        .update({cashBalance: newCashValue});
      await dispatch(updateCash(newCashValue));

      await dispatch(setLoading(false));

      navigation.push(Screens.completeFundWithdraw, {
        type: 'Success',
        amount,
        paymentMethod,
        operationType: type === 'Fund' ? 'Fund' : 'Withdraw',
      });
    } catch (e) {
      await dispatch(setLoading(false));
      navigation.push(Screens.completeFundWithdraw, {
        type: 'Error',
        amount,
        paymentMethod,
        operationType: type === 'Fund' ? 'Fund' : 'Withdraw',
      });
      console.log(e);
    }
  };

  if (loading) {
    return <LoadingItem />;
  }

  return (
    <Screen>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />

      <View style={styles.container}>
        <TitleMedium style={styles.title}>
          You are {type === 'Fund' ? 'Funding' : 'Withdrawing'}
        </TitleMedium>

        <FundWithdrawInfo
          style={{marginHorizontal: 0}}
          type={type}
          amount={amount}
          method={getPaymentName(paymentMethod)}
        />

        <View style={styles.price}>
          <TitleMedium style={styles.priceTitle}>Total</TitleMedium>
          <TitleMedium style={styles.priceTitle}>{`$${numberWithCommas(
            Number(amount).toFixed(2),
          )}`}</TitleMedium>
        </View>

        {paymentMethod === 'bankWire' && type === 'Fund' && (
          <SubtitleMedium style={styles.bankWarning}>
            Your deposit is payable by bank wire. You will be presented with our
            wiring instructions upon completing your transaction. Payment must
            be received within one business day of submission.
          </SubtitleMedium>
        )}

        {type === 'Withdraw' && (
          <SubtitleMedium style={styles.bankWarning}>
            Please note, if you fund your account with ACH/eCheck and
            subsequently withdraw funds within 45 days, those funds will be
            returned to your originating bank account regardless of your
            selected withdrawal method.
          </SubtitleMedium>
        )}

        <View>
          <TextButton
            solid
            style={{marginBottom: 20}}
            title={`Confirm ${type === 'Fund' ? 'Deposit' : 'Withdraw'}`}
            onPress={fundWithDraw}
          />
          <TextButton
            title="Cancel"
            style={{marginBottom: 5}}
            onPress={() => navigation.pop(2)}
          />
        </View>
      </View>
    </Screen>
  );
};
