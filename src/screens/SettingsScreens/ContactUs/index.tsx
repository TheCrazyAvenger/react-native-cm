import {Mail, PhoneCall} from '@assets/images/settings';
import {LoadingItem, Wrapper} from '@components';
import {Subtitle, SubtitleMedium, TitleMedium} from '@Typography';
import {Screen} from '@ui';
import React, {useState} from 'react';
import {View} from 'react-native';
import {ContactUsForm} from '../../../forms';
import {styles} from './styles';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {colors} from '@constants';

export const ContactUs: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const navigation: any = useNavigation();

  const sendMessage = async (values: any) => {
    try {
      setLoading(true);
      setError(null);
      await database().ref('messages/').push(values);
      await setLoading(false);
      navigation.goBack();
    } catch (e: any) {
      console.log(e);
      setError(e);
      setLoading(false);
    }
  };

  return (
    <Screen style={{paddingHorizontal: 16}}>
      <View style={styles.header}>
        <SubtitleMedium>
          Whether you are looking for answers, would like to solve a problem or
          just want to let us know how we are doing, we would love to hear from
          you. Fill out the form below and a CyberMetals representative will
          reach out to you as soon as possible.
        </SubtitleMedium>
        <Wrapper style={styles.line} />
        <Subtitle style={styles.title}>Send us a Message</Subtitle>
        <SubtitleMedium>
          Most Contact Us inquiries will be replied to with 48 business hours.
          Alternatively, be sure to review our FAQ page to find instant answers
          to many commonly asked questions.
        </SubtitleMedium>
      </View>
      <ContactUsForm loading={loading} onSubmit={sendMessage} error={error} />

      <Wrapper style={styles.line} />
      <View style={styles.info}>
        <View style={styles.logo}>
          <PhoneCall />
        </View>
        <TitleMedium style={styles.infoTitle}>Call Us Toll Free</TitleMedium>
        <SubtitleMedium style={styles.infoText}>{`1-800-276-6508
Monday-Friday 8-6 CST`}</SubtitleMedium>
      </View>

      <View style={styles.info}>
        <View style={styles.logo}>
          <Mail />
        </View>
        <TitleMedium style={styles.infoTitle}>Corporate Address</TitleMedium>
        <SubtitleMedium style={styles.infoText}>{`11700 Preston Road Ste 660153
Dallas, Texas 75230`}</SubtitleMedium>
      </View>
    </Screen>
  );
};
