import { Component, inject, input, model, signal } from '@angular/core';
import { form, minLength, required, FormField } from '@angular/forms/signals';
import { CreateTaskDTO, TaskRepositoryInterface } from '../../repository/interface';
import { TaskRepositoryMemory } from '../../repository/memory';
import { TaskRepositoryHttp } from '../../repository/http';


@Component({
  selector: 'app-create-task-dialog',
  imports: [FormField],
  templateUrl: './create-task-dialog.html',
  styleUrl: './create-task-dialog.css',
})
export class CreateTaskDialog {
  createTaskModel = signal({
    title: "",
    description: ""
  })

  open = model(false)

  createTaskForm = form(this.createTaskModel, (schemaPath) => {
    required(schemaPath.title)
    minLength(schemaPath.title, 1)
  })

  repository: TaskRepositoryInterface = inject(TaskRepositoryHttp)

  submit() {
    let model = this.createTaskModel()
    let dto = new CreateTaskDTO(
      model.title,
      model.description.trim() || undefined
    )

    let task = this.repository.createTask(dto)
    task.subscribe({
      next(x) {
        console.log('Create task ', x);
      },
      error(err) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('Task created correctly');
      },
    })
  }

  close() {
    this.open.set(false)
  }
}
