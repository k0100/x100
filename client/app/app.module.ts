import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, ConnectionBackend, XHRBackend, RequestOptions } from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { HomeComponent } from '../app/pages/home/home.component'
import { DragulaModule } from 'ng2-dragula/ng2-dragula'
import { ToastyModule } from 'ng2-toasty';
import { ColorPickerModule } from 'ngx-color-picker';

import { WidgetBoardComponent } from '../app/core/widgets/widget-board/widget-board.component'
import { WidgetWrapperComponent } from '../app/core/widgets/widget-wrapper.component'
import { WidgetSelectorComponent } from '../app/core/widgets/widget-selector.component'

import { SignUpComponent } from './pages/secure/signup.component';
import { SignInComponent } from './pages/secure/signin.component';

import { EmptyComponent } from '../app/widgets/empty/empty.component'
import { NoteComponent } from '../app/widgets/note/note.component'
import { TodoComponent } from '../app/widgets/todo/todo.component'
import { LibraryComponent } from './widgets/library/library.component';
import { ContactComponent } from './widgets/contact/contact.component';
import { HttpService1 } from "./core/http/http-intercept";
import { Router } from "@angular/router";
import { DndModule } from 'ng2-dnd';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { BsDropdownModule, BsModalService, ModalBackdropComponent, ModalModule, TooltipModule, ComponentLoaderFactory, BsDatepickerModule } from 'ngx-bootstrap';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FileUploadModule } from 'ng2-file-upload';
import { FillHeightDirective } from './core/view/fill-height.directive';
import { ScrollControltDirective } from './core/view/scroll-control.directive';
import { HtmlTextDirective } from './core/formatting/html-text.directive';

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
		ModalModule.forRoot(),
		BsDropdownModule.forRoot(),
		BsDatepickerModule.forRoot(),
		PdfViewerModule,
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
		,
		ComponentLoaderFactory
	],
	declarations: [
		AppComponent,
		HomeComponent,

		SignUpComponent,
		SignInComponent,

		WidgetBoardComponent,
		WidgetWrapperComponent,
		WidgetSelectorComponent,

		EmptyComponent,
		NoteComponent,
		TodoComponent,
		LibraryComponent,
		ContactComponent,
		FillHeightDirective,
		ScrollControltDirective,
		HtmlTextDirective,
	],
	entryComponents: [
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
