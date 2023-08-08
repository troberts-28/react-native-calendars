import React from 'react';
import { render } from '@testing-library/react-native';
export declare class ExpandableCalendarDriver {
    testID: string;
    element: React.ReactElement;
    renderTree: ReturnType<typeof render>;
    constructor(testID: string, element: React.ReactElement);
    render(element?: React.ReactElement<any, string | React.JSXElementConstructor<any>>): ReturnType<typeof render>;
    /** Container */
    getExpandableContainer(): any;
    isCalendarExpanded(): boolean;
    /** Header */
    getRightArrow(): any;
    getLeftArrow(): any;
    /** Knob and Position */
    get knobTestID(): string;
    getKnob(): any;
    toggleKnob(): void;
    /** CalendarList */
    getCalendarList(): any;
    getDayTestID(date: string): string;
    getDay(date: string): any;
    selectDay(date: string): void;
    /** WeekCalendar */
    getWeekCalendar(): any;
    getWeekDayTestID(date: string): string;
    getWeekDay(date: string): any;
    selectWeekDay(date: string): void;
    /** today button */
    getTodayButton(): any;
    /** actions */
    pressOnTodayButton(): void;
    pressOnHeaderArrow({ left }?: {
        left?: boolean;
    }): void;
}
