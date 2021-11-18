import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(47, 128, 237, 0.3)',
    marginBottom: 100,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  type: {
    color: colors.gray,
    marginBottom: 8,
  },
});
