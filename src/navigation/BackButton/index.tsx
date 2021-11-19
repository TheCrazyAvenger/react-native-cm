import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export const BackButton: React.FC = () => {
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
      <Svg
        width="12"
        height="22"
        viewBox="0 0 12 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.573 21.0247C10.217 21.0247 9.86 20.8888 9.588 20.6168L0.408 11.4368C0.147 11.1748 0 10.8208 0 10.4508C0 10.0808 0.147 9.72675 0.408 9.46475L9.465 0.40875C10.01 -0.13625 10.892 -0.13625 11.436 0.40875C11.981 0.95375 11.981 1.83675 11.436 2.37975L3.365 10.4508L11.559 18.6448C12.103 19.1898 12.103 20.0728 11.559 20.6168C11.287 20.8888 10.93 21.0247 10.573 21.0247Z"
          fill="#2F80ED"
        />
      </Svg>
    </TouchableOpacity>
  );
};
