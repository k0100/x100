import { Component, ComponentRef, Input, ViewContainerRef, Compiler, ViewChild, ComponentFactory } from '@angular/core'
import { WidgetDescriptor } from './widget-description/widget-descriptor';
import { WidgetParameter } from './widget-description/widget-parameter';
import { WidgetWrapperComponent } from '../../core/widgets/widget-wrapper.component';
import { WindowState } from '../../core/widgets/window-state/window-state';
import { WidgetBase } from '../../core/widgets/widget-base';
import { WidgetColumn } from '../../core/widgets/widget-column';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { WidgetDescriptorService } from './widget-description/widget-descriptor.service';

@Component({

	selector: 'widget-board',
	templateUrl: './app/core/widgets/widget-board.component.html',
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
	public columns: WidgetColumn[] = [];

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
				return handle.className.split(' ').indexOf('title') >= 0;
			}
		});
		dragulaService.dropModel.subscribe((value: any[]) => {
			for (let index in this.columns) {
				const column = this.columns[index];

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
				descriptor.column,
				descriptor.row,
				descriptor.background,
				WindowState.FromValue(descriptor.windowState.value),
				descriptor.parameters));
	}

	private drawBoard() {
		this.columns = [
			new WidgetColumn(0, []),
			new WidgetColumn(1, []),
			new WidgetColumn(2, [])];

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
		const column = this.columns[descriptor.column];
		column.descriptors.push(descriptor);
		column.descriptors = column.descriptors.sort(this.widgetDescriptorRowComparer);
	}

	private widgetDescriptorRowComparer(a: WidgetDescriptor, b: WidgetDescriptor): number {
		return a.row - b.row;
	}
}