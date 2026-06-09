import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListTask } from './list-task/list-task';

@Component({
  selector: 'app-root',
  imports: [ListTask, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('task-app');
}
