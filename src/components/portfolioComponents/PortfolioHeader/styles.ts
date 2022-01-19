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
});
