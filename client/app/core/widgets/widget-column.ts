import {WidgetBase} from './widget-base';
import {WidgetDescriptor}  from './widget-description/widget-descriptor';

export class WidgetColumn {
	constructor(public index: number,
		public descriptors: WidgetDescriptor[]
	) { }
}