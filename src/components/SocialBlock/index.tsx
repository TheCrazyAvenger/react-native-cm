import React from 'react';
import {View} from 'react-native';
import {SocialBlockProps} from '..';
import {SocialButton} from '../../ui';
import {Subtitle} from '../Typography';
import {styles} from './styles';

export const SocialBlock: React.FC<SocialBlockProps> = ({style}) => {
  return (
    <View style={{...styles.social, ...style}}>
      <Subtitle>Or Login with</Subtitle>
      <View style={styles.socialButtons}>
        <SocialButton
          imageUri={require('../../assets/images/socials/jmbullion.png')}
          onPress={() => console.log('jmbullion')}
          borderColor="#25679E"
        />
        <SocialButton
          imageUri={require('../../assets/images/socials/silvercom.png')}
          onPress={() => console.log('silvercom')}
          borderColor="#25679E"
        />
        <SocialButton
          imageUri={require('../../assets/images/socials/provident.png')}
          onPress={() => console.log('provident')}
          borderColor="#25679E"
        />
      </View>
    </View>
  );
};
