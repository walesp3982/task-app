import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListTask } from './list-task/list-task';
import { UpdateTaskDialog } from './update-task-dialog/update-task-dialog';

@Component({
  selector: 'app-root',
  imports: [UpdateTaskDialog, ListTask, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('task-app');
  protected updatedTaskId: number | null = null;

}
