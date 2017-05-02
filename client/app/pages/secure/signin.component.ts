import { Component, ComponentRef, Input, ViewContainerRef, ViewChild, ComponentFactory } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SecureService } from './secure.service';
import { Principal } from '../../core/secure/principal';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
	templateUrl: './app/pages/secure/signin.component.html',
	providers: [SecureService, ToastyService, ToastyConfig]
})

export class SignInComponent {
	form: FormGroup;
	email = new FormControl("", Validators.required);
	password = new FormControl("", Validators.required);

	constructor(private secureService: SecureService, private toastyService: ToastyService, private toastyConfig: ToastyConfig, fb: FormBuilder, private router: Router) {
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
	signIn(form: FormGroup): void {
		if (form.valid) {
			this.secureService.signIn(this.email.value, this.password.value)
				.subscribe(result => {
					this.router.navigate(['/']);
				},
				err => {
					this.printError(err);
				});
		}
	}
}
