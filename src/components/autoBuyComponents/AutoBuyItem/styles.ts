import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(47, 128, 237, 0.3)',
  },
  cardHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    top: 20,
  },
  topBorders: {
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
  },
  bottomBorders: {
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
  },
  cardItem: {
    marginRight: 40,
    marginBottom: 20,
  },
  cardTitle: {
    color: colors.gray,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tooltip: {
    height: 'auto',
    elevation: 3,
    padding: 12,
  },
});
