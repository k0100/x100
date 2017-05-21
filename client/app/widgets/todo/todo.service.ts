import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Todo } from './todo';
import { ServerCommand } from '../../core/server/command'
import { Identity } from '../../core/server/identity'

@Injectable()
export class TodoService {
	constructor(private http: Http) {
	}

	public getTodos(widgetId: string): Observable<Todo[]> {
		return this.http.post('/api/todo/', new ServerCommand("list", { widgetId: widgetId }))
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	public createTodo(todo: Todo): Observable<Todo> {
		return this.http.post('/api/todo/', new ServerCommand("create", todo))
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	public deleteTodo(todo: Todo): Observable<Identity> {
		return this.http.post('/api/todo/', new ServerCommand("delete",
			{
				_id: todo._id,
				widgetId: todo.widgetId
			}))
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	public toggleTodo(todo: Todo): Observable<Identity> {
		return this.http.post('/api/todo/', new ServerCommand("toggle",
			{
				_id: todo._id,
				widgetId: todo.widgetId,
				isCompleted: todo.isCompleted
			}))
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));



	}
}