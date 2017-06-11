import { Injectable } from '@angular/core';
import { WidgetBase } from '../widget-base';
import { WidgetDescriptor } from './widget-descriptor';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs'
import { ServerCommand } from '../../../core/server/command'
import { Identity } from '../../../core/server/identity'
import { TodoComponent } from '../../../widgets/todo/todo.component';
import { NoteComponent } from '../../../widgets/note/note.component';
import { ClockComponent } from '../../../widgets/clock/clock.component';
import { HttpService1 } from "../../http/http-intercept";


@Injectable()
export class WidgetDescriptorService {
	constructor(private http: HttpService1) {
	}

	public createDescriptor(descriptor: WidgetDescriptor): Observable<WidgetDescriptor> {
		return this.http.post('/api/core/widgets/widgetDescriptor/', new ServerCommand("create", descriptor))
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	public getDescriptors(): Observable<WidgetDescriptor[]> {
		return this.http.post('/api/core/widgets/widgetDescriptor/', new ServerCommand("list", null))
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	public deleteDescriptor(descriptor: WidgetDescriptor): Observable<Identity> {
		return this.http.post('/api/core/widgets/widgetDescriptor/', new ServerCommand("delete",
			{ _id: descriptor._id }))
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	public updateDescriptor(descriptor: WidgetDescriptor): Observable<Identity> {
		return this.http.post('/api/core/widgets/widgetDescriptor/', new ServerCommand("reposition",
			{ _id: descriptor._id, column: descriptor.column, row: descriptor.row }))
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	public setBackground(descriptor: WidgetDescriptor): Observable<Identity> {
		return this.http.post('/api/core/widgets/widgetDescriptor/', new ServerCommand("setBackground",
			{ _id: descriptor._id, background: descriptor.background }))
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	public setTitle(descriptor: WidgetDescriptor): Observable<Identity> {
		return this.http.post('/api/core/widgets/widgetDescriptor/', new ServerCommand("setTitle",
			{ _id: descriptor._id, title: descriptor.title }))
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

}