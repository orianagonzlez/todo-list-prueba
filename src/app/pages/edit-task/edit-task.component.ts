import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/Task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  task: Task = null;
  docId: string;

  constructor() { 
  }

  ngOnInit(): void {
  }

 // getTask(docId: string) {
   // this.taskService.getTask(docId).subscribe(item => {
     // this.task = {
       // ...item.payload.data(),
        //$key: item.payload.id
      //}
      //console.log(this.task);
    //});
  //}
}
