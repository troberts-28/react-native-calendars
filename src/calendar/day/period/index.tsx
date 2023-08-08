import PropTypes from 'prop-types';
import React, {useCallback, useRef, useMemo} from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  View,
  ViewStyle,
  ViewProps,
  TextStyle,
  StyleProp
} from 'react-native';

import {xdateToData} from '../../../interface';
import {Theme, DayState, DateData} from '../../../types';
import styleConstructor from './style';
import Dot from '../dot';
import {MarkingProps} from '../marking';

export interface PeriodDayProps extends ViewProps {
  theme?: Theme;
  date?: string;
  marking?: MarkingProps;
  state?: DayState;
  onPress?: (date?: DateData) => void;
  onLongPress?: (date?: DateData) => void;
  accessibilityLabel?: string;
  testID?: string;
}

type MarkingStyle = {
  containerStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  startingDay?: ViewStyle;
  endingDay?: ViewStyle;
  day?: ViewStyle;
};

const PeriodDay = (props: PeriodDayProps) => {
  const {theme, marking = {}, date, onPress, onLongPress, state, accessibilityLabel, testID, children} = props;
  const dateData = date ? xdateToData(date) : undefined;
  const style = useRef(styleConstructor(theme));

  const markingStyle = useMemo(() => {
    const defaultStyle: MarkingStyle = {textStyle: {}, containerStyle: {}};

    if (!marking) {
      return defaultStyle;
    } else {
      if (marking.disabled) {
        defaultStyle.textStyle = {color: style.current.disabledText.color};
      } else if (marking.inactive) {
        defaultStyle.textStyle = {color: style.current.inactiveText.color};
      } else if (marking.selected && state !== 'today') {
        defaultStyle.textStyle = {color: style.current.periodSelectedDayTextColor.color};
      }

      if (marking.startingDay) {
        defaultStyle.startingDay = {backgroundColor: marking.color};
      }
      if (marking.endingDay) {
        defaultStyle.endingDay = {backgroundColor: marking.color};
      }
      if (!marking.startingDay && !marking.endingDay) {
        defaultStyle.day = {backgroundColor: marking.color};
      }

      if (marking.textColor) {
        defaultStyle.textStyle = {color: marking.textColor};
      }
      if (marking.customTextStyle) {
        defaultStyle.textStyle = marking.customTextStyle;
      }
      if (marking.customContainerStyle) {
        defaultStyle.containerStyle = marking.customContainerStyle;
      }

      return defaultStyle;
    }
  }, [marking]);

  const containerStyle = useMemo(() => {
    const containerStyle = [style.current.base];

    if (state === 'today') {
      containerStyle.push(style.current.today);
    }

    if (markingStyle?.containerStyle) {
      containerStyle.push(markingStyle.containerStyle);
    }
    return containerStyle;
  }, [marking, state]);

  const selectedDayStyle = useMemo(() => {
    const selectedDayStyle = [
      {position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, height: 36, width: 36}
    ] as any[];
    if (marking?.selected) {
      if (marking.color) {
        selectedDayStyle.push(style.current.periodSelectedDay);
      } else {
        selectedDayStyle.push(style.current.selectedDay);
      }
    }
    return selectedDayStyle;
  }, [marking]);

  const dotContainerStyle = useMemo(() => {
    const dotContainerStyle = [style.current.dotContainer];

    return dotContainerStyle;
  }, []);

  const textStyle = useMemo(() => {
    const textStyle = [style.current.text];

    if (state === 'disabled') {
      textStyle.push(style.current.disabledText);
    } else if (state === 'inactive') {
      textStyle.push(style.current.inactiveText);
    } else if (state === 'today') {
      textStyle.push(style.current.todayText);
    }

    if (markingStyle.textStyle) {
      textStyle.push(markingStyle.textStyle);
    }

    return textStyle;
  }, [marking, state]);

  const fillerStyle = useMemo(() => {
    const fillerStyle = [style.current.fillers];

    const start = markingStyle.startingDay;
    const end = markingStyle.endingDay;

    if (start && !end) {
      fillerStyle.push({backgroundColor: start.backgroundColor, borderBottomLeftRadius: 25, borderTopLeftRadius: 25});
    } else if (end && !start) {
      fillerStyle.push({backgroundColor: end.backgroundColor, borderBottomRightRadius: 25, borderTopRightRadius: 25});
    } else {
      fillerStyle.push({backgroundColor: markingStyle.day?.backgroundColor ?? 'transparent'});
    }

    return fillerStyle;
  }, [marking]);

  const _onPress = useCallback(() => {
    onPress?.(dateData);
  }, [onPress]);

  const _onLongPress = useCallback(() => {
    onLongPress?.(dateData);
  }, [onLongPress]);

  const Component = marking ? TouchableWithoutFeedback : TouchableOpacity;

  return (
    <Component
      testID={testID}
      onPress={_onPress}
      onLongPress={_onLongPress}
      disabled={marking?.disableTouchEvent}
      accessible
      accessibilityRole={marking?.disableTouchEvent ? undefined : 'button'}
      accessibilityLabel={accessibilityLabel}
    >
      <View style={style.current.wrapper}>
        {marking?.color ? <View style={fillerStyle} /> : null}
        <View style={containerStyle}>
          <View style={selectedDayStyle} />
          <Text allowFontScaling={false} style={textStyle}>
            {String(children)}
          </Text>
          <View style={dotContainerStyle}>
            {marking?.dots?.map((dot, index) => {
              if (index < 3) {
                return <Dot theme={theme} color={dot.color} marked />;
              }
            })}
          </View>
        </View>
      </View>
    </Component>
  );
};

export default PeriodDay;
PeriodDay.displayName = 'PeriodDay';
PeriodDay.propTypes = {
  state: PropTypes.oneOf(['selected', 'disabled', 'inactive', 'today', '']),
  marking: PropTypes.any,
  theme: PropTypes.object,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  date: PropTypes.string
};
