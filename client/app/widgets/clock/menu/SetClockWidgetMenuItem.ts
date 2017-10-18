import { WidgetMenuItem } from "../../../core/widgets/widget-menu/widget-menu-item";

export class SetClockWidgetMenuItem extends WidgetMenuItem {
    constructor(
        public widgetId: string
    ) {
        super("Set Watch", widgetId);
    }

    invoke(): void {
        alert('aa');
    }
}