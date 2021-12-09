import {StyleSheet} from 'react-native';
import {colors} from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    paddingBottom: 29.5,
  },
  menu: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 5,
  },
  bankWarning: {
    color: colors.gray,
    textAlign: 'justify',
  },
  title: {
    fontFamily: 'OpenSans-Regular',
    marginBottom: 20,
    width: '90%',
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  subPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 22,
  },
  subPriceTitle: {
    color: colors.gray,
  },
});
