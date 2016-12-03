import { Component, ComponentRef, Input, ViewContainerRef, ViewChild, ComponentFactory} from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule  } from '@angular/forms';
import { SecureService } from './secure.service';
import { Principal } from '../../core/secure/principal';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
	templateUrl: './app/pages/secure/signup.component.html',
	providers: [SecureService, ToastyService, ToastyConfig]
})

export class SignUpComponent {
	form: FormGroup;
	email = new FormControl("", Validators.required);
	password = new FormControl("", Validators.required);

	constructor(private secureService: SecureService, private toastyService: ToastyService, private toastyConfig: ToastyConfig, fb: FormBuilder) {
		this.form = fb.group({
			"email": this.email,
			"password": this.password
        });
	}
	private printError(error: string) {
		var toastOptions: ToastOptions = {
            title: "Error",
            msg: error,
            showClose: true,
            timeout: 5000,
            theme: 'bootstrap'
        };
        // Add see all possible types in one shot
        this.toastyService.error(toastOptions);
	}
	signUp(form: FormGroup): void {

		if (form.valid) {
			this.secureService.signUp(this.email.value, this.password.value)
				.subscribe(result => {
					console.log(result);
				},
				err => {
					this.printError(err);
				});
		}
	}
}
