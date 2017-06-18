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

@Component({

	selector: 'widget-board',
	templateUrl: './app/core/widgets/widget-board/widget-board.component.html',
	viewProviders: [DragulaService],
	providers: [WidgetDescriptorService],
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
		private widgetDescriptorService: WidgetDescriptorService) {
		this.descriptors = new Array<WidgetDescriptor>();
		this.isExpanded = false;
		dragulaService.setOptions('widgets', {
			moves: function (el: any, container: any, handle: any) {
				return handle.classList.contains('drag-handle') || handle.id == 'inlineEditWrapper';
			}
		});
		dragulaService.dropModel.subscribe((value: any[]) => {
			for (let index in this.items) {
				const column = this.items[index] as WidgetBoardColumn;
				if (column == null)
					continue;

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
		//this.autoSizeColumns(this.columns, column.index, column.columnWidth);
	}

	private shrink(column: WidgetBoardColumn): void {
		column.shrink();
		//this.autoSizeColumns(this.columns, column.index, column.columnWidth);
	}

	public canExpand(column: WidgetBoardColumn): boolean {
		return column.usedColumns < 4;
	}

	public canShrink(column: WidgetBoardColumn): boolean {
		return column.usedColumns > 1;
	}

	private updateRows(): void {
		let totalColumns = 0;
		let i: number = 0;
		for (i; i < this.items.length; i++) {
			const columns = totalColumns + this.items[i].usedColumns;
			if (columns / 4 == 1 && columns % 4 == 0) {
				totalColumns = 0;
				i++;
				this.items.push();
			}
			else
			{
				totalColumns = columns;
			}
		}
	}
}