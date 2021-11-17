import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    alignItems: 'flex-end',
    marginTop: 20,
    marginRight: 20,
  },
  skipText: {
    fontFamily: 'Open-Sans-Semibold',
    color: colors.white,
    fontSize: 15,
  },
  logo: {
    position: 'absolute',
    left: 36,
    top: 40,
  },
  linearGradient: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 25,
    backgroundColor: colors.white,
    width: '100%',
  },
  nextButton: {
    marginTop: 20,
  },
});
