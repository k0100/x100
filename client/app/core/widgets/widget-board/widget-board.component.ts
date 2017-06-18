import { Component, ComponentRef, Input, ViewContainerRef, Compiler, ViewChild, ComponentFactory } from '@angular/core'
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

	constructor(
		private dragulaService: DragulaService,
		private widgetDescriptorService: WidgetDescriptorService,
		private widgetBoardItemsService: WidgetBoardItemsService) {
		this.descriptors = new Array<WidgetDescriptor>();
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
						descriptor.column = column.index;
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
	}

	onWidgetsAdded(descriptor: WidgetDescriptor) {
		this.addDescriptor(descriptor);
		this.drawBoard();
	}

	onWidgetRemoved(descriptor: WidgetDescriptor) {
		const removedIndex = this.descriptors.indexOf(descriptor);
		this.descriptors.splice(removedIndex, 1);
		this.isExpanded = false;
		this.drawBoard();
	}

	private addDescriptor(descriptor: WidgetDescriptor) {
		this.descriptors.push(
			WidgetDescriptor.createWithId(
				descriptor._id,
				descriptor.widgetTypeName,
				descriptor.title,
				descriptor.column,
				descriptor.row,
				descriptor.background,
				WindowState.FromValue(descriptor.windowState.value),
				descriptor.parameters,
				descriptor.relations));
	}

	private drawBoard() {
		this.items = [
			new WidgetBoardColumn(0, 1, []),
			new WidgetBoardColumn(1, 1, []),
			new WidgetBoardColumn(2, 1, []),
			new WidgetBoardColumn(3, 1, [])];

		for (let index in this.descriptors) {
			const descriptor = this.descriptors[index];
			this.orderDescriptor(descriptor);
		}
	}

	public load(userId: number) {
		this.widgetDescriptorService.getDescriptors().subscribe(descriptors => {
			for (let index in descriptors) {
				const descriptor = descriptors[index];
				this.addDescriptor(descriptor);
			}

			this.drawBoard();
		});
		// this.widgetBoardItemsService.getItems().subscribe(items =>{

		// });
	}

	private orderDescriptor(descriptor: WidgetDescriptor): void {
		const column = this.items[descriptor.column] as WidgetBoardColumn;
		if (column == null)
			return;
		column.descriptors.push(descriptor);
		column.descriptors = column.descriptors.sort(this.widgetDescriptorRowComparer);
	}

	private widgetDescriptorRowComparer(a: WidgetDescriptor, b: WidgetDescriptor): number {
		return a.row - b.row;
	}

	private expand(column: WidgetBoardColumn): void {
		column.expand();
		this.updateRowMarkers();
	}

	private shrink(column: WidgetBoardColumn): void {
		column.shrink();
		this.updateRowMarkers();
	}

	private updateRowMarkers(): void {
		let rowColumns = 0;
		this.items = this.items.filter(
			item => item.itemType === BoardItemType.Column && (item as WidgetBoardColumn).descriptors.length
			>0);

		let i: number = 0;
		for (i; i < this.items.length; i++) {


			const currentColumns = rowColumns + this.items[i].usedColumns;

			const hasAnotherColumn = this.items.length - 1 > i;

			if (currentColumns == 4) {
				rowColumns = 0;
				i++;
				this.items.splice(i, 0, new WidgetBoardRowMarker(i));
			}

			if (currentColumns < 4 && !hasAnotherColumn) {
				// add mising collumns here
				rowColumns = 0;
			}

			if (currentColumns < 4 && hasAnotherColumn) {
				const nextColumn = this.items[i + 1] as WidgetBoardColumn;
				const nextColumnUsedColumns = nextColumn.usedColumns;

				// if (nextColumn.descriptors.length == 0) {
				// 	this.items.splice(i + 1, 1);
				// }

				if (currentColumns + nextColumnUsedColumns > 4) {
					let emptyColumns = 4 - currentColumns;
					while (emptyColumns > 0) {
						i++;
						this.items.splice(i, 0, new WidgetBoardColumn(i, 1, []));
						emptyColumns--;
					}
					rowColumns = 0;
					i++;
					this.items.splice(i, 0, new WidgetBoardRowMarker(i));
					i--;
				}
				else {
					rowColumns = currentColumns;
				}
			}
		}
	}
}