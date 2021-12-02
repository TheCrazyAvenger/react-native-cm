import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {EmptyDataScreen} from '@components';

export const Refer: React.FC = () => {
  const navigation: any = useNavigation();

  return (
    <EmptyDataScreen
      title="Share with your friends"
      text={`When you introduce a friend to CyberMetals, they will instatntly get $5.00 upon creating a new account.
      
      If your friend makes purchase over $100 or more, you will get $5.00 in return. And your friend receives another $5.00 to spend on their next visit.`}
      buttonTitle="Share"
      onPress={() => console.log('Share')}
    />
  );
};
