import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {TouchableOpacity} from 'react-native';
//@ts-ignore
import Svg, {Path} from 'react-native-svg';

export const GainsLossesArrow: React.FC<{fill: string}> = ({fill}) => {
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
      {/*
       // @ts-ignore */}
      <Svg width="8" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M3.558.183h-.001L.307 3.45a.625.625 0 0 0 .886.881L3.375 2.14v13.236a.625.625 0 1 0 1.25 0V2.139L6.807 4.33a.625.625 0 1 0 .886-.881L4.443.184a.626.626 0 0 0-.885 0Z"
          fill={fill}
        />
      </Svg>
    </TouchableOpacity>
  );
};
