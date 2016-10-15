import {Component} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule  }from '@angular/forms';
import {Task} from './task';
import {WidgetBase} from '../../core/widgets/widget-base';
import {TaskService} from './tasks.service';

@Component({
	selector: 'todo',
	templateUrl: './app/widgets/todo/todo.component.html',
	providers: [TaskService]
})

export class TodoComponent extends WidgetBase {
	form: FormGroup;
	newTask = new FormControl("", Validators.required);
	public tasks: Task[] = [];

	constructor(private service: TaskService, fb: FormBuilder) {
		super();
		this.form = fb.group({
            "newTask": this.newTask
        });

        service.getTasks().subscribe(tasks => this.tasks = tasks);
	}

	public addNewTask(form: FormGroup) {
		if (form.valid) {
			const task = new Task(this.newTask.value);
			this.service.createTask(task).subscribe(result => {
				this.tasks.push(task);
				this.newTask.setValue('');
			});
		}
	}

	public deleteTask(task: Task) {
		this.service.deleteTask(task).subscribe(result => {
			const index = this.tasks.indexOf(task);
			this.tasks.splice(index, 1);
		});
	}
}
