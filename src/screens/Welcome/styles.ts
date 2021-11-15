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
    flex: 0.85,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 5,
    flex: 0.15,
    paddingHorizontal: 36,
  },
  nextButton: {
    marginTop: 20,
  },
});
