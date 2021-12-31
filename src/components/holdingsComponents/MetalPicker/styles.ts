import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  title: {
    marginHorizontal: 2,
  },
  marked: {
    width: '100%',
    height: 3,
    position: 'absolute',
    bottom: -5,
    borderRadius: 19,
  },
});
