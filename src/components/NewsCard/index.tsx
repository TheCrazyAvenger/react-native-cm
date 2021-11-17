import React from 'react';
import {Image, View} from 'react-native';
import {ViewMoreButton, Wrapper} from '..';
import {colors} from '../../constants';
import {activity} from '../../utilities';
import {Description, SubtitleMedium, TitleMedium} from '../Typography';
import {styles} from './styles';

export const NewsCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={{...styles.cardItem, marginBottom: 20}}>
        <TitleMedium>Market News</TitleMedium>
        <ViewMoreButton style={{marginTop: 0}} onPress={() => console.log(1)} />
      </View>
      {activity.map((item, i) => {
        const {type, date, color, usd, image} = item;
        return (
          <>
            <View key={i} style={styles.cardItem}>
              <View style={styles.cardItem}>
                <Image style={{marginRight: 20}} source={image} />
                <View>
                  <SubtitleMedium style={styles.type}>{type}</SubtitleMedium>
                  <Description>{date}</Description>
                </View>
              </View>
              <View>
                <SubtitleMedium style={{...styles.type, color}}>
                  {usd}
                </SubtitleMedium>
                <Description>{item.oz ? item.oz : null}</Description>
              </View>
            </View>
            {i === activity.length - 1 ? null : (
              <Wrapper style={{backgroundColor: colors.primary}} />
            )}
          </>
        );
      })}
    </View>
  );
};
