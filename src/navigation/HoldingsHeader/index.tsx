import {MaterialTopTabBar} from '@react-navigation/material-top-tabs';
import {TitleMedium} from '@Typography';
import {metals} from '@utilities';
import React, {useEffect} from 'react';
import {Animated, View} from 'react-native';
import {styles} from './styles';

export const HoldingsHeader: React.FC<{
  props: any;
  setIndex: (...args: any) => void;
  index: number;
}> = ({props, setIndex, index}) => {
  const animation = React.useRef(new Animated.Value(index)).current;
  useEffect(() => {
    setIndex(props.navigationState.index);

    Animated.timing(animation, {
      toValue: index,
      duration: 160,
      useNativeDriver: false,
    }).start();
  }, [props]);

  return (
    <View>
      <Animated.View
        style={{
          backgroundColor: animation.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: ['#FFBD00', '#2F80ED', '#219653', '#F2994A'],
          }),
          alignItems: 'center',
        }}>
        <TitleMedium style={styles.title}>Holdings</TitleMedium>
      </Animated.View>
      <MaterialTopTabBar {...props} />
      <View
        style={{
          backgroundColor: metals[props.navigationState.index].color,
        }}>
        <View style={styles.underLine} />
      </View>
    </View>
  );
};
