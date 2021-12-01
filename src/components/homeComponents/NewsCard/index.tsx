import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {NewsCardProps, ViewMoreButton, Wrapper} from '../..';
import {colors, Screens} from '../../../constants';
import {useAppSelector} from '../../../hooks/hooks';
import {
  Description,
  DescriptionBold,
  SubtitleMedium,
  TitleMedium,
} from '../../Typography';
import {styles} from './styles';

export const NewsCard: React.FC<NewsCardProps> = ({size, style}) => {
  const navigation: any = useNavigation();

  const news = useAppSelector(state => state.news.news);
  const newsList = size === 'Full' ? news : news.slice(0, 4);

  const a = false;

  return (
    <View style={{...styles.container, ...style}}>
      {size === 'Full' ? null : (
        <View style={{...styles.cardItem, marginBottom: 15}}>
          <TitleMedium>Market News</TitleMedium>
          {newsList.length !== 0 && (
            <ViewMoreButton
              style={{marginTop: 0}}
              onPress={() => navigation.navigate(Screens.news)}
            />
          )}
        </View>
      )}
      {newsList.length !== 0 ? (
        newsList.map((item: any, i: number) => {
          const {name, description, date, metal, author} = item.title;
          const {body} = item;

          return (
            <View key={i}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.push(Screens.detailsNews, {body})}>
                <SubtitleMedium numberOfLines={2} style={{marginBottom: 8}}>
                  {name}
                </SubtitleMedium>
                <SubtitleMedium numberOfLines={2} style={styles.type}>
                  {description}
                </SubtitleMedium>
                <Description>
                  <DescriptionBold style={{color: colors.primary}}>
                    {metal}
                  </DescriptionBold>
                  {` · ${author} · ${date}`}
                </Description>
              </TouchableOpacity>
              {i === newsList.length - 1 ? null : (
                <Wrapper style={{backgroundColor: colors.primary}} />
              )}
            </View>
          );
        })
      ) : (
        <SubtitleMedium>Empty</SubtitleMedium>
      )}
    </View>
  );
};
