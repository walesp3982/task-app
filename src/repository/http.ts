import { inject, Service } from "@angular/core";
import { CreateTaskDto, Task, TaskRepositoryInterface } from "./interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Service()
export class TaskRepositoryHttp implements TaskRepositoryInterface{
    private apiUrl ='http://localhost:8080/tasks';

    private http = inject(HttpClient);

    public createTask(dto: CreateTaskDto): Observable<Task> {
        return this.http.post<Task>(this.apiUrl, dto);
    }

    public getTaskById(id: number): Observable<Task | null> {
        return this.http.get<Task | null>(`${this.apiUrl}/${id}`);
    }

    public updateTask(id: number, task: Task): Observable<Task> {
        return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
    }

    public deleteTask(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    public getAllTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.apiUrl);
    }
}   