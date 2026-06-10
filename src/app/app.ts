import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListTask } from './list-task/list-task';
import { UpdateTaskDialog } from './update-task-dialog/update-task-dialog';
import { CreateTaskDialog } from './create-task-dialog/create-task-dialog';
import { Task } from '../repository/interface';
import { TaskRepositoryHttp } from '../repository/http';

@Component({
  selector: 'app-root',
  imports: [CreateTaskDialog, UpdateTaskDialog, ListTask, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Dependences
  private repository = inject(TaskRepositoryHttp)

  // Signal
  protected readonly title = signal('task-app');
  protected tasks = signal<Task[]>([])
  protected openCreateTaskDialog = signal(false)

  protected updatedTaskId: number | null = null;



  ngOnInit() {
    this.refresh()
  }

  refresh() {
    console.log("Getting new tasks: ")
    this.repository.getAllTasks().subscribe((tasks) => {
      this.tasks.set(tasks)
      console.log("Fetching tasks completed")
    })
  }
}
