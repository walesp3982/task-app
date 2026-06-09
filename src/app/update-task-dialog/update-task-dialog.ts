import { Component, inject, input, output, signal } from '@angular/core';
import { Task, TaskRepositoryInterface } from '../../repository/interface';
import { TaskRepositoryMemory } from '../../repository/memory';
import { form, FormField } from '@angular/forms/signals';


interface UpdateTaskData {
  title: string;
  description: string;
  completed: boolean;
}

const updateModel = signal<UpdateTaskData>({
    title: '',
    description: '',
    completed: false,
  });
  

@Component({
  selector: 'app-update-task-dialog',
  imports: [FormField],
  templateUrl: './update-task-dialog.html',
  styleUrl: './update-task-dialog.css',
})
export class UpdateTaskDialog {
  protected repository: TaskRepositoryInterface = inject(TaskRepositoryMemory);
  protected task: Task | null = null;

  taskId = input.required<number>();
  open = output<boolean>();

  updateForm = form(updateModel);

  close() {
    this.open.emit(false);
  }

  ngOnInit() {
    this.repository.getTaskById(this.taskId()).subscribe(task => {
      if (task === null) {
        this.close();
        console.error('Task not found with id:', this.taskId());
        return;
      }

      this.task = task;

      console.log("Loaded task for update:", task);
      updateModel.set({
        title: task.title,
        description: task.description ?? "",
        completed: task.completed,
      }
      )
    });
  }

  updateTask() {

    if (this.task === null) {
      console.error('No task loaded to update');
      return
    }
    this.task.completed = updateModel().completed;
    this.task.title = updateModel().title;
    this.task.description = updateModel().description;

    this.repository.updateTask(this.taskId(), this.task!).subscribe(updatedTask => {
      console.log('Task updated:', updatedTask);
    });
    this.close();
  }

  deleteTask() {
    this.repository.deleteTask(this.taskId()).subscribe(() => {
      console.log('Task deleted');
      this.close();
    });
  }

}
