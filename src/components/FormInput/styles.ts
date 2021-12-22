import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 45,
    position: 'relative',
    borderColor: colors.placeholder,
  },
  errorInput: {
    borderColor: colors.red,
  },
  inputStyle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    fontWeight: '400',
  },
  labelStyle: {
    fontFamily: 'OpenSans-Regular',
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '400',
    color: colors.gray,
  },
  errorLabel: {
    color: colors.red,
  },
  error: {
    marginTop: -15,
    marginBottom: 16,
    marginLeft: 10,
  },
  leftPrefix: {
    position: 'absolute',

    left: 20,
  },
});
