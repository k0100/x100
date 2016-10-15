import { Component, ComponentRef, Input, ViewContainerRef, Compiler, ViewChild, ComponentFactory} from '@angular/core'
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
	public columns: WidgetColumn[] = [
		new WidgetColumn(0, []),
		new WidgetColumn(1, []),
		new WidgetColumn(2, [])];

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
				for (let descriptorIndex in column.descriptors) {
					const descriptor = column.descriptors[descriptorIndex];
					descriptor.column = column.index;
					descriptor.row = parseInt(descriptorIndex);

					this.widgetDescriptorService.updateDescriptor(descriptor).subscribe(x => { });
				}
			}
		});
	}

	onWindowStateChanged(descriptor: WidgetDescriptor) {
		this.expandedWidgetDescriptor = descriptor;
		this.isExpanded = !this.expandedWidgetDescriptor.windowState.canExpand();
	}

	public load(userId: number) {
		this.widgetDescriptorService.getDescriptors().subscribe(descriptors => {
			for (let index in descriptors) {
				const descriptor = descriptors[index];

				this.descriptors.push(
					WidgetDescriptor.createWithId(
						descriptor._id,
						descriptor.widgetTypeName,
						descriptor.column,
						descriptor.row,
						WindowState.FromValue(descriptor.windowState.value),
						descriptor.parameters));
			}

			for (let index in this.descriptors) {
				const descriptor = this.descriptors[index];
				this.orderDescriptor(descriptor);
			}
		});

	}

	private addNewWidget():void{
		alert("test");
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