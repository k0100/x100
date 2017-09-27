import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, ConnectionBackend, XHRBackend, RequestOptions } from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { HomeComponent } from '../app/pages/home/home.component'
import { DragulaModule } from 'ng2-dragula/ng2-dragula'
import { ToastyModule } from 'ng2-toasty';
import { ColorPickerModule } from 'angular2-color-picker';

import { WidgetBoardComponent } from '../app/core/widgets/widget-board/widget-board.component'
import { WidgetWrapperComponent } from '../app/core/widgets/widget-wrapper.component'
import { WidgetSelectorComponent } from '../app/core/widgets/widget-selector.component'

import { SignUpComponent } from './pages/secure/signup.component';
import { SignInComponent } from './pages/secure/signin.component';


import { ClockComponent } from '../app/widgets/clock/clock.component'
import { EmptyComponent } from '../app/widgets/empty/empty.component'
import { NoteComponent } from '../app/widgets/note/note.component'
import { TodoComponent } from '../app/widgets/todo/todo.component'
import { LibraryComponent } from './widgets/library/library.component';
import { HttpService1 } from "./core/http/http-intercept";
import { Router } from "@angular/router";
import { DndModule } from 'ng2-dnd';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { BsDropdownModule } from 'ngx-bootstrap';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { FileUploadModule } from 'ng2-file-upload';
@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		DragulaModule,
		routing,
		ToastyModule,
		ColorPickerModule,
		DndModule.forRoot(),
		InlineEditorModule,
		BsDropdownModule.forRoot(),
		FileUploadModule
	],
	providers: [
		{
			provide: HttpService1,
			deps: [Router, XHRBackend, RequestOptions],
			useFactory: (router: Router, backend: XHRBackend, options: RequestOptions) => {
				return new HttpService1(router, backend, options);
			}
		}
	],
	declarations: [
		AppComponent,
		HomeComponent,

		PdfViewerComponent,
		SignUpComponent,
		SignInComponent,

		WidgetBoardComponent,
		WidgetWrapperComponent,
		WidgetSelectorComponent,

		ClockComponent,
		EmptyComponent,
		NoteComponent,
		TodoComponent,
		LibraryComponent,
		
	
		
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
