import React from 'react';
import {usePagination} from '@hooks';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {Subtitle, SubtitleMedium} from '@Typography';
import {NumberPaginationProps} from '@components';
import {LeftArrow, RightArrow} from '@assets/images/settings';
import {colors} from '@constants';

export const NumberPagination: React.FC<NumberPaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  style,
  changeView,
  showView = true,
}) => {
  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <View
      style={{
        ...styles.container,
        ...style,
        justifyContent: showView ? 'space-between' : 'flex-end',
      }}>
      {showView && (
        <View style={styles.paginationContainer}>
          <SubtitleMedium>View:</SubtitleMedium>
          <TouchableOpacity
            style={styles.viewDot}
            onPress={() => changeView(10)}>
            <SubtitleMedium
              style={{
                fontFamily:
                  pageSize === 10 ? 'OpenSans-SemiBold' : 'OpenSans-Regular',
                color: pageSize === 10 ? colors.primary : colors.black,
              }}>
              10
            </SubtitleMedium>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.viewDot}
            onPress={() => changeView(25)}>
            <SubtitleMedium
              style={{
                fontFamily:
                  pageSize === 25 ? 'OpenSans-SemiBold' : 'OpenSans-Regular',
                color: pageSize === 25 ? colors.primary : colors.black,
              }}>
              25
            </SubtitleMedium>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.viewDot}
            onPress={() => changeView(50)}>
            <SubtitleMedium
              style={{
                fontFamily:
                  pageSize === 50 ? 'OpenSans-SemiBold' : 'OpenSans-Regular',
                color: pageSize === 50 ? colors.primary : colors.black,
              }}>
              50
            </SubtitleMedium>
          </TouchableOpacity>
        </View>
      )}

      {currentPage === 0 || paginationRange.length < 2 ? (
        <View style={{marginBottom: 20}} />
      ) : (
        <View style={styles.paginationContainer}>
          <View>
            <TouchableOpacity
              style={{marginRight: 7}}
              onPress={onPrevious}
              disabled={currentPage === 1}>
              <LeftArrow />
            </TouchableOpacity>
          </View>
          {paginationRange.map((pageNumber: any, i: number) => {
            return (
              <TouchableOpacity
                key={i}
                style={styles.dot}
                onPress={() => onPageChange(pageNumber)}>
                <Subtitle
                  style={{
                    fontFamily:
                      pageNumber === currentPage
                        ? 'OpenSans-SemiBold'
                        : 'OpenSans-Regular',
                    color:
                      pageNumber === currentPage
                        ? colors.primary
                        : colors.black,
                  }}>
                  {pageNumber}
                </Subtitle>
              </TouchableOpacity>
            );
          })}

          <View>
            <TouchableOpacity
              style={{marginLeft: 7}}
              onPress={onNext}
              disabled={currentPage === lastPage}>
              <RightArrow />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
