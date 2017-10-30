import { WindowStateBase } from './window-state/window-state-base';
import { WindowState } from './window-state/window-state';
import { WindowStateController } from './window-state/window-state-controller';
import { WidgetMenuItem } from './widget-menu/widget-menu-item';
import { BsModalService } from 'ngx-bootstrap';

export abstract class WidgetBase {
	public id: string;
	public columns: number = 1;
	public rows: number = 1;
	public background: string;
	public windowStateController: WindowStateController
	public isMinimized: boolean;
	public isRestored: boolean;
	public isExpanded: boolean;
	public menuItems: WidgetMenuItem[];

	constructor() {
		let initialWindowState = WindowState.Restored;

		this.updateStateFlags(initialWindowState);

		this.windowStateController = new WindowStateController(initialWindowState);

		this.windowStateController.windowStateObservable.subscribe(state => this.onWindowStateChanged(state));
	}

	protected initMenuItems(): WidgetMenuItem[] {
		return new Array<WidgetMenuItem>();
	}

	onWindowStateChanged(state: WindowStateBase) {
		this.updateStateFlags(state);
	}

	public setInitialWindowState(initialWindowState: WindowStateBase) {
		this.updateStateFlags(initialWindowState);
		this.windowStateController.windowState = initialWindowState;
	}

	updateStateFlags(state: WindowStateBase) {
		this.isMinimized = state == WindowState.Minimized;
		this.isRestored = state == WindowState.Restored;
		this.isExpanded = state == WindowState.Expanded;
	}

	public init(): void {
		this.menuItems = this.initMenuItems();
		this.load();
	}
	abstract load(): void;
}