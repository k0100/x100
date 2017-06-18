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


@Injectable()
export class WidgetBoardItemsService {
	constructor(private http: HttpService1) {
	}
}