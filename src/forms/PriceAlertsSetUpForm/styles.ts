import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  inputStyle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: colors.primary,
  },
  error: {
    position: 'absolute',
    left: '38%',
    top: 60,
  },
});
