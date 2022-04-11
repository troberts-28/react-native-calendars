import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
// import {Text} from 'react-native';
import identity from 'lodash/identity';
import throttle from 'lodash/throttle';
import Context from '../expandableCalendar/Context';
import {UpdateSources} from '../expandableCalendar/commons';
import Timeline from '../timeline/Timeline';
import HorizontalList from './HorizontalList';
import useTimelinePages, {INITIAL_PAGE} from './useTimelinePages';
const TimelineList = props => {
  const {timelineProps, events} = props;
  const {date, updateSource, setDate} = useContext(Context);
  const listRef = useRef();
  const prevDate = useRef(date);
  const [timelineOffset, setTimelineOffset] = useState();
  const {
    pages,
    pagesRef,
    resetPages,
    resetPagesDebounce,
    scrollToPageDebounce,
    shouldResetPages,
    isOutOfRange,
    isNearEdges
  } = useTimelinePages({date, listRef});
  useEffect(() => {
    if (date !== prevDate.current) {
      const datePageIndex = pagesRef.current.indexOf(date);
      if (updateSource !== UpdateSources.LIST_DRAG) {
        if (isOutOfRange(datePageIndex)) {
          updateSource === UpdateSources.DAY_PRESS ? resetPages(date) : resetPagesDebounce(date);
        } else {
          scrollToPageDebounce(datePageIndex);
        }
      }
      prevDate.current = date;
    }
  }, [date, updateSource]);
  const onScroll = useCallback(() => {
    if (shouldResetPages.current) {
      resetPagesDebounce.cancel();
    }
  }, []);
  const onMomentumScrollEnd = useCallback(() => {
    if (shouldResetPages.current) {
      resetPagesDebounce(prevDate.current);
    }
  }, []);
  const onPageChange = useCallback(
    throttle(pageIndex => {
      const newDate = pagesRef.current[pageIndex];
      if (newDate !== prevDate.current) {
        setDate(newDate, UpdateSources.LIST_DRAG);
        if (isNearEdges(pageIndex)) {
          shouldResetPages.current = isNearEdges(pageIndex);
        }
      }
    }, 0),
    []
  );
  const onTimelineOffsetChange = useCallback(offset => {
    setTimelineOffset(offset);
  }, []);
  const renderPage = useCallback(
    (_type, item) => {
      const timelineEvent = events[item];
      const isCurrent = prevDate.current === item;
      return (
        <>
          <Timeline
            {...timelineProps}
            key={item}
            date={item}
            scrollToFirst={false}
            events={timelineEvent}
            scrollOffset={isCurrent ? undefined : timelineOffset}
            onChangeOffset={onTimelineOffsetChange}
          />
          {/* NOTE: Keeping this for easy debugging */}
          {/* <Text style={{position: 'absolute'}}>{item}</Text> */}
        </>
      );
    },
    [events, timelineOffset]
  );
  return (
    <HorizontalList
      ref={listRef}
      data={pages}
      renderItem={renderPage}
      onPageChange={onPageChange}
      onScroll={onScroll}
      extendedState={{todayEvents: events[date], pages}}
      initialPageIndex={INITIAL_PAGE}
      scrollViewProps={{
        keyExtractor: identity,
        onMomentumScrollEnd
      }}
    />
  );
};
export default TimelineList;
