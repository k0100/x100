import {WindowState} from './window-state'

export abstract class WindowStateBase {
	constructor(public value:number) {
		 }

	abstract canMinimize(): boolean;

	abstract canRestore(): boolean;

	abstract canExpand(): boolean;
}
