import { WidgetBase } from '../widget-base';
import { WidgetParameter } from './widget-parameter';
import { WindowStateBase } from '../window-state/window-state-base';
import { WindowState } from '../window-state/window-state';

export class WidgetDescriptor {
	constructor(
		public _id:string,
		public widgetTypeName: string,
		public column: number,
		public row: number,
		public background: string,
		public windowState: WindowStateBase,
		public parameters: WidgetParameter[]) { }

	public static createWithId(id: string,
		widgetTypeName: string,
		column: number,
		row: number,
		background: string,
		windowState: WindowStateBase,
		parameters: WidgetParameter[]): WidgetDescriptor {

		let descriptor = new WidgetDescriptor(
			id,
			widgetTypeName,
			column,
			row,
			background,
			WindowState.FromValue(windowState.value),
			parameters)

		return descriptor;
	}
}
