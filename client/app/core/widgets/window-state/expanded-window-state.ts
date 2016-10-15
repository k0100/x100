import {WindowState} from './window-state';
import {WindowStateBase} from './window-state-base';

export class ExpandedWindowState extends WindowStateBase {

	constructor() {
		super(2);
	}

	public canMinimize() {
		return true;
	}

	public canRestore() {
		return true;
	}

	public canExpand() {
		return false;
	}
}