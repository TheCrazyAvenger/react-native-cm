import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(47, 128, 237, 0.3)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontFamily: 'OpenSans-Bold',
  },
});
