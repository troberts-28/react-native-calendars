import React from 'react';
import { render } from '@testing-library/react-native';
export declare class CalendarListDriver {
    testID: string;
    element: React.ReactElement;
    constructor(testID: string, element: React.ReactElement);
    render(element?: React.ReactElement<any, string | React.JSXElementConstructor<any>>): ReturnType<typeof render>;
    /** List */
    getListProps(): any;
    getItemTestID(date: string): string;
    getListItem(date: string): any;
    getListItemTitle(date: string): any;
    /** Static header */
    get staticHeaderTestID(): string;
    getStaticHeader(): any;
    getStaticHeaderTitle(): any;
    getStaticHeaderLeftArrow(): any;
    getStaticHeaderRightArrow(): any;
    pressLeftArrow(): void;
    pressRightArrow(): void;
    /** Day press */
    getDayTestID(date: string): string;
    getDay(date: string): any;
    selectDay(date: string): void;
}
