import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export const styles = StyleSheet.create({
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 14,
    marginHorizontal: 10,
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    fontWeight: '400',
    height: 45,
    position: 'relative',
    borderColor: colors.placeholder,
  },
  errorInput: {
    borderColor: colors.red,
  },
  labelStyle: {
    fontFamily: 'OpenSans-Regular',
    marginBottom: 6,
    fontSize: 14,
    marginLeft: 10,
    fontWeight: '400',
    color: colors.gray,
  },
  rightIcon: {
    position: 'absolute',
    right: 24,
    top: 18,
  },
  error: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: -10,
  },
});
