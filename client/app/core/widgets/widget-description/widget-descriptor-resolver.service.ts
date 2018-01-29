import { Injectable } from '@angular/core';
import { WidgetBase } from '../widget-base';
import { TodoComponent } from '../../../widgets/todo/todo.component';
import { NoteComponent } from '../../../widgets/note/note.component';
import { LibraryComponent } from '../../../widgets/library/library.component';

@Injectable()
export class WidgetDescriptorResolverService {
	private mappings: { [name: string]: { widget: new (...args: any[]) => WidgetBase, name: string } } = {};

	constructor() {
		this.mappings[TodoComponent.name] = {
			name: 'Tasks Widget', widget: TodoComponent
		};
		this.mappings[NoteComponent.name] = {
			name: 'Notes Widget', widget: NoteComponent
		};
		this.mappings[LibraryComponent.name] = {
			name: 'Library Widget', widget: LibraryComponent
		};
	}

	public resolve(name: string): new (...args: any[]) => WidgetBase {
		return this.mappings[name].widget;
	}

	public getMappings(): { widget: new (...args: any[]) => WidgetBase, name: string }[] {
		let types: { widget: new (...args: any[]) => WidgetBase, name: string }[] = [];
		for (let i in this.mappings) {
			types.push(this.mappings[i]);
		}
		return types;
	}
}