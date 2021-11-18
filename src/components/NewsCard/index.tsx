import React from 'react';
import {Image, View} from 'react-native';
import {ViewMoreButton, Wrapper} from '..';
import {colors} from '../../constants';
import {activity, news} from '../../utilities';
import {
  Description,
  DescriptionBold,
  SubtitleMedium,
  TitleMedium,
} from '../Typography';
import {styles} from './styles';

export const NewsCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={{...styles.cardItem, marginBottom: 15}}>
        <TitleMedium>Market News</TitleMedium>
        <ViewMoreButton style={{marginTop: 0}} onPress={() => console.log(1)} />
      </View>
      {news.map((item, i) => {
        const {title, description, date, metal, author} = item;
        return (
          <React.Fragment key={i}>
            <View>
              <SubtitleMedium style={{marginBottom: 8}}>{title}</SubtitleMedium>
              <SubtitleMedium style={styles.type}>{description}</SubtitleMedium>
              <Description>
                <DescriptionBold style={{color: colors.primary}}>
                  {metal}
                </DescriptionBold>
                {` · ${author} · ${date}`}
              </Description>
            </View>
            {i === news.length - 1 ? null : (
              <Wrapper style={{backgroundColor: colors.primary}} />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};
