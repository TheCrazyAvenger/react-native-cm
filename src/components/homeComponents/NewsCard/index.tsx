import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {NewsCardProps, ViewMoreButton, Wrapper} from '../..';
import {colors, Screens} from '@constants';
import {Description, SubtitleMedium, TitleMedium} from '@Typography';
import {styles} from './styles';
import {getTime, removeTags} from '@utilities';
import {LoadingItem} from '@components';

export const NewsCard: React.FC<NewsCardProps> = ({data, isLoading, style}) => {
  const navigation: any = useNavigation();

  return (
    <View style={{...styles.container, ...style}}>
      <View style={{...styles.cardItem, marginBottom: 15}}>
        <TitleMedium>Market News</TitleMedium>
        {data.length !== 0 && data.length <= 4 && (
          <ViewMoreButton
            style={{marginTop: 0}}
            onPress={() => navigation.navigate(Screens.news)}
          />
        )}
      </View>

      {!isLoading ? (
        data.map((item: any, i: number) => {
          const {id, title, body, created_at, user_update} = item;

          const {monthName, day, year} = getTime(created_at);

          return (
            <View key={id}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigation.push(Screens.detailsNews, {
                    id,
                    body,
                    title,
                    date: created_at,
                  })
                }>
                <SubtitleMedium numberOfLines={2} style={{marginBottom: 8}}>
                  {title}
                </SubtitleMedium>
                <SubtitleMedium numberOfLines={2} style={styles.type}>
                  {removeTags(body)}
                </SubtitleMedium>
                <Description>
                  {`${user_update} · ${monthName} ${day}, ${year}`}
                </Description>
              </TouchableOpacity>
              {i !== data.length - 1 && (
                <Wrapper style={{backgroundColor: colors.primary}} />
              )}
            </View>
          );
        })
      ) : (
        <LoadingItem />
      )}
    </View>
  );
};
