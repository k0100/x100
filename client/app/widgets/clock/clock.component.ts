import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { WidgetBase } from '../../core/widgets/widget-base';
import { Observable } from 'rxjs/Rx';
import { WidgetMenuItem } from '../../core/widgets/widget-menu/widget-menu-item';
import { SetClockWidgetMenuItem } from './menu/SetClockWidgetMenuItem';

@Component({
	selector: 'clock',
	templateUrl: './app/widgets/clock/clock.component.html',
})

export class ClockComponent extends WidgetBase {
	initMenuItems(): WidgetMenuItem[] {
		let menuItems = new Array<WidgetMenuItem>();
		menuItems.push(new SetClockWidgetMenuItem(this.id));
		return menuItems;
	}
	load(): void {

	}
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

	public test() {
		this.isMinimized = true;
	}
}