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
    newContactName = new FormControl("", Validators.required);
    newContactPhone = new FormControl("", Validators.required);
    newContactNote = new FormControl("", Validators.required);
    
    private maxHeadingLength: number = 30;
    private maxSubHeadingLength: number = 130;

    public contacts: Contact[] = [];

    private addNew: boolean = false;

    constructor(private service: ContactService, fb: FormBuilder) {
        super();
        this.form = fb.group({
            "newContactName": this.newContactName,
            "newContactPhone": this.newContactPhone,
            "newContactNote": this.newContactNote
        });
    }

    public addContact(form: FormGroup) {
        if (form.valid) {
            const contact = new Contact(this.id,
                this.newContactName.value,
                this.newContactNote.value,
                new Date(), []);

            this.service.createContact(contact).subscribe(result => {
                this.contacts.push(contact);
                this.newContactName.setValue('');
                this.newContactNote.setValue('');
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