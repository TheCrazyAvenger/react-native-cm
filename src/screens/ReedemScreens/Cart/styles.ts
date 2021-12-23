import {StyleSheet} from 'react-native';
import {colors} from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    padding: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'rgba(47, 128, 237, 0.3)',
    borderRadius: 5,
  },
  mainTitle: {
    fontFamily: 'OpenSans-Regular',
    marginBottom: 15,
  },

  infoTitle: {
    color: colors.gray,
    marginBottom: 4,
  },
  infoPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontFamily: 'OpenSans-Bold',
    marginRight: 4,
  },
  tooltip: {
    height: 'auto',
    elevation: 3,
    padding: 12,
  },
  cart: {
    alignItems: 'center',
  },
  cartImage: {
    marginTop: 20,
    marginBottom: 14,
  },
  cartText: {
    color: colors.gray,
    marginBottom: 20,
  },

  error: {
    color: colors.red,
  },
  pickerLabel: {
    marginTop: 25,
    marginLeft: 0,
  },
  picker: {
    marginBottom: 0,
    marginHorizontal: 0,
    height: 70,
  },
  pickerPlaceholder: {
    fontFamily: 'OpenSans-SemiBold',
  },
  shippingText: {
    color: colors.primary,
    fontFamily: 'OpenSans-SemiBold',
  },
});
