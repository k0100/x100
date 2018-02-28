import { Injectable } from '@angular/core';
import { WidgetBase } from '../widget-base';
import { TodoComponent } from '../../../widgets/todo/todo.component';
import { NoteComponent } from '../../../widgets/note/note.component';
import { LibraryComponent } from '../../../widgets/library/library.component';

@Injectable()
export class WidgetDescriptorResolverService {
	public types: { widget: new (...args: any[]) => WidgetBase, name: string, className: string }[] = [];

	constructor() {

		this.types = [];

		this.types.push({
			name: 'Library Widget', widget: LibraryComponent, className: 'LibraryComponent'
		});

		this.types.push({
			name: 'Tasks Widget', widget: TodoComponent, className: 'TodoComponent'
		});

		this.types.push({
			name: 'Notes Widget', widget: NoteComponent, className: 'NoteComponent'
		});


		console.log(this.types);
	}

	public resolve(name: string): new (...args: any[]) => WidgetBase {
		var found = this.types.find(x => x.className == name);

		return found ? found.widget : null;

	}

	public getMappings(): { widget: new (...args: any[]) => WidgetBase, className: string, name: string }[] {
		return this.types;
	}
}