import {StyleSheet} from 'react-native';
import {colors} from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingBottom: 20,
    paddingTop: 58,
    paddingHorizontal: 26,
  },
  headerItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  perfomance: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: colors.white,
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  profit: {
    color: colors.black,
    fontFamily: 'OpenSans-Bold',
    fontSize: 13,
  },
  headerText: {
    color: colors.white,
  },
  value: {
    color: colors.white,
    lineHeight: 18,
  },
});
