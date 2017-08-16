import { Injectable } from '@angular/core';
import { WidgetBase } from '../widget-base';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs'
import { ServerCommand } from '../../../core/server/command'
import { Identity } from '../../../core/server/identity'
import { TodoComponent } from '../../../widgets/todo/todo.component';
import { NoteComponent } from '../../../widgets/note/note.component';
import { ClockComponent } from '../../../widgets/clock/clock.component';
import { HttpService1 } from "../../http/http-intercept";
import { WidgetBoardItem } from "./widget-board-item";
import { WidgetBoardColumn } from "./widget-board-column";
import { WidgetDescriptor } from "../widget-description/widget-descriptor";
import { WindowState } from "../window-state/window-state";


@Injectable()
export class WidgetBoardItemsService {
	constructor(private http: HttpService1) {

	}

	public getItems(): Observable<WidgetBoardItem[]> {
		return this.http.post('/api/core/widgets/widgetBoardItem/', new ServerCommand("list", null))
			.map((res: Response) => res.json()
				.map(
				(item: any) =>
					new WidgetBoardColumn
						(
						item.index,
						item.usedColumns,
						item.descriptors.map((descriptor: any) => WidgetDescriptor.createWithId(
							descriptor._id,
							descriptor.widgetTypeName,
							descriptor.title,
							descriptor.column,
							descriptor.row,
							descriptor.background,
							WindowState.FromValue(descriptor.windowState.value),
							descriptor.parameters,
							descriptor.relations)
						)
						// item.descriptors.map(x:any)=>
						// 	new WidgetDescriptor(x._id)
						)
				)
			)
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	public synchronizeItems(items: WidgetBoardItem[]): void {
		this.http.post('/api/core/widgets/widgetBoardItem/', new ServerCommand("synchronize", items))
			.subscribe();
	}
}