import React from 'react';
import {View} from 'react-native';
import {ImageInput, ImageInputListProps} from '..';
import {styles} from './styles';

export const ImageInputList: React.FC<ImageInputListProps> = ({
  uris,
  onAdd,
  onRemove,
}) => {
  return (
    <View style={styles.imagesList}>
      {uris.map(uri => (
        <View key={uri}>
          <ImageInput uri={uri} onChange={() => onRemove(uri)} />
        </View>
      ))}
      <ImageInput onChange={(uri: string) => onAdd(uri)} />
    </View>
  );
};
