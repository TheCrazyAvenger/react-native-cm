import React from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import {EmptyDataScreenProps} from '..';
import {ShareRefer} from '../../assets/images/settings';
import {Description, Subtitle} from '../../components/Typography';
import {Screen, TextButton} from '../../ui';
import {styles} from './styles';

export const EmptyDataScreen: React.FC<EmptyDataScreenProps> = ({
  title,
  text,
  buttonTitle,
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
        <ScrollView>
          <View style={styles.header}>
            <ShareRefer />
            <Subtitle style={styles.title}>{title}</Subtitle>
            <Description style={styles.description}>{text}</Description>
          </View>
        </ScrollView>
        <TextButton
          title={buttonTitle}
          style={{marginBottom: 25}}
          solid
          onPress={onPress}
        />
      </View>
    </Screen>
  );
};
