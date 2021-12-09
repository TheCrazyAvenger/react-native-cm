import {useRoute} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {LoadingItem, NewsCard} from '@components';
import {Screen} from '@ui';
import {styles} from './styles';
import RenderHtml from 'react-native-render-html';
import {Facebook, LinkedIn, Twitter} from '@assets/images/news';
import {tagStyles} from './tagStyles';
import {SubtitleMedium, Title} from '@Typography';
import {getTime, removeTags} from '@utilities';
import {useGetNewsByIdMutation, useGetNewsQuery} from '@api';
import {useAppDispatch, useAppSelector} from '@hooks';
import {setLoading} from '@store/slices/authSlice';
import Share from 'react-native-share';

export const DetailsNews: React.FC = () => {
  const route: any = useRoute();

  //@ts-ignore
  const {data: newsData = [], isLoading} = useGetNewsQuery();

  const {id} = route.params;

  const loading = useAppSelector(state => state.auth.loading);

  const dispatch = useAppDispatch();
  const {width} = useWindowDimensions();

  const [getNewsById, {data = [], error}] = useGetNewsByIdMutation();

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    try {
      dispatch(setLoading(true));
      await getNewsById(id);
      dispatch(setLoading(false));
    } catch (e) {
      console.log(e);
    }
  };

  if (loading && data.length === 0) {
    return <LoadingItem />;
  }

  const {hours, minutes, month, day, year} = getTime(data.created_at);

  const onShare = async (social: any) => {
    const shareOptions = {
      title: data.title,
      message: removeTags(data.body),
      url: data.uri,
      social: social,
    };

    //@ts-ignore
    Share.shareSingle(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  return (
    <Screen>
      <View style={styles.container}>
        {data.body && (
          <View style={styles.header}>
            <Title>{data.title}</Title>
            <SubtitleMedium style={styles.date}>
              {`${hours}:${minutes}, ${month}/${day}/${year}`}
            </SubtitleMedium>
          </View>
        )}

        <RenderHtml
          ignoredDomTags={['button']}
          contentWidth={width - 100}
          source={{
            html: data.body
              ? data.body
              : error
              ? //@ts-ignore
                error.data
              : '<p>Something went wrong</p>',
          }}
          tagsStyles={tagStyles}
        />

        {data.body && (
          <View style={styles.socials}>
            <TouchableOpacity
              onPress={() => onShare(Share.Social.FACEBOOK)}
              style={styles.social}>
              <Facebook />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onShare(Share.Social.TWITTER)}
              style={styles.social}>
              <Twitter />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onShare(Share.Social.EMAIL)}
              style={styles.social}>
              <LinkedIn />
            </TouchableOpacity>
          </View>
        )}
        <NewsCard
          style={{marginTop: data.body ? 0 : 40}}
          data={newsData}
          isLoading={isLoading}
        />
      </View>
    </Screen>
  );
};
