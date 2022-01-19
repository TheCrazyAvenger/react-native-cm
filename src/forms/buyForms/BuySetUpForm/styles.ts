import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export const styles = StyleSheet.create({
  amount: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  price: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginHorizontal: 10,
  },
  priceTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 22,
  },
  inputLabel: {
    color: colors.gray,
    marginBottom: 6,
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    fontWeight: '400',
    marginHorizontal: 10,
  },
  errorLink: {
    color: colors.primary,
    fontFamily: 'OpenSans-SemiBold',
  },
});
