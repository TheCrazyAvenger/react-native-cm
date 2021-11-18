import React from 'react';
import {Image, View} from 'react-native';
import {ViewMoreButton, Wrapper} from '..';
import {colors} from '../../constants';
import {activity} from '../../utilities';
import {Description, SubtitleMedium, TitleMedium} from '../Typography';
import {styles} from './styles';

export const ActivityCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <TitleMedium style={{marginBottom: 20}}>Recent Activity</TitleMedium>
      {activity.map((item, i) => {
        const {type, date, color, usd, image} = item;
        return (
          <React.Fragment key={i}>
            <View style={styles.cardItem}>
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
          </React.Fragment>
        );
      })}
      <ViewMoreButton onPress={() => console.log(1)} />
    </View>
  );
};
