import React from 'react';
import {View} from 'react-native';
import {PaginationFooter} from '../../components';
import {Description, Title} from '../../components/Typography';
import {SignUp} from '../../forms';
import {Screen} from '../../ui';
import {slides} from '../../utilities';
import {styles} from './styles';

export const Register: React.FC = () => {
  return (
    <Screen>
      <View style={styles.header}>
        <Title style={{marginBottom: 25}}>Introduce Yourself</Title>
        <Description>Please enter your legal first and last name.</Description>
      </View>
      <SignUp />
      <PaginationFooter
        data={slides}
        currentIndex={0}
        onPress={() => console.log('Continue')}
        title="Continue"
        style={styles.footer}
      />
    </Screen>
  );
};
