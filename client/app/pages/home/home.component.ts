import { Component, ComponentRef, Input, ViewContainerRef, ViewChild, ComponentFactory } from '@angular/core'

import { WidgetBoardComponent } from '../../core/widgets/widget-board/widget-board.component';
import { WindowState } from '../../core/widgets/window-state/window-state';

@Component({
	selector: 'home',
	templateUrl: './app/pages/home/home.component.html',
	styleUrls: ['./app/pages/home/home.css'],
})

export class HomeComponent {
	@ViewChild('board') board: WidgetBoardComponent;

	constructor() { }

	ngAfterViewInit() {
		setTimeout(() => {
			this.board.load();
		}, 0);
	}
}
