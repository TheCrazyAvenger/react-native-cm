import {useRoute} from '@react-navigation/core';
import React from 'react';
import {TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {NewsCard} from '@components';
import {Screen} from '@ui';
import {styles} from './styles';
import RenderHtml from 'react-native-render-html';
import {Facebook, LinkedIn, Twitter} from '@assets/images/news';
import {tagStyles} from './tagStyles';

export const DetailsNews: React.FC = () => {
  const route: any = useRoute();

  const {body} = route.params;

  const {width} = useWindowDimensions();
  return (
    <Screen>
      <View style={styles.container}>
        <RenderHtml
          ignoredDomTags={['button']}
          contentWidth={width - 100}
          source={body}
          tagsStyles={tagStyles}
        />

        <View style={styles.socials}>
          <TouchableOpacity style={styles.social}>
            <Facebook />
          </TouchableOpacity>
          <TouchableOpacity style={styles.social}>
            <Twitter />
          </TouchableOpacity>
          <TouchableOpacity style={styles.social}>
            <LinkedIn />
          </TouchableOpacity>
        </View>
        <NewsCard />
      </View>
    </Screen>
  );
};
