import React, {useState} from 'react';
import LottieView from 'lottie-react-native';
import {colors} from '../../constants';

export const LoadingItem: React.FC = () => {
  return (
    <LottieView
      source={require('../../assets/images/loading.json')}
      style={{
        backgroundColor: colors.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      autoPlay
      loop
    />
  );
};
