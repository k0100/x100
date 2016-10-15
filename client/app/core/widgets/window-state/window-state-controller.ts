import { WindowState } from './window-state'
import { WindowStateBase } from './window-state-base';
import { Observable, ReplaySubject } from 'rxjs/Rx';

export class WindowStateController {
	public windowState: WindowStateBase;

	public windowStateSubject: ReplaySubject<WindowStateBase> = new ReplaySubject<WindowStateBase>();
	public windowStateObservable: Observable<WindowStateBase>  = this.windowStateSubject.asObservable();

	constructor(windowState: WindowStateBase) {
		this.windowState = windowState;
	}
	
	public minimize() {
		if (this.windowState.canMinimize()) {
			this.windowState = WindowState.Minimized;
			this.emitWindowStateChange();
		}
	}

	public restore() {
		if (this.windowState.canRestore()) {
			this.windowState = WindowState.Restored;
			this.emitWindowStateChange();
		}
	}

	public expand() {
		if (this.windowState.canExpand()) {
			this.windowState = WindowState.Expanded;
			this.emitWindowStateChange();
		}
	}

	private emitWindowStateChange(){
		this.windowStateSubject.next(this.windowState);
	}
}