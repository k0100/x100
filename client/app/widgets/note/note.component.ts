import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Note } from './note';
import { WidgetBase } from '../../core/widgets/widget-base';
import { NoteService } from './notes.service';

@Component({
	selector: 'note',
	templateUrl: './app/widgets/note/note.component.html',
	providers: [NoteService],
	host: { class: 'widget' },
})

export class NoteComponent extends WidgetBase {
	form: FormGroup;
	newNote = new FormControl("", Validators.required);
	private maxHeadingLength: number = 30;
	private maxSubHeadingLength: number = 130;

	public notes: Note[] = [];

	
	constructor(private service: NoteService, fb: FormBuilder) {
		super();
		this.form = fb.group({
			"newNote": this.newNote
		});


	}

	public getNoteHeading(note: Note): string {
		return note.body.substr(0, this.maxHeadingLength);
	}

	public getNoteSubHeading(note: Note): string {
		let bodyLen = note.body.length;
		let subHeading = bodyLen < this.maxHeadingLength ?
			"" : note.body.substr(this.maxHeadingLength, this.maxSubHeadingLength);
		subHeading += bodyLen < this.maxHeadingLength + this.maxSubHeadingLength ? "" : "...";
		return subHeading;
	}

	public addNewNote(form: FormGroup) {
		if (form.valid) {
			const note = new Note(this.id, this.newNote.value);
			this.service.createNote(note).subscribe(result => {
				this.notes.push(note);
				this.newNote.setValue('');
			});
		}
	}

	public deleteNote(note: Note) {
		this.service.deleteNote(note).subscribe(result => {
			const index = this.notes.indexOf(note);
			this.notes.splice(index, 1);
		});
	}

	public load(): void {
		this.service.getNotes(this.id)
			.subscribe(notes => this.notes = notes);
	}
}
