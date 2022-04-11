/// <reference types="react" />
import { TimelineProps } from '../timeline/Timeline';
export interface TimelineListProps {
    events: {
        [date: string]: TimelineProps['events'];
    };
    timelineProps: Omit<TimelineProps, 'events'>;
}
declare const TimelineList: (props: TimelineListProps) => JSX.Element;
export default TimelineList;
