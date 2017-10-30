import { WidgetMenuItem } from "../../../core/widgets/widget-menu/widget-menu-item";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { TimezoneComponent } from "./timezone.component";

export class TimezoneMenuItem extends WidgetMenuItem {
    bsModalRef: BsModalRef;
    constructor(
        public widgetId: string,
        public modalService: BsModalService
    ) {
        super("Timezone", widgetId);
    }

    invoke(): void {
        this.bsModalRef = this.modalService.show(TimezoneComponent);
    }
}