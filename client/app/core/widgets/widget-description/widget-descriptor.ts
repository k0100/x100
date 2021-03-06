import { WidgetBase } from '../widget-base';
import { WidgetParameter } from './widget-parameter';
import { WindowStateBase } from '../window-state/window-state-base';
import { WindowState } from '../window-state/window-state';

export class WidgetDescriptor {
	constructor(
		public _id:string,
		public widgetTypeName: string,
		public title: string,
		public columnId: string,
		public row: number,
		public background: string,
		public windowState: WindowStateBase,
		public parameters: WidgetParameter[],
		public relations: string[]) { }

	public static createWithId(id: string,
		widgetTypeName: string,
		title: string,
		columnId: string,
		row: number,
		background: string,
		windowState: WindowStateBase,
		parameters: WidgetParameter[],
		relations: string[]): WidgetDescriptor {

		let descriptor = new WidgetDescriptor(
			id,
			widgetTypeName,
			title,
			columnId,
			row,
			background,
			WindowState.FromValue(windowState.value),
			parameters,
			relations)

		return descriptor;
	}
}
