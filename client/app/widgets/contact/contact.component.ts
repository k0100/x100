import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Contact } from './contact';
import { WidgetBase } from '../../core/widgets/widget-base';
import { ContactService } from './contact.service';
import { concat } from 'rxjs/observable/concat';

@Component({
    selector: 'contact',
    templateUrl: './app/widgets/contact/contact.component.html',
    providers: [ContactService],
    host: { class: 'widget' },
})

export class ContactComponent extends WidgetBase {
    form: FormGroup;
    newName = new FormControl("", Validators.required);
    newPhone = new FormControl("", Validators.required);
    newNote = new FormControl("", Validators.required);
    newBirthday = new FormControl("");

    private maxHeadingLength: number = 30;
    private maxSubHeadingLength: number = 130;

    public contacts: Contact[] = [];

    private addNew: boolean = false;

    constructor(private service: ContactService, fb: FormBuilder) {
        super();
        this.form = fb.group({
            "newName": this.newName,
            "newPhone": this.newPhone,
            "newNote": this.newNote,
            "newBirthday": this.newBirthday
        });
    }

    public addContact(form: FormGroup) {
        if (form.valid) {
            const contact = new Contact(this.id,
                this.newName.value,
                this.newNote.value,

                new Date(this.newBirthday.value), [...this.newPhone.value]);

            this.service.createContact(contact).subscribe(result => {
                this.contacts.push(contact);
                this.newPhone.setValue('');
                this.newName.setValue('');
                this.newNote.setValue('');
                this.newBirthday.setValue('');
                this.addNew = false;
            });
        }
    }

    public deleteContact(contact: Contact) {
        this.service.deleteContact(contact).subscribe(result => {
            const index = this.contacts.indexOf(contact);
            this.contacts.splice(index, 1);
        });
    }

    public load(): void {
        this.service.getContacts(this.id)
            .subscribe(contacts => this.contacts = contacts);
    }
}