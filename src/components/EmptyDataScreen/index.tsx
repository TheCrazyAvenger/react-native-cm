import React from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import {EmptyDataScreenProps} from '..';
import {ShareRefer} from '@assets/images/settings';
import {Description, Subtitle} from '@Typography';
import {Screen, TextButton} from '@ui';
import {styles} from './styles';

export const EmptyDataScreen: React.FC<EmptyDataScreenProps> = ({
  title,
  text,
  buttonTitle,
  descriptionStyle,
  style,
  titleStyle,
  onPress,
}) => {
  return (
    <Screen type="View">
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{...styles.header, ...style}}>
            <ShareRefer />
            {title && (
              <Subtitle style={{...styles.title, ...titleStyle}}>
                {title}
              </Subtitle>
            )}
            <Description style={{...styles.description, ...descriptionStyle}}>
              {text}
            </Description>
          </View>
        </ScrollView>
        {buttonTitle && onPress && (
          <TextButton
            title={buttonTitle}
            style={{marginBottom: 25}}
            solid
            onPress={onPress}
          />
        )}
      </View>
    </Screen>
  );
};
