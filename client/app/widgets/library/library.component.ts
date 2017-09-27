import { Component, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { WidgetBase } from '../../core/widgets/widget-base';
import { Observable } from 'rxjs/Rx';
import { FileUploader } from 'ng2-file-upload';

const URL = '/api/library/upload';

@Component({
    selector: 'library',
    templateUrl: './app/widgets/library/library.component.html',

})

export class LibraryComponent extends WidgetBase {
    // public uploader: FileUploader = new FileUploader({ url: URL });
    // public hasBaseDropZoneOver: boolean = false;
    // public hasAnotherDropZoneOver: boolean = false;

    // public fileOverBase(e: any): void {
    //     this.hasBaseDropZoneOver = e;
    // }

    // public fileOverAnother(e: any): void {
    //     this.hasAnotherDropZoneOver = e;
    // }
    pdfSrc: string = 'http://localhost:3000/api/library/upload';
    page: number = 1;

    constructor() {

        super();
    }
}