import { WidgetBase } from '../widget-base';
import { WidgetBoardItem } from './widget-board-item';
import { WidgetDescriptor } from '../widget-description/widget-descriptor';

export class WidgetBoardColumn extends WidgetBoardItem {
	public columnClass: string;

	constructor(index: number,
		usedColumns: number,
		public descriptors: WidgetDescriptor[]
	) {
		super(index, usedColumns);
		this.columnClass = this.getColumnClass(usedColumns);
	}

	public getColumnClass(width: number): string {
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

		this.columnClass = this.getColumnClass(this.usedColumns);
	}

	public shrink(): void {
		this.usedColumns--;

		this.columnClass = this.getColumnClass(this.usedColumns);
	}
}