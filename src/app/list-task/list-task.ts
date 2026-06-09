import { Component, inject, signal } from '@angular/core';
import { Task, TaskRepositoryInterface } from '../../repository/interface';
import { TaskRepositoryHttp } from '../../repository/http';
import { TaskRepositoryMemory } from '../../repository/memory';


@Component({ 
  selector: 'app-list-task',
  imports: [],
  templateUrl: './list-task.html',
  styleUrl: './list-task.css',
})

export class ListTask {
  taskService: TaskRepositoryInterface = inject(TaskRepositoryMemory);
  tasks: Task[] = [];
  ngOnInit() {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
      console.log(tasks)
    });
  }
}
