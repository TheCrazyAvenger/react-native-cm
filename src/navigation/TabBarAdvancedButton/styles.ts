import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  buttonContainer: {
    position: 'relative',
    width: 75,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
  },
  button: {
    top: -25,
    justifyContent: 'center',
    alignItems: 'center',

    width: 60,
    height: 60,
    borderRadius: 50,
    // backgroundColor: colors.primary,
  },
});
