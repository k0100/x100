import { Injectable } from '@angular/core';
import { WidgetBase } from '../widget-base';
import { TodoComponent } from '../../../widgets/todo/todo.component';
import { NoteComponent } from '../../../widgets/note/note.component';
import { ClockComponent } from '../../../widgets/clock/clock.component';

@Injectable()
export class WidgetDescriptorResolverService {
	private mappings: { [name: string]: new (...args: any[]) => WidgetBase; } = {};

	constructor() {
		this.mappings[TodoComponent.name] = TodoComponent;
		this.mappings[NoteComponent.name] = NoteComponent;
		this.mappings[ClockComponent.name] = ClockComponent;
	}

	public Resolve(name: string): new (...args: any[]) => WidgetBase {
		return this.mappings[name];
	}
}