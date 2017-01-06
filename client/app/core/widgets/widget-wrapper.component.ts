import { Component, ComponentRef, Input, Output, ViewContainerRef, Compiler, ViewChild, ComponentFactory, EventEmitter } from '@angular/core'
import { WidgetBase } from './widget-base';
import { WidgetDescriptor } from './widget-description/widget-descriptor';
import { WidgetDescriptorService } from './widget-description/widget-descriptor.service';
import { WindowStateBase } from './window-state/window-state-base';
import { AppModule } from '../../app.module'
import { WidgetDescriptorResolverService } from './widget-description/widget-descriptor-resolver.service';

@Component({
	selector: 'widget-wrapper',
	templateUrl: './app/core/widgets/widget-wrapper.component.html',
	providers: [WidgetDescriptorResolverService, WidgetDescriptorService],
	styles: [
		`.title {
			background-color:rgba(0,0,0,0.04);
			margin-bottom: 7px;
			padding:0 4px 0 4px;
			cursor: move;
		}`,
		`.card-block {
			padding: 5 20 5 20
		}`

	]
})
export class WidgetWrapperComponent {
	@ViewChild('target', { read: ViewContainerRef }) target: WidgetBase;

	@Input() descriptor: WidgetDescriptor;
	@Output() onWindowStateChange: EventEmitter<WidgetDescriptor> = new EventEmitter<WidgetDescriptor>();
	@Output() onWidgetRemove: EventEmitter<WidgetDescriptor> = new EventEmitter<WidgetDescriptor>();
	cmpRef: ComponentRef<WidgetBase>;
	instance: WidgetBase;

	private isViewInitialized: boolean = false;
	private widgetClass: string;

	constructor(private compiler: Compiler, private widgetDescriptorResolverService: WidgetDescriptorResolverService, private widgetDescriptorService: WidgetDescriptorService) {
	}

	canMinimize() {
		return this.instance ?
			this.instance.windowStateController.windowState.canMinimize() :
			false;
	}

	minimize() {
		if (this.instance)
			this.instance.windowStateController.minimize();
	}

	canRestore() {
		return this.instance ?
			this.instance.windowStateController.windowState.canRestore() :
			false;
	}

	restore() {
		if (this.instance)
			this.instance.windowStateController.restore();
	}

	canExpand() {
		return this.instance ?
			this.instance.windowStateController.windowState.canExpand() :
			false;
	}

	expand() {
		if (this.instance)
			this.instance.windowStateController.expand();
	}

	openSettings() {

	}

	onWindowStateChanged(state: WindowStateBase) {
		this.descriptor.windowState = state;
		this.onWindowStateChange.emit(this.descriptor);
	}

	updateComponent() {
		if (!this.isViewInitialized || !this.descriptor) {
			return;
		}
		if (this.cmpRef) {
			this.cmpRef.destroy();

		}

		this.compiler.compileModuleAndAllComponentsAsync(AppModule)
			.then((moduleWithFactories) => {
				const factory = moduleWithFactories.componentFactories.find(
					x => x.componentType === this.widgetDescriptorResolverService.resolve(this.descriptor.widgetTypeName)); // Crucial: componentType.name, not componentType!!
				this.cmpRef = (this.target as any).createComponent(factory)
				this.instance = this.cmpRef.instance;
				this.instance.setInitialWindowState(this.descriptor.windowState);
				this.instance.windowStateController.windowStateSubject
					.subscribe(state => this.onWindowStateChanged(state));
			});
	}

	remove() {
		this.widgetDescriptorService.deleteDescriptor(this.descriptor).subscribe(x => {
			this.onWidgetRemove.emit(this.descriptor);
		});
	}

	ngOnChanges() {
		this.updateComponent();
	}

	ngAfterViewInit() {
		this.isViewInitialized = true;
		this.updateComponent();
	}

	ngOnDestroy() {
		if (this.cmpRef) {
			this.cmpRef.destroy();
		}
	}


}
