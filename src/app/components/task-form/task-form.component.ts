import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/Task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  taskForm: FormGroup;

  editTask: Task = null; 
  taskId: string;

  constructor(private taskService: TasksService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
    this.getUrlParams();
  }

  getUrlParams(): void {
    this.route.paramMap.subscribe((params) => {
      this.taskId = params.get('taskId');

      if (this.taskId) {
        this.taskService.getTask(this.taskId).subscribe((item) => {
          this.editTask = {
            $key: item.payload.id,
            ...item.payload.data(),
          };

          this.taskForm.patchValue({
            title: this.editTask.title,
            description: this.editTask.description,
          });
        });
      }
    });
  }
  createForm(): void {
    this.taskForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }

  createTask(newTask: Task): void {
    this.taskService.createTask(newTask).then( res => {
      this.router.navigate(['/']);
    }).catch(err => console.log(err));
  }

  updateTask(newTask: Task): void {
    this.taskService.updateTask(newTask, this.taskId).then((res) => {
      this.router.navigate(['']);
    }).catch(err => console.log(err));
  }

  onSubmit(): void {
    const newTask: Task = {
      title: this.taskForm.get('title').value,
      description: this.taskForm.get('description').value
    };

    if (this.editTask) {
      this.updateTask(newTask);
      return;
    }
    this.createTask(newTask);
    console.log("Formulario enviado!", newTask);
  }

}
