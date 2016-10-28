import { Component, ComponentRef, Input, Output, ViewContainerRef, Compiler, ViewChild, ComponentFactory, EventEmitter} from '@angular/core'
import { WidgetDescriptorService } from './widget-description/widget-descriptor.service';
import { WidgetDescriptor } from './widget-description/widget-descriptor';
import { WindowState } from '../../core/widgets/window-state/window-state';
import { WidgetColumn } from '../../core/widgets/widget-column';
import { WidgetDescriptorResolverService } from './widget-description/widget-descriptor-resolver.service';
import { SelectionItem } from '../../core/collections/selection-item'

@Component({
	selector: 'widget-selector',
	templateUrl: './app/core/widgets/widget-selector.component.html',
	providers: [WidgetDescriptorResolverService, WidgetDescriptorService]
})


export class WidgetSelectorComponent {
	@Output() onWidgetsAdded: EventEmitter<WidgetDescriptor> = new EventEmitter<WidgetDescriptor>();
	@Input() column: WidgetColumn;
	private items: SelectionItem[] = [];

	constructor(
		private widgetDescriptorResolverService: WidgetDescriptorResolverService,
		private widgetDescriptorService: WidgetDescriptorService) {
		let types = widgetDescriptorResolverService.getMappings();

		for (let i in types) {
			this.items.push(new SelectionItem(types[i]));
		}
	}

	private mark(item: SelectionItem): void {
		item.isSelected = !item.isSelected;
	}

	private add(): void {
		const column = this.column.index;
		let row = this.column.descriptors.length;
		for (let i in this.items) {
			const item = this.items[i];
			if (item.isSelected) {
				item.isSelected = false;
				const descriptor =
					new WidgetDescriptor(
						item.data.widget.name,
						column,
						row++,
						WindowState.Restored,
						[]);
				this.widgetDescriptorService.createDescriptor(descriptor).subscribe(x => {
					this.onWidgetsAdded.emit(descriptor);
				});
			}
		}
	}
}