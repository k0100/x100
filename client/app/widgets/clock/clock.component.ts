import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { WidgetBase } from '../../core/widgets/widget-base';
import { Observable } from 'rxjs/Rx';
import { WidgetMenuItem } from '../../core/widgets/widget-menu/widget-menu-item';
import { TimezoneMenuItem } from './menu/TimezoneMenuItem';
import { BsModalService } from 'ngx-bootstrap';

@Component({
	selector: 'clock',
	templateUrl: './app/widgets/clock/clock.component.html'
})

export class ClockComponent extends WidgetBase {

	initMenuItems(): WidgetMenuItem[] {
		let menuItems = new Array<WidgetMenuItem>();
		menuItems.push(new TimezoneMenuItem(this.id, this.modalService));
		return menuItems;
	}
	load(): void {

	}
	private now: Date;
	constructor(protected modalService: BsModalService
	) {
		super();
		this.now = new Date();
		this.startClock();
	}

	private startClock() {
		Observable.interval(60000)
			.map(x => new Date())
			.subscribe(x => this.now = x);
	}
}