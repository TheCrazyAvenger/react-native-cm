import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export const styles = StyleSheet.create({
  container: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(47, 128, 237, 0.3)',
    marginBottom: 12,
  },
  onSale: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  header: {
    marginTop: 20,
  },
  title: {
    color: colors.black,
    fontFamily: 'OpenSans-Bold',
    marginBottom: 20,
  },
  price: {
    alignItems: 'center',
    marginBottom: 8,
  },
  priceTitle: {
    fontFamily: 'OpenSans-Bold',
  },
  availability: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inStock: {
    color: 'green',
    marginLeft: 8,
  },
  presale: {
    marginLeft: 8,
  },
});
