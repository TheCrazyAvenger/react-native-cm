import React from 'react';
import {Image, useWindowDimensions, View} from 'react-native';
import {OnboardingItemProps} from '..';
import {colors} from '../../constants';
import {Description, Title} from '../Typography';
import {styles} from './styles';

export const OnboardingItem: React.FC<OnboardingItemProps> = ({item}) => {
  const {width, height} = useWindowDimensions();
  const imageHeight = (65 / 100) * height;

  return (
    <View style={[styles.container, {width}]}>
      <View>
        <Title style={{color: colors.white, marginVertical: 10}}>
          {item.title}
        </Title>
        <Description style={{color: colors.white}}>
          {item.description}
        </Description>
      </View>
      <View style={styles.imageItem}>
        <Image source={item.image} style={[{width, height: imageHeight}]} />
      </View>
    </View>
  );
};
