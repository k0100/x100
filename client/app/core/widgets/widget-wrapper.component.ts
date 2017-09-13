import { Component, ComponentRef, Input, Output, ViewContainerRef, Compiler, ViewChild, ComponentFactory, EventEmitter } from '@angular/core'
import { WidgetBase } from './widget-base';
import { WidgetDescriptor } from './widget-description/widget-descriptor';
import { WidgetDescriptorService } from './widget-description/widget-descriptor.service';
import { WindowStateBase } from './window-state/window-state-base';
import { AppModule } from '../../app.module'
import { WidgetDescriptorResolverService } from './widget-description/widget-descriptor-resolver.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { HEX } from '../color/hex';
import { RGB } from '../color/rgb';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

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
	@Input() index: number;
	@Output() onWindowStateChange: EventEmitter<WidgetDescriptor> = new EventEmitter<WidgetDescriptor>();
	@Output() onWidgetRemove: EventEmitter<WidgetDescriptor> = new EventEmitter<WidgetDescriptor>();
	cmpRef: ComponentRef<WidgetBase>;
	instance: WidgetBase;
	color: string = "#3d81e6";
	title = new FormControl("", Validators.required);
	isColorPickerInit: boolean = false;

	private isViewInitialized: boolean = false;
	private widgetClass: string;

	private backgroundStyle: SafeStyle;
	private controlsBackgroundColor: string;
	private form: FormGroup;

	constructor(private compiler: Compiler, private widgetDescriptorResolverService: WidgetDescriptorResolverService, private widgetDescriptorService: WidgetDescriptorService, private domSanitizer: DomSanitizer, fb: FormBuilder) {
		this.form = fb.group({
			"title": this.title
		});
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
				this.instance.id = this.descriptor._id;
				this.instance.setInitialWindowState(this.descriptor.windowState);
				this.instance.background = this.descriptor.background;
				this.setBackground(this.descriptor.background);
				this.title.setValue(this.descriptor.title);
				this.instance.windowStateController.windowStateSubject
					.subscribe(state => this.onWindowStateChanged(state));
				this.instance.load();
			});
	}

	menuClick(event: any): boolean {
		if (event.target.type !== 'submit') {
			event.stopPropagation();
			return false;
		}
		else
			return true;
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

	onChangeColor($event: any) {
		if (this.isColorPickerInit) {
			this.setBackground(this.color);

		} else {
			this.isColorPickerInit = true;
			this.color = this.descriptor.background;
		}
	}

	onSetColor($event: any) {
		if (this.color != this.descriptor.background) {
			this.descriptor.background = this.color;
			this.updateComponent();
			this.widgetDescriptorService.setBackground(this.descriptor).subscribe(x => { });
		}
	}

	setBackground(color: string): SafeStyle {
		if (color === undefined)
			return;

		let rgbColor: RGB;

		if (color.startsWith("#")) {
			let hex = new HEX(color);
			rgbColor = hex.toRGB();
		}
		else if (color.startsWith("rgba(")) {
			var rgb = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');

			rgbColor = new RGB(parseFloat(rgb[0]), parseFloat(rgb[1]), parseFloat(rgb[2]));
			rgbColor.setAlpha(parseFloat(rgb[3]));
		}
		let rgbGradient = rgbColor.toString();
		let rgbControls = rgbColor.darken(10).setAlpha(1).toString();

		var gradient = "linear-gradient(rgba(0, 0, 0, 0), " + rgbGradient + ")";

		this.controlsBackgroundColor = rgbControls;
		this.backgroundStyle = this.domSanitizer.bypassSecurityTrustStyle(gradient);
	}

	setTitle(title: string): void {
		if (this.descriptor !== undefined) {
			this.descriptor.title = title;
			this.widgetDescriptorService.setTitle(this.descriptor).subscribe(x => { });
		}
	}

	public setLabel(form: FormGroup) {
		if (form.valid) {
			this.setTitle(this.title.value);
		}
	}
}
