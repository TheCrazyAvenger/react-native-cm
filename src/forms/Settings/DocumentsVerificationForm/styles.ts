import {StyleSheet} from 'react-native';
import {colors} from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 33,
  },
  labelStyle: {
    marginLeft: 0,
  },
  imagePicker: {
    borderWidth: 1,
    paddingTop: 20,

    borderStyle: 'dashed',
    paddingBottom: 58,
  },
  error: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 50,
  },
});
