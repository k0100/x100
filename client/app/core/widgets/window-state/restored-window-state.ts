import {WindowState} from './window-state';
import {WindowStateBase} from './window-state-base';

export class RestoredWindowState extends WindowStateBase {

	constructor() {
		super(1);
	}

	public canMinimize() {
		return true;
	}

	public canRestore() {
		return false;
	}

	public canExpand() {
		return true;
	}
}