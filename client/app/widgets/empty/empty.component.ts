import {Component} from '@angular/core';
import {
	Router,
} from '@angular/router';
import {WidgetBase} from '../../core/widgets/widget-base';

@Component({
	selector: 'empty',
	templateUrl: './app/widgets/empty/empty.html',
})

export class EmptyComponent extends WidgetBase {
}
