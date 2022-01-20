import {MaterialTopTabBar} from '@react-navigation/material-top-tabs';
import {TitleMedium} from '@Typography';
import {metals} from '@utilities';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {styles} from './styles';

export const HoldingsHeader: React.FC<{
  props: any;
  setIndex: (...args: any) => void;
  index: number;
}> = ({props, setIndex, index}) => {
  useEffect(() => {
    setIndex(props.navigationState.index);
  }, [props]);

  return (
    <View>
      <View
        style={{
          backgroundColor: metals[index].color,
          alignItems: 'center',
        }}>
        <TitleMedium style={styles.title}>Holdings</TitleMedium>
      </View>
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
