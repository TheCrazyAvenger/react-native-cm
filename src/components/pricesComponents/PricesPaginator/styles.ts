import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
  },
  step: {
    height: 9,
    width: 9,
    marginHorizontal: 2.5,
    borderRadius: 50,
    borderColor: colors.primary,
    borderWidth: 0.5,
  },
});
