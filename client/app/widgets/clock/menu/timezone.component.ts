import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
    selector: 'modal-content',
    templateUrl: './app/widgets/clock/menu/timezone.component.html',
})

export class TimezoneComponent {

    constructor(public bsModalRef: BsModalRef) {

    }

    public cancel(): void {
        this.bsModalRef.hide();
        
    }
}