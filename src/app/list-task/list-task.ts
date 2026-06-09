import { Component, inject, output } from '@angular/core';
import { Task, TaskRepositoryInterface } from '../../repository/interface';
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
  changeUpdateTask = output<number>();

  updateActualTask(id: number) {
    this.changeUpdateTask.emit(id);
    console.log(`Updating task with id: ${id}`);
  }

  ngOnInit() {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
      console.log(tasks)
    });
  }

  // Mark as completed 
  toggleCompleted(task: Task) {
    task.completed = !task.completed;
    this.taskService.updateTask(task.id, task).subscribe(() => {
      console.log(`Task ${task.id} updated successfully`);
    });
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  refresh() {
    console.log('Refreshing task list');
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
}
