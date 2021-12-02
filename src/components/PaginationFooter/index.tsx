import React from 'react';
import {View} from 'react-native';
import {PaginationFooterProps, Paginator} from '..';
import {TextButton} from '@ui';
import {styles} from './styles';

export const PaginationFooter: React.FC<PaginationFooterProps> = ({
  data,
  currentIndex,
  onPress,
  title,
  style,
}) => {
  return (
    <View style={{...styles.footer, ...style}}>
      {/* <Paginator data={data} currentIndex={currentIndex} /> */}
      <TextButton
        title={title}
        solid
        onPress={onPress}
        style={styles.nextButton}
      />
    </View>
  );
};
