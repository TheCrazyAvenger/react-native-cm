import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginLeft: 20,

    justifyContent: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#6DA6F2',
    width: 140,
    height: 140,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    zIndex: 1,
    top: -10,
    right: -10,
  },
  imageName: {
    color: colors.primary,
    marginLeft: 20,
    marginBottom: 10,
  },
});
