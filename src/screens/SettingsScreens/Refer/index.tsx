import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {EmptyDataScreen} from '@components';
import {Alert, Share} from 'react-native';

export const Refer: React.FC = () => {
  const navigation: any = useNavigation();

  const shareApp = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <EmptyDataScreen
      title="Share with your friends"
      text={`When you introduce a friend to CyberMetals, they will instatntly get $5.00 upon creating a new account.
      
      If your friend makes purchase over $100 or more, you will get $5.00 in return. And your friend receives another $5.00 to spend on their next visit.`}
      buttonTitle="Share"
      onPress={shareApp}
    />
  );
};
