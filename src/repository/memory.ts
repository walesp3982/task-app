import { Observable, from } from 'rxjs';
import { CreateTaskDto, TaskRepositoryInterface } from './interface';
import { Task } from './interface';
import { Service } from '@angular/core';

@Service()
export class TaskRepositoryMemory implements TaskRepositoryInterface {
    private tasks: Task[] = [];

    constructor() {
        // Create data of example
        this.createTask(new CreateTaskDto('Task 1', 'Description for Task 1'));
        this.createTask(new CreateTaskDto('Task 2', 'Description for Task 2'));
        this.createTask(new CreateTaskDto('Task 3'));
    }
    createTask(task: CreateTaskDto): Observable<Task> {
        const newTask = new Task(this.tasks.length + 1, task.title, false, task.description);
        this.tasks.push(newTask);
        return new Observable(subscriber => {
            subscriber.next(newTask);
            subscriber.complete();
        });
    }

    getTaskById(id: number): Observable<Task | null> {
        const task = this.tasks.find(task => task.id === id);
        return new Observable(subscriber => {
            subscriber.next(task || null);
            subscriber.complete();
        });
    }

    getAllTasks(): Observable<Task[]> {
        return new Observable(subscriber => {
            subscriber.next(this.tasks);
            subscriber.complete();
        });
    }

    updateTask(id: number, task: Task): Observable<Task> {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            this.tasks[index] = task;
        }
        return new Observable(subscriber => {
            subscriber.next(task);
            subscriber.complete();
        });
    }

    deleteTask(id: number): Observable<void> {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
        return new Observable(subscriber => {
            subscriber.next(undefined);
            subscriber.complete();
        });
    }
}