import React from 'react';
import {Image, Alert, View, TouchableOpacity} from 'react-native';
import {ImageInputProps} from '..';
import {styles} from './styles';
import ImagePicker from 'react-native-image-crop-picker';
import {Close, Plus} from '@assets/images/settings';
import {SubtitleMedium} from '@Typography';

export const ImageInput: React.FC<ImageInputProps> = ({uri, onChange}) => {
  const handleImage = () => {
    if (!uri) {
      openGalery();
    } else {
      Alert.alert('Delete', 'Are you sure you want to delete this image?', [
        {
          text: 'No',
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => onChange(null)},
      ]);
    }
  };

  const openGalery = () => {
    ImagePicker.openPicker({
      width: 150,
      height: 150,
      cropping: true,
    })
      .then(image => {
        onChange(image.path);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onChange(null)}
        style={styles.closeButton}>
        {uri ? <Close /> : null}
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={handleImage}>
        <View style={styles.container}>
          {uri ? <Image source={{uri}} style={styles.image} /> : <Plus />}
        </View>
      </TouchableOpacity>
      {uri ? (
        <View style={{maxWidth: 155}}>
          <SubtitleMedium style={styles.imageName}>
            {uri.split('/').splice(-1)[0]}
          </SubtitleMedium>
        </View>
      ) : (
        <Plus />
      )}
    </View>
  );
};
