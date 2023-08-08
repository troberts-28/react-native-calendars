import {StyleSheet} from 'react-native';
import * as defaultStyle from '../../../style';
import {Theme} from '../../../types';

export default function styleConstructor(theme: Theme = {}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    wrapper: {
      alignItems: 'center',
      alignSelf: 'stretch',
      marginLeft: -1,
      zIndex: 2
    },
    base: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      overflow: 'hidden',
      aspectRatio: 1,
      width: 34,
      height: 34
    },
    fillers: {
      position: 'absolute',
      flexDirection: 'row',
      top: -4,
      bottom: -4,
      left: 0,
      right: 0
    },
    text: {
      fontSize: appStyle.textDayFontSize,
      fontFamily: appStyle.textDayFontFamily,
      fontWeight: appStyle.textDayFontWeight,
      color: appStyle.dayTextColor,
      backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    dotContainer: {
      position: 'absolute',
      flexDirection: 'row',
      bottom: 3
    },
    today: {
      backgroundColor: appStyle.todayBackgroundColor
    },
    todayText: {
      fontFamily: 'Nunito-Bold',
      color: theme.todayTextColor || appStyle.dayTextColor
    },
    selectedDay: {
      backgroundColor: appStyle.selectedDayBackgroundColor
    },
    selectedText: {
      color: appStyle.selectedDayTextColor
    },
    periodSelectedDay: {
      backgroundColor: appStyle.periodSelectedDayBackgroundColor || appStyle.selectedDayTextColor
    },
    periodSelectedDayTextColor: {
      color: appStyle.periodSelectedDayTextColor
    },
    disabledText: {
      color: appStyle.textDisabledColor
    },
    inactiveText: {
      color: appStyle.textInactiveColor
    },
    ...(theme['stylesheet.day.period'] || {})
  });
}
