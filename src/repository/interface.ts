import { Observable } from "rxjs"

export class Task {
    id: number
    title: string
    description?: string
    completed: boolean
    
    constructor(id: number, title: string, completed: boolean, description?: string, ) {
        this.id = id
        this.title = title
        this.description = description
        this.completed = completed
    }
}

export class CreateTaskDto {
    title: string
    description?: string

    constructor(title: string, description?: string) {
        this.title = title
        this.description = description
    }
}
export interface TaskRepositoryInterface {
    createTask(dto: CreateTaskDto): Observable<Task>;
    getTaskById(id: number): Observable<Task | null>;
    getAllTasks(): Observable<Task[]>;
    updateTask(id: number, task: Task): Observable<Task>;
    deleteTask(id: number): Observable<void>;
}