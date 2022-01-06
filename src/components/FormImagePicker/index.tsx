import {useFormikContext} from 'formik';
import React from 'react';
import {View} from 'react-native';
import {FormImagePickerProps, ImageInputList} from '@components';

export const FormImagePicker: React.FC<FormImagePickerProps> = ({name}) => {
  const {setFieldValue, values}: any = useFormikContext();

  const uris = values[name];

  const addHandler = (uri: string) => {
    setFieldValue(name, [...uris, uri]);
  };

  const removeHandler = (uri: string) => {
    setFieldValue(
      name,
      uris.filter((currentUri: string) => currentUri !== uri),
    );
  };

  return (
    <View>
      <ImageInputList uris={uris} onAdd={addHandler} onRemove={removeHandler} />
    </View>
  );
};
