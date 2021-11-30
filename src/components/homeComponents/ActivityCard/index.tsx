import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ViewMoreButton, Wrapper} from '../..';
import {colors} from '../../../constants';
import {activity} from '../../../utilities';
import {Description, SubtitleMedium, TitleMedium} from '../../Typography';
import {styles} from './styles';

export const ActivityCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <TitleMedium style={{marginBottom: 20}}>Recent Activity</TitleMedium>
      {activity.length !== 0 ? (
        activity.map((item, i) => {
          const {type, date, color, usd, Image, oz}: any = item;
          return (
            <React.Fragment key={i}>
              <TouchableOpacity activeOpacity={0.7} style={styles.cardItem}>
                <View style={styles.cardItem}>
                  <Image />
                  <View>
                    <SubtitleMedium style={styles.type}>{type}</SubtitleMedium>
                    <Description>{date}</Description>
                  </View>
                </View>
                <View>
                  <SubtitleMedium style={{...styles.type, color}}>
                    {usd}
                  </SubtitleMedium>
                  <Description>{oz ? oz : null}</Description>
                </View>
              </TouchableOpacity>
              {i === activity.length - 1 ? null : (
                <Wrapper style={{backgroundColor: colors.primary}} />
              )}
            </React.Fragment>
          );
        })
      ) : (
        <SubtitleMedium>Empty</SubtitleMedium>
      )}
      {activity.length !== 0 ? (
        <ViewMoreButton onPress={() => console.log(1)} />
      ) : null}
    </View>
  );
};
