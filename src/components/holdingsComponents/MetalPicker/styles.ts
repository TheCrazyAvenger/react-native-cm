import {StyleSheet} from 'react-native';
import {colors} from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  title: {
    color: colors.white,
    marginHorizontal: 2,
  },
  marked: {
    width: '100%',
    height: 3,
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: -5,
    borderRadius: 19,
  },
});
