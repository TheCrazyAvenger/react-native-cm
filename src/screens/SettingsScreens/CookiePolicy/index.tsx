import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Linking, StatusBar, TouchableOpacity, View} from 'react-native';
import {SubtitleMedium, TitleMedium} from '@Typography';
import {Screen} from '@ui';
import {cookieLinks} from '@utilities';
import {styles} from './styles';

export const CookiePolicy: React.FC = () => {
  const navigation: any = useNavigation();

  const openLink = (link: string) => {
    Linking.openURL(link);
  };

  return (
    <Screen>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.infoBlock}>
        <TitleMedium style={styles.title}>
          CyberMetals Cookie Policy
        </TitleMedium>
        <SubtitleMedium>
          The CyberMetals website, located at CyberMetals.com, and its related
          services, products, content and features, including the CyberMetals
          mobile application (collectively “Website”) is owned and operated by
          CyberMetals Corp. (“CyberMetals”, “CyberMetals.com,” “our,” “we” or
          “us”). Please take a moment to familiarize yourself with our Cookie
          Policy, and let us know if you have any questions by contacting us via
          email at{' '}
          <SubtitleMedium style={styles.linkText}>
            support@CyberMetals.com
          </SubtitleMedium>{' '}
          or by calling 855-903-3449.
        </SubtitleMedium>
      </View>

      <View style={styles.infoBlock}>
        <TitleMedium style={styles.title}>What is a cookie?</TitleMedium>
        <SubtitleMedium>
          A “cookie” is a string of information that a website stores on a
          user’s computer, and that the user’s browser provides to the website
          each time the user submits a query to the website. The purpose of a
          cookie is to support the functionality of the website, for example by
          keeping track of your visual preferences or controlling the frequency
          of “pop-up” windows, and identifying the user as a unique user of the
          website.
        </SubtitleMedium>
      </View>

      <View style={styles.infoBlock}>
        <TitleMedium style={styles.title}>Why do we use cookies?</TitleMedium>
        <SubtitleMedium>
          CyberMetals.com may use cookies to customize your experience on the
          Website to your interests, to ensure that you do not repeatedly see
          content or informational messages that may be of no interest to you,
          to store your password so you do not have to re-enter it each time you
          visit the Website, and to improve the performance and usefulness of
          our Website.
        </SubtitleMedium>
      </View>

      <View style={styles.infoBlock}>
        <TitleMedium style={styles.title}>
          What choices do you have?
        </TitleMedium>
        <SubtitleMedium>
          If you would prefer not to receive cookies, you may be able to alter
          your browser’s configuration to refuse cookies. These settings are
          usually found in the ‘options’ or ‘preferences’ menu of your browser.
          You should use the ‘Help’ option in your internet browser to learn the
          correct way to modify your cookies. Please note that you may not be
          able to receive certain services on our Website if you refuse a
          cookie. If you refuse cookies, you assume all responsibility for any
          resulting loss of functionality. Please note that CyberMetals.com
          ignores any and all “Do Not Track” requests and signals.
        </SubtitleMedium>
      </View>

      <View style={styles.infoBlock}>
        <SubtitleMedium>
          Below are instructions on how to choose your settings for the most
          popular browsers.
        </SubtitleMedium>
      </View>

      <View style={styles.infoBlock}>
        {cookieLinks.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.link}
            onPress={() => openLink(item.link)}>
            <View style={styles.dot} />
            <SubtitleMedium style={styles.linkText}>
              {item.title}
            </SubtitleMedium>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoBlock}>
        <SubtitleMedium>
          To find our more about cookies, visit
          <TouchableOpacity
            style={styles.link}
            onPress={() => openLink('http://www.allaboutcookies.org/')}>
            <SubtitleMedium style={styles.linkText}>
              http://www.allaboutcookies.org/.
            </SubtitleMedium>
          </TouchableOpacity>
        </SubtitleMedium>
      </View>
    </Screen>
  );
};
