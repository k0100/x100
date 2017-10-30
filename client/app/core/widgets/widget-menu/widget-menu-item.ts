import { BsModalRef, BsModalService } from "ngx-bootstrap";


export abstract class WidgetMenuItem {

    constructor(
        public name: string,
        public widgetId: string,
    ) { }

    abstract invoke(): void;
}