import React from 'react';
import { RecyclerListViewProps } from 'recyclerlistview';
export interface HorizontalListProps extends Omit<RecyclerListViewProps, 'dataProvider' | 'layoutProvider' | 'rowRenderer'> {
    data: any[];
    renderItem: RecyclerListViewProps['rowRenderer'];
    pageWidth?: number;
    onPageChange?: (pageIndex: number, prevPageIndex: number) => void;
    initialPageIndex?: number;
}
declare const _default: React.ForwardRefExoticComponent<HorizontalListProps & React.RefAttributes<unknown>>;
export default _default;
