import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Contact } from './contact';
import { ServerCommand } from '../../core/server/command'
import { Identity } from '../../core/server/identity'


@Injectable()
export class ContactService {
	constructor(private http: Http) {
	}

	public createContact(contact: Contact): Observable<Identity> {
		return this.http.post('/api/contact/', new ServerCommand("create", contact))
			.map((res: Response) => res.json)
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	public getContacts(widgetId: string): Observable<Contact[]> {
		return this.http.post('/api/contact/', new ServerCommand("list", { widgetId: widgetId }))
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	public deleteContact(contact: Contact): Observable<Identity> {
		return this.http.post('/api/contact/', new ServerCommand("delete",
			{
				_id: contact._id,
				widgetId: contact.widgetId
			}))
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}
}