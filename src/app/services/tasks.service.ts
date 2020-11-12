import { Injectable } from '@angular/core';

import {
  Action,
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  DocumentReference,
  DocumentSnapshot,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private taskCollection: AngularFirestoreCollection<Task>;

  constructor(private db: AngularFirestore) {
    this.taskCollection = this.db.collection<Task>('tasks');

  }
  
  getTask(taskId: string): Observable<Action<DocumentSnapshot<Task>>> {
    return this.taskCollection.doc<Task>(taskId).snapshotChanges();
  }

  getAllTasks(): Observable<DocumentChangeAction<Task>[]> {
    return this.taskCollection.snapshotChanges();
  }

  createTask(newTask: Task): Promise<any> {
    return this.taskCollection.add(newTask);
  }

  updateTask(data: Task, docId: string): Promise<void> {
    return this.taskCollection.doc<Task>(docId).update(data);
  }

  deleteTask(docId: string): Promise<void> {
    return this.taskCollection.doc<Task>(docId).delete();
  }
}
