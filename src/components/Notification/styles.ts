import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  notification: {
    position: 'absolute',
    top: 35,
    width: '100%',
    backgroundColor: '#ECF4FD',
    borderWidth: 1,
    borderColor: 'rgba(47, 128, 237, 0.3)',
    borderRadius: 5,
    zIndex: 100,
    padding: 16,
    paddingRight: 20,
  },
  closeIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
});
