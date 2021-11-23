import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, ScrollView, StatusBar, View} from 'react-native';
import {ShareRefer} from '../../../assets/images/settings';
import {Description, Subtitle} from '../../../components/Typography';
import {Screen, TextButton} from '../../../ui';
import {styles} from './styles';

export const Refer: React.FC = () => {
  const navigation: any = useNavigation();

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
            <Subtitle style={styles.title}>Share with your friends</Subtitle>
            <Description style={styles.description}>
              When you introduce a friend to CyberMetals, they will instatntly
              get $5.00 upon creating a new account.
            </Description>
            <Description style={styles.description}>
              If your friend makes purchase over $100 or more, you will get
              $5.00 in return. And your friend receives another $5.00 to spend
              on their next visit.
            </Description>
          </View>
        </ScrollView>
        <TextButton
          title="Share"
          style={{marginBottom: 25}}
          solid
          onPress={() => console.log('Share')}
        />
      </View>
    </Screen>
  );
};
