import {StyleSheet} from 'react-native';
import {colors} from '../../../../constants';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    padding: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'rgba(47, 128, 237, 0.3)',
    borderRadius: 5,
  },

  title: {
    fontFamily: 'OpenSans-Regular',
    marginBottom: 20,
  },
  reviewItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  reviewInfo: {
    marginRight: 36,
    marginBottom: 20,
  },
});
