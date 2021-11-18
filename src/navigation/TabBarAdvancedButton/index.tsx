import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../constants';
import {styles} from './styles';

type TabBgProps = {
  color: string;
  style: {[key: string]: string | number};
};

type ButtonProps = {
  onPress: () => void;
};

const TabBg: React.FC<TabBgProps> = ({color, style}) => {
  return (
    <Svg width={100} height={72} viewBox="0 0 75 61" style={style}>
      <Path
        d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
        fill={color}
      />
    </Svg>
  );
};

export const TabBarAdvancedButton: React.FC<ButtonProps> = ({onPress}) => {
  return (
    <View style={styles.buttonContainer} pointerEvents="box-none">
      <TabBg color={colors.white} style={styles.background} />

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={onPress}>
        <Image source={require('../../assets/images/navigation/switch.png')} />
      </TouchableOpacity>
    </View>
  );
};
