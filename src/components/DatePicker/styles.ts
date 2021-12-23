import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  dateTitle: {
    color: colors.gray,
    marginBottom: 6,
  },
  date: {
    height: 45,
    padding: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.placeholder,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: 'OpenSans-Regular',
    marginBottom: 6,
    fontWeight: '400',
    color: colors.gray,
    fontSize: 14,
  },
  error: {
    marginLeft: 10,
    marginTop: 10,
  },
  errorInput: {
    borderColor: colors.red,
  },
  errorLabel: {
    color: colors.red,
  },
});
