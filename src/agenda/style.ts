import {StyleSheet} from 'react-native';
import * as defaultStyle from '../style';
import platformStyles from './platform-style';
import {Theme} from '../types';

export default function styleConstructor(theme: Theme = {}) {
  const appStyle = {...defaultStyle, ...theme};
  const {knob, weekdays} = platformStyles(appStyle);

  return StyleSheet.create({
    container: {
      flex: 1,
      overflow: 'hidden'
    },
    animatedContainer: {
      flex: 1
    },
    knob,
    weekdays,
    header: {
      overflow: 'hidden',
      justifyContent: 'flex-end',
      position: 'absolute',
      height: '100%',
      width: '100%'
    },
    knobContainer: {
      flex: 1,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: 'center',
      backgroundColor: appStyle.calendarBackground,
      width: '100%',
      borderBottomWidth: 1,
      borderColor: '#D7D7D7'
    },
    dayHeader: {
      width: 32,
      textAlign: 'center',
      fontSize: appStyle.textDayHeaderFontSize,
      fontFamily: appStyle.textDayHeaderFontFamily,
      fontWeight: appStyle.textDayHeaderFontWeight,
      color: appStyle.textSectionTitleColor
    },
    reservations: {
      flex: 1,
      marginTop: 115.5,
      backgroundColor: appStyle.reservationsBackgroundColor || appStyle.backgroundColor //TODO: remove 2nd in V2
    },
    scrollPadStyle: {
      position: 'absolute',
      width: '100%',
      alignSelf: 'center'
    },
    ...(theme['stylesheet.agenda.main'] || {})
  });
}
