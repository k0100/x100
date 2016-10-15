import {WindowState} from './window-state';
import {WindowStateBase} from './window-state-base';

export class MinimizedWindowState extends WindowStateBase{
	
	constructor() {
		super(0);
	}

	public canMinimize(){
		return false;
	}

	public canRestore(){
		return true;
	}

	public canExpand(){
		return true;
	}
}