import { Component, ComponentRef, Input, ViewContainerRef, ViewChild, ComponentFactory } from '@angular/core'

import { WidgetBoardComponent } from '../../core/widgets/widget-board/widget-board.component';
import { WindowState } from '../../core/widgets/window-state/window-state';
import { fail } from 'assert';

@Component({
	selector: 'home',
	templateUrl: './app/pages/home/home.component.html',
	styleUrls: ['./app/pages/home/home.css'],
})

export class HomeComponent {
	showHeader: boolean;
	@ViewChild('board') board: WidgetBoardComponent;

	constructor() {
		this.showHeader = true;
	 }

	onWindowStateChanged(isExpanded: boolean){
		this.showHeader = !isExpanded;
	}
	ngAfterViewInit() {
		setTimeout(() => {
			this.board.load();
		}, 0);
	}
}
