import { Component, ComponentRef, Input, ViewContainerRef, Compiler, ViewChild, ComponentFactory, Output, EventEmitter } from '@angular/core'
import { WidgetDescriptor } from '../widget-description/widget-descriptor';
import { WidgetParameter } from '../widget-description/widget-parameter';
import { WidgetWrapperComponent } from '../../../core/widgets/widget-wrapper.component';
import { WindowState } from '../../../core/widgets/window-state/window-state';
import { WidgetBase } from '../../../core/widgets/widget-base';
import { WidgetBoardItem } from './widget-board-item';
import { WidgetBoardColumn } from './widget-board-column';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { WidgetDescriptorService } from '../widget-description/widget-descriptor.service';
import { WidgetBoardRowMarker } from './widget-board-row-marker';
import { BoardItemType } from "./board-item-type";
import { WidgetBoardItemsService } from "./widget-board-items.service";
import { Observable } from "rxjs/Observable";

@Component({

	selector: 'widget-board',
	templateUrl: './app/core/widgets/widget-board/widget-board.component.html',
	viewProviders: [DragulaService],
	providers: [WidgetDescriptorService, WidgetBoardItemsService],
	styles: [
		`.container {
			min-height:50px;
			padding-bottom:100px;
		}
	`]
})

export class WidgetBoardComponent {

	public items: WidgetBoardItem[] = [];
	
	private descriptors: WidgetDescriptor[];
	private expandedWidgetDescriptor: WidgetDescriptor;
	private isExpanded: boolean;
	
	@Output() onWindowStateChange: EventEmitter<boolean> = new EventEmitter<boolean>();
	constructor(
		private dragulaService: DragulaService,
		private widgetDescriptorService: WidgetDescriptorService,
		private widgetBoardItemsService: WidgetBoardItemsService
	) {

		this.isExpanded = false;
		dragulaService.setOptions('widgets', {
			moves: function (el: any, container: any, handle: any) {
				return handle.classList.contains('drag-handle') || handle.id == 'inlineEditWrapper';
			}
		});
		dragulaService.dropModel.subscribe((value: any[]) => {
			for (let index in this.items) {
				const item = this.items[index];
				if (!item.canHostWidgets())
					continue;

				const column = item as WidgetBoardColumn;

				for (let descriptorIndex = 0; descriptorIndex < column.descriptors.length; descriptorIndex++) {
					const descriptor = column.descriptors[descriptorIndex];
					if (descriptor === undefined) {
						column.descriptors.splice(descriptorIndex, 1);
						descriptorIndex--;
					}
					else {
						descriptor.columnId = column._id;
						descriptor.row = descriptorIndex;

						this.widgetDescriptorService.updateDescriptor(descriptor).subscribe(x => { });
					}
				}
			}
		});
	}

	onWindowStateChanged(descriptor: WidgetDescriptor) {
		this.expandedWidgetDescriptor = descriptor;
		this.isExpanded = !this.expandedWidgetDescriptor.windowState.canExpand();
		this.onWindowStateChange.emit(this.isExpanded);
	}

	onWidgetsAdded(descriptor: WidgetDescriptor) {
		let columnItem = this.items.find(x => x._id == descriptor.columnId);

		if (columnItem.canHostWidgets()) {
			let column = (columnItem as WidgetBoardColumn);

			column.descriptors.splice(column.descriptors.length, 0, descriptor);
		}
	}

	onWidgetRemoved(descriptor: WidgetDescriptor) {
		let columnItem = this.items.find(x => x._id == descriptor.columnId);

		if (columnItem.canHostWidgets()) {
			let column = (columnItem as WidgetBoardColumn);

			let index = column.descriptors.indexOf(descriptor);

			column.descriptors.splice(index, 1);

			this.isExpanded = false;
		}
	}


	public load() {
		this.widgetBoardItemsService.getItems()
			.subscribe(res => {
				this.items = res;
			});
	}

	private expand(column: WidgetBoardColumn): void {
		column.expand();

		let columnIndex = column.index + 1;
		while (this.items.length - 1 >= columnIndex) {
			const nextItem = this.items[columnIndex];
			if (!nextItem.canHostWidgets()) {
				break;
			};
			if (nextItem.canHostWidgets() && (nextItem as WidgetBoardColumn).descriptors.length == 0) {
				this.items.splice(columnIndex, 1);
				break;
			}
			columnIndex++;
		}
		this.updateRowMarkers(column);
	}

	private shrink(column: WidgetBoardColumn): void {
		column.shrink();

		let columnIndex = column.index + 1;
		this.items.splice(columnIndex, 0, new WidgetBoardColumn("", columnIndex, 1, []));

		this.updateRowMarkers(column);
	}

	private trackByItem(index: number, item: WidgetBoardItem): string {
		return item != null ? item._id : null;
	}

	private trackByDescriptor(index: number, descriptor: WidgetDescriptor): string {
		return descriptor != null ? descriptor._id : null;
	}

	private updateRowMarkers(column: WidgetBoardColumn): void {
		let rowColumns = 0;
		this.items = this.items.filter(
			item => item.itemType === BoardItemType.Column
		);

		let i: number = 0;
		for (i = 0; i < this.items.length; i++) {
			const currentColumn = this.items[i];
			currentColumn.index = i;
			const currentColumns = rowColumns + currentColumn.usedColumns;

			const hasAnotherColumn = this.items.length - 1 > i;

			if (currentColumns == 4) {
				rowColumns = 0;
				i++;
				this.items.splice(i, 0, new WidgetBoardRowMarker("", i));
			}

			if (currentColumns < 4 &&
				!hasAnotherColumn) {
				let emptyColumns = 4 - currentColumns;
				while (emptyColumns > 0) {
					i++;
					this.items.splice(i, 0, new WidgetBoardColumn("", i, 1, []));
					emptyColumns--;
				}
				rowColumns = 0;
				i++;
				this.items.splice(i, 0, new WidgetBoardRowMarker("", i));
			} else if (currentColumns < 4 && hasAnotherColumn) {
				const nextColumn = this.items[i + 1] as WidgetBoardColumn;
				const nextColumnUsedColumns = nextColumn.usedColumns;

				if (currentColumns + nextColumnUsedColumns > 4) {
					let emptyColumns = 4 - currentColumns;
					while (emptyColumns > 0) {
						i++;
						this.items.splice(i, 0, new WidgetBoardColumn("", i, 1, []));
						emptyColumns--;
					}
					rowColumns = 0;
					i++;
					this.items.splice(i, 0, new WidgetBoardRowMarker("", i));
					i--;
				}
				else {
					rowColumns = currentColumns;
				}
			}
		}

		while (this.items.length > 5) {
			if (!this.items[i - 1].canHostWidgets() &&
				this.items[i - 2].canHostWidgets() && (this.items[i - 2] as WidgetBoardColumn).descriptors.length == 0 &&
				this.items[i - 3].canHostWidgets() && (this.items[i - 3] as WidgetBoardColumn).descriptors.length == 0 &&
				this.items[i - 4].canHostWidgets() && (this.items[i - 4] as WidgetBoardColumn).descriptors.length == 0 &&
				this.items[i - 5].canHostWidgets() && (this.items[i - 5] as WidgetBoardColumn).descriptors.length == 0
			) {

				i -= 5;
				this.items.splice(i, 5);
			}
			else {
				break;
			}
		}

		this.widgetBoardItemsService.synchronizeItems(this.items).subscribe(
			result => {
				let columnsWithoutId = this.items.filter(x => x._id == "");
				columnsWithoutId.map((item) => item._id = result[item.index]._id);
			});
	}
}