import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: Array<Task> = [];

  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(): void {
    this.taskService.getAllTasks().subscribe(items => {
      this.tasks = items.map(
        (item) =>
          ({
            ...item.payload.doc.data(),
            $key: item.payload.doc.id
          } as Task)
      );

    });
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).then(res => {}).catch(err => {console.log(err)});
  }
}
