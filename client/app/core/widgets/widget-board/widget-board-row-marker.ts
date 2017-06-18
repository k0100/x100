import { WidgetBase } from '../widget-base';
import { WidgetBoardItem } from './widget-board-item';
import { WidgetDescriptor } from '../widget-description/widget-descriptor';
import { BoardItemType } from "./board-item-type";

export class WidgetBoardRowMarker extends WidgetBoardItem {
	public itemClass: string;

	constructor(index: number,
	) {
		super(index, 0, BoardItemType.RowMarker);
	}

	public canExpand(): boolean {
		return false;
	}

	public canShrink(): boolean {
		return false;
	}

	public canHostWidgets():boolean{
        return false;
    }
}