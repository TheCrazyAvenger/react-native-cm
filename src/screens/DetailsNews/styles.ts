import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginBottom: 100,
  },
  header: {
    marginBottom: 20,
  },
  date: {
    marginTop: 8,
    color: colors.gray,
  },
  socials: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 7,
  },
  social: {
    marginRight: 16,
  },
});
