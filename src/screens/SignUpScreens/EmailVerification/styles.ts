import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  header: {
    marginTop: 112,
    marginBottom: 37,
    marginHorizontal: 10,
  },
  buttons: {
    marginVertical: 25,
  },
  notification: {
    position: 'absolute',
    top: 35,
    width: '100%',
    backgroundColor: '#ECF4FD',
    borderWidth: 1,
    borderColor: 'rgba(47, 128, 237, 0.3)',
    padding: 16,
  },
  closeIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  resendTimer: {
    marginBottom: 8,
    alignSelf: 'center',
    textAlign: 'center',
    paddingHorizontal: 65,
  },
});
