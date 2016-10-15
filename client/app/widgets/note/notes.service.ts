import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Note } from './note';
import { ServerCommand } from '../../core/server/command'
import { Identity } from '../../core/server/identity'

@Injectable()
export class NoteService {
  constructor(private http: Http) {
	}

	public getNotes(): Observable<Note[]> {
		return this.http.post('/api/note/', new ServerCommand("list", null))
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	public createNote(note: Note): Observable<Identity> {
		return this.http.post('/api/note/', new ServerCommand("create", note))
			.map((res: Response) => res.json)
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	public deleteNote(note: Note): Observable<Identity> {
		return this.http.post('/api/note/', new ServerCommand("delete",
			{ _id: note._id }))
			.map((res: Response) => res.json)
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}
}