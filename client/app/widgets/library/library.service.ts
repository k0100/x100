import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Book } from './book';
import { ServerCommand } from '../../core/server/command'
import { Identity } from '../../core/server/identity'


@Injectable()
export class LibraryService {
	constructor(private http: Http) {
	}

	public getBooks(widgetId: string): Observable<Book[]> {
		return this.http.post('/api/library/', new ServerCommand("list", { widgetId: widgetId }))
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	public deleteBook(book: Book): Observable<Identity> {
		return this.http.post('/api/library/', new ServerCommand("delete",
			{
				_id: book._id,
				widgetId: book.widgetId
			}))
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	public setPage(book: Book): Observable<Identity> {
		return this.http.post('/api/library/', new ServerCommand("setpage",
			{
				_id: book._id,
				widgetId: book.widgetId,
				page: book.page,
				zoom: book.zoom
			}))
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	public setZoom(book:Book):Observable<Identity> {
		return this.http.post('/api/library/', new ServerCommand("setzoom",
			{
				_id: book._id,
				widgetId: book.widgetId,
				page: book.page,
				zoom: book.zoom
			}))
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}
}