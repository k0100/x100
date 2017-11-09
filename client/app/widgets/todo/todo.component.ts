import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Todo } from './todo';
import { WidgetBase } from '../../core/widgets/widget-base';
import { TodoService } from './todo.service';

@Component({
	selector: 'todo',
	templateUrl: './app/widgets/todo/todo.component.html',
	providers: [TodoService],
	host: { class: 'widget' },
})

export class TodoComponent extends WidgetBase {
	form: FormGroup;
	newTodo = new FormControl("", Validators.required);
	public todos: Todo[] = [];

	constructor(private service: TodoService, fb: FormBuilder) {
		super();
		this.form = fb.group({
			"newTodo": this.newTodo
		});


	}

	public addNewTodo(form: FormGroup) {
		if (form.valid) {
			const todo = new Todo(this.id, this.newTodo.value, false);
			this.service.createTodo(todo)
				.subscribe(result => {
					this.todos.push(result);
					this.newTodo.setValue('');
				});
		}
	}

	public deleteTodo(todo: Todo) {
		this.service.deleteTodo(todo)
			.subscribe(result => {
				const index = this.todos.indexOf(todo);
				this.todos.splice(index, 1);
			});
	}

	public toggleTodo(todo: Todo) {
		todo.isCompleted = !todo.isCompleted;

		this.service.toggleTodo(todo)
			.subscribe(result => {
			});
	}

	public load(): void {
		this.service.getTodos(this.id)
			.subscribe(todos => this.todos = todos);
	}
}
