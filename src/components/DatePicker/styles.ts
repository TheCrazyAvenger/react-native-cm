import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  dateTitle: {
    color: colors.gray,
    marginBottom: 6,
  },
  date: {
    padding: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.placeholder,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  error: {
    position: 'absolute',
    left: 10,
    top: 81,
  },
});
