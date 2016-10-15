import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule}from '@angular/forms';
import {WidgetBase} from '../../core/widgets/widget-base';
import {Observable} from 'rxjs/Rx';

@Component({
	selector: 'clock',
	templateUrl: './app/widgets/clock/clock.component.html',
})

export class ClockComponent extends WidgetBase {
	private now: Date;
	constructor() {
		super();
		this.now = new Date();
		this.startClock();
	}

	private startClock() {
		Observable.interval(60000)
			.map(x => new Date())
			.subscribe(x => this.now = x);
	}

	public test(){
		this.isMinimized = true;
	}
}