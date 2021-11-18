import {StyleSheet} from 'react-native';
import {colors} from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(47, 128, 237, 0.3)',
    borderRadius: 5,
    marginBottom: 16,
  },
  cardItem: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    marginBottom: 12,
  },
  price: {
    color: colors.primary,
    fontFamily: 'OpenSans-SemiBold',
  },
});
