import { Injectable } from '@angular/core';
import { WidgetBase } from '../widget-base';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs'
import { ServerCommand } from '../../../core/server/command'
import { Identity } from '../../../core/server/identity'
import { TodoComponent } from '../../../widgets/todo/todo.component';
import { NoteComponent } from '../../../widgets/note/note.component';
import { HttpService1 } from "../../http/http-intercept";
import { WidgetBoardItem } from "./widget-board-item";
import { WidgetBoardColumn } from "./widget-board-column";
import { WidgetDescriptor } from "../widget-description/widget-descriptor";
import { WindowState } from "../window-state/window-state";
import { WidgetBoardRowMarker } from "./widget-board-row-marker";


@Injectable()
export class WidgetBoardItemsService {
	constructor(private http: HttpService1) {

	}

	public getItems(): Observable<WidgetBoardItem[]> {
		return this.http.post('/api/core/widgets/widgetBoardItem/', new ServerCommand("list", null))
			.map((res: Response) => res.json()
				.map(
				(item: any) =>
					item.itemTypeId == 1 ?
						new WidgetBoardColumn
							(
							item._id,
							item.index,
							item.usedColumns,
							item.descriptors.map((descriptor: any) => WidgetDescriptor.createWithId(
								descriptor._id,
								descriptor.widgetTypeName,
								descriptor.title,
								descriptor.columnId,
								descriptor.row,
								descriptor.background,
								WindowState.FromValue(descriptor.windowState.value),
								descriptor.parameters,
								descriptor.relations)
							)
							) :
						new WidgetBoardRowMarker
							(
							item._id,
							item.index
							)
				)
			)
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	public synchronizeItems(items: WidgetBoardItem[]): Observable<WidgetBoardItem[]> {
		return this.http.post('/api/core/widgets/widgetBoardItem/', new ServerCommand("synchronize", items))
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}
}
