import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingTop: 58,
  },
  mainTitle: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  changeGraph: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  pieInfo: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    top: -70,
    bottom: 0,
    right: 0,
  },
  emptyData: {
    marginTop: 20,
    backgroundColor: colors.primary,
    marginBottom: 70,
  },
  title: {
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
  },
  description: {
    marginTop: 20,
    textAlign: 'center',
    color: colors.gray,
    paddingHorizontal: 50,
  },
  tickLabels: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: colors.gray,
  },
  chartWrapper: {
    backgroundColor: colors.lightGray,
    marginTop: 0,
    marginHorizontal: 40,
    marginBottom: 12,
  },
});
