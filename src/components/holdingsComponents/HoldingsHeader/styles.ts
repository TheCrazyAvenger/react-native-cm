import {StyleSheet} from 'react-native';
import {colors} from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingTop: 58,
    paddingHorizontal: 26,
  },
  title: {
    alignSelf: 'center',
    color: colors.white,
  },
  headerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  change: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  headerText: {
    color: colors.white,
  },
  profit: {
    color: colors.black,
    fontFamily: 'OpenSans-Bold',
    fontSize: 13,
  },
  balance: {
    color: colors.white,
    paddingVertical: 4,
    fontFamily: 'OpenSans-Bold',
  },
});
