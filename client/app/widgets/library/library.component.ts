import { Component, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { WidgetBase } from '../../core/widgets/widget-base';
import { Observable } from 'rxjs/Rx';
import { FileUploader } from 'ng2-file-upload';
import { Http, ResponseContentType } from '@angular/http';
import { LibraryService } from './library.service';
import { Book } from './book';

@Component({
    selector: 'library',
    templateUrl: './app/widgets/library/library.component.html',
    providers: [LibraryService],
    styles: [`.my-drop-zone {
        border: dotted 3px lightgray;
    }

    .nv-file-over {
        border: dotted 3px red;
    }

    /* Default class applied to drop zones on over */

    .another-file-over-class {
        border: dotted 3px green;
    }`]
})

export class LibraryComponent extends WidgetBase {
    public uploader: FileUploader = new FileUploader({ url: '/api/library/upload' });
    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;

    books: Book[];
    pdfSrc: string;
    page: number = 1;
    isBookLoaded: boolean = false;

    constructor(private http: Http, private service: LibraryService) {
        super();

        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            const responseBook = JSON.parse(response);
            const book: Book = new Book(responseBook.widgetId, responseBook.name);
            book._id = responseBook._id;
            this.books.push(book);
        };

        this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
            form.append('data', JSON.stringify({ widgetId: this.id }));
        };

    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public onFileSelected() {
        this.uploader.uploadAll();
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }

    public load(): void {
        this.service.getBooks(this.id)
            .subscribe(books => this.books = books);
    }

    private deleteBook(book: Book) {
        this.service.deleteBook(book)
            .subscribe(result => {
                const index = this.books.indexOf(book);
                this.books.splice(index, 1);
            });
    }

    private loadBook(book: Book) {
        this.isBookLoaded = true;
        this.pdfSrc = '/api/library/upload?id=' + book._id + '&widgetId=' + this.id;

    }

    private loadList() {
        this.isBookLoaded = false;
        this.pdfSrc = '';
    }

    onError(error: any) {
        console.log(error);
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.pdfSrc = '/api/library/upload';

        }, 0);
    }
}