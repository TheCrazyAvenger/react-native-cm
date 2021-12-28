import React, {useMemo, useState} from 'react';
import {TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {
  Description,
  DescriptionBold,
  Subtitle,
  SubtitleMedium,
  TitleMedium,
} from '@Typography';
import {styles} from './styles';
import {colors} from '@constants';
import {
  getColor,
  getMetalsColor,
  getTimeLineDate,
  numberWithCommas,
  time,
  timelineData,
} from '@utilities';
import {useAppSelector} from '@hooks';
import {GainsLossesArrow} from '@assets/images/potfolio';
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryPie,
  VictoryPolarAxis,
} from 'victory-native';
import {ItemPicker, Wrapper} from '@components';
//@ts-ignore
import {Stop, LinearGradient, Defs} from 'react-native-svg';

export const PortfolioHeader: React.FC<{gainsLosses: number}> = ({
  gainsLosses,
}) => {
  const [graph, setGraph] = useState('pie');
  const ownedMetals = useAppSelector(state => state.auth.ownedMetals);
  const cashBalance = useAppSelector(state => state.auth.cashBalance);

  const [metalType, setMetalType] = useState('Overall');
  const [chartTime, setTime] = useState(1);

  const totalOwned = useMemo(
    () =>
      Object.values(ownedMetals).reduce(
        (sum: number, next: number) => sum + next,
        0,
      ),
    [ownedMetals],
  );

  const isEmpty = cashBalance === 0 && totalOwned === 0 ? true : false;

  const {width} = useWindowDimensions();

  const pieColors: any = [];

  const commonOwned = numberWithCommas(
    Number(
      Object.values(ownedMetals).reduce(
        (acc, next) => (acc += next * 1887),
        0,
      ) + cashBalance,
    ).toFixed(2),
  );

  const pieData: any = Object.keys(ownedMetals)
    .filter(value => ownedMetals[value] > 0)
    .map(value => {
      pieColors.push(getMetalsColor(value));
      return {
        y: ownedMetals[value] * 1887,
        x: ownedMetals,
        label: ' ',
      };
    });

  pieData.push({
    x: 'Cash Balance',
    y: cashBalance,
    label: ' ',
  });

  pieColors.push('black');

  const data = useMemo(() => {
    return timelineData[metalType][+chartTime].map(
      (item: number, i: number) => {
        const date =
          i % 2 === 0
            ? getTimeLineDate(
                new Date(),
                chartTime === 1
                  ? i
                  : chartTime === 2
                  ? i * 0.8
                  : chartTime === 3
                  ? i * 3.9
                  : chartTime === 4
                  ? i * 45.6
                  : i * 228,
                chartTime === 1 ? 'time' : chartTime === 5 ? 'year' : 'date',
              )
            : new Array(i + 1).join(' ');

        return {x: date, y: item};
      },
    );
  }, [metalType, chartTime]);

  return (
    <View style={styles.container}>
      <TitleMedium style={{alignSelf: 'center', marginBottom: 10}}>
        Portfolio
      </TitleMedium>
      <View style={styles.changeGraph}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setGraph('pie')}>
          <DescriptionBold
            style={{
              marginRight: 20,
              color: graph === 'pie' ? colors.primary : colors.black,
            }}>
            Breakdown
          </DescriptionBold>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setGraph('timeline')}>
          <DescriptionBold
            style={{
              color: graph === 'timeline' ? colors.primary : colors.black,
            }}>
            Timeline
          </DescriptionBold>
        </TouchableOpacity>
      </View>

      {graph === 'pie' ? (
        <View style={{paddingHorizontal: 26}}>
          {isEmpty ? (
            <View>
              <Subtitle style={styles.title}>Insufficient data</Subtitle>
              <Description style={{...styles.description}}>
                Top up your balance or make a purchase
              </Description>

              <Wrapper style={styles.emptyData} />
            </View>
          ) : (
            <View>
              <VictoryPie
                animate={{
                  duration: 1000,
                  onLoad: {duration: 1000},
                }}
                colorScale={pieColors}
                origin={{y: 160, x: width / 2.25}}
                innerRadius={130}
                data={pieData}
              />
              <View style={styles.pieInfo}>
                <TitleMedium style={{color: colors.primary}}>
                  $ {commonOwned} USD
                </TitleMedium>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Description style={{color: getColor(gainsLosses)}}>
                    {`${gainsLosses < 0 ? '-' : '+'}$${numberWithCommas(
                      Number(Math.abs(gainsLosses)).toFixed(2),
                    )} USD`}
                  </Description>
                  <View
                    style={{
                      marginLeft: 5,
                      transform: [
                        {rotate: gainsLosses >= 0 ? '0deg' : '180deg'},
                      ],
                    }}>
                    <GainsLossesArrow
                      fill={gainsLosses >= 0 ? 'green' : 'red'}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      ) : (
        <View style={{marginBottom: 100}}>
          <ItemPicker
            label="Metal"
            style={{marginBottom: -20}}
            containerStyle={{marginHorizontal: 16}}
            items={[
              {label: 'Overall', value: 'Overall'},
              {label: 'Gold', value: 'Gold'},
              {label: 'Silver', value: 'Silver'},
              {label: 'Platinum', value: 'Platinum'},
              {label: 'Palladium', value: 'Palladium'},
            ]}
            value={metalType}
            onChange={value => setMetalType(value)}
          />

          <VictoryChart
            width={width - 10}
            style={{
              parent: {
                marginLeft: 20,
              },
            }}
            animate={{
              duration: 1000,
              onLoad: {duration: 1000},
            }}>
            <Defs>
              <LinearGradient
                id="gradientStroke"
                x1="0%"
                y1="0%"
                x2="3%"
                y2="100%">
                <Stop offset="0%" stopColor="#2F80ED" />
                <Stop offset="55%" stopColor="#2F80ED" stopOpacity="0.7" />
                <Stop offset="67%" stopColor="#2F80ED" stopOpacity="0.5" />
                <Stop offset="85%" stopColor="#2F80ED" stopOpacity="0.3" />
                <Stop offset="100%" stopColor="#2F80ED" stopOpacity="0.1" />
              </LinearGradient>
            </Defs>
            <VictoryAxis
              dependentAxis
              style={{
                axis: {stroke: colors.white},
                tickLabels: styles.tickLabels,
              }}
              tickFormat={tick => `$${tick}`}
            />
            <VictoryAxis
              style={{
                axis: {stroke: colors.white},
                tickLabels: styles.tickLabels,
              }}
              tickFormat={tick => tick}
            />
            <VictoryArea
              data={data}
              style={{
                parent: {paddingLeft: 10},
                data: {fill: 'url(#gradientStroke)'},
              }}
            />
          </VictoryChart>
          <Wrapper style={styles.chartWrapper} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {time.map((item, i) => {
              const color =
                item.id === chartTime ? colors.primary : colors.black;
              const fontFamily =
                item.id === chartTime
                  ? 'OpenSans-SemiBold'
                  : 'OpenSans-Regular';
              return (
                <TouchableOpacity
                  key={i}
                  style={{marginHorizontal: 12}}
                  activeOpacity={0.7}
                  onPress={() => setTime(item.id)}>
                  <SubtitleMedium style={{color, fontFamily}}>
                    {item.time}
                  </SubtitleMedium>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};
