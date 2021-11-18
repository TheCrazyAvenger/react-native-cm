import React from 'react';
import {View} from 'react-native';
import {ActionsCardProps} from '../..';
import {TextButton} from '../../../ui';
import {SubtitleMedium, TitleMedium} from '../../Typography';
import {styles} from './styles';

export const ActionsCard: React.FC<ActionsCardProps> = ({
  title,
  backgroundColor,
  description,
  buttonTitle,
  onPress,
}) => {
  return (
    <View style={{...styles.container, backgroundColor}}>
      <View style={{marginBottom: 18}}>
        <TitleMedium style={{textAlign: 'center'}}>{title}</TitleMedium>
        <SubtitleMedium style={{textAlign: 'center'}}>
          {description}
        </SubtitleMedium>
      </View>
      <TextButton solid title={buttonTitle} onPress={onPress} />
    </View>
  );
};
