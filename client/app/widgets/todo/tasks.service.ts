import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Task } from './task';
import { ServerCommand } from '../../core/server/command'
import { Identity } from '../../core/server/identity'

@Injectable()
export class TaskService {
	constructor(private http: Http) {
	}

	public getTasks(): Observable<Task[]> {
		return this.http.post('/api/todo/', new ServerCommand("list", null))
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	public createTask(task: Task): Observable<Identity> {
		return this.http.post('/api/todo/', new ServerCommand("create", task))
			.map((res: Response) => res.json)
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	public deleteTask(task: Task): Observable<Identity> {
		return this.http.post('/api/todo/', new ServerCommand("delete",
			{ _id: task._id }))
			.map((res: Response) => res.json)
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}
}