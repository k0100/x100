import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppComponent }  from './app.component';
import { routing }  from './app.routes';
import { HomeComponent } from '../app/pages/home/home.component'
import { DragulaModule  } from 'ng2-dragula/ng2-dragula'
import { ToastyModule } from 'ng2-toasty';


import { WidgetBoardComponent } from '../app/core/widgets/widget-board.component'
import { WidgetWrapperComponent } from '../app/core/widgets/widget-wrapper.component'
import { WidgetSelectorComponent } from '../app/core/widgets/widget-selector.component'

import { SignUpComponent } from './pages/secure/signup.component';
import { SignInComponent } from './pages/secure/signin.component';


import { ClockComponent } from '../app/widgets/clock/clock.component'
import { EmptyComponent } from '../app/widgets/empty/empty.component'
import { NoteComponent } from '../app/widgets/note/note.component'
import { TodoComponent } from '../app/widgets/todo/todo.component'


@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		DragulaModule,
		routing,
		ToastyModule
	],
	declarations: [
		AppComponent,
		HomeComponent,
		
		SignUpComponent,
		SignInComponent,

		WidgetBoardComponent,
		WidgetWrapperComponent,
		WidgetSelectorComponent,

		ClockComponent,
		EmptyComponent,
		NoteComponent,
		TodoComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
