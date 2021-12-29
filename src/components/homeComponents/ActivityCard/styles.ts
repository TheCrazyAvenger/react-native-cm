import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(47, 128, 237, 0.3)',
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
  },
  type: {
    fontFamily: 'OpenSans-SemiBold',
    marginBottom: 4,
    maxWidth: '100%',
  },
});
