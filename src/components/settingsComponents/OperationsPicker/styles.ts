import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    backgroundColor: colors.white,
  },
  title: {
    marginHorizontal: 2,
    paddingBottom: 5,
  },
  marked: {
    width: '100%',
    height: 3,
    position: 'absolute',
    bottom: -0,
    borderRadius: 19,
  },
});
