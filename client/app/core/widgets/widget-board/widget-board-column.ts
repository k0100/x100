import { WidgetBase } from '../widget-base';
import { WidgetBoardItem } from './widget-board-item';
import { WidgetDescriptor } from '../widget-description/widget-descriptor';
import { BoardItemType } from "./board-item-type";

export class WidgetBoardColumn extends WidgetBoardItem {
	constructor(index: number,
		usedColumns: number,
		public descriptors: WidgetDescriptor[]
	) {
		super(index, usedColumns, BoardItemType.Column);
		this.itemClass = this.getItemClass(usedColumns);
	}

	public getItemClass(width: number): string {
		switch (width) {
			case 1:
				return "col-md-3";
			case 2:
				return "col-md-6";
			case 3:
				return "col-md-9";
			case 4:
				return "col-md-12";
		}
	}

	public expand(): void {
		this.usedColumns++;

		this.itemClass = this.getItemClass(this.usedColumns);
	}

	public shrink(): void {
		this.usedColumns--;

		this.itemClass = this.getItemClass(this.usedColumns);
	}
}