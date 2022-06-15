import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
export class todo {
  constructor(
    public id: number,
    public content: string,
    public completed: number
  ) {}
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router
  ) {}

  encapsulation!: ViewEncapsulation.None;

  todo: any;
  todoTrue: any;
  todoFalse: any;

  task = new FormControl('');

  change(a: { index: any }) {
    if (a.index == 0) {
      this.get();
    }
    if (a.index == 1) {
      this.get();
    }
    if (a.index == 2) {
      this.get();
    }
  }

  ngOnInit(): void {
    this.get();
  }

  post() {
    const reqBody = {
      content: this.task.value,
      completed: 0,
    };
    this.http
      .post('http://127.0.0.1:8000/api/todo-create/', reqBody)
      .subscribe((res) => {
        console.log(res);
      });

    this._snackBar.open('Dodałeś zadanie', 'Ok');
    this.get();
    this.get();
  }

  delete(id: number) {
    console.log(id);
    this.http
      .get(`http://127.0.0.1:8000/api/todo-delete/${id}/`)
      .subscribe((res) => {
        console.log(res);
      });

    this._snackBar.open('Usunąłeś zadanie', 'Ok');

    this.get();
  }

  get() {
    this.http
      .get<todo>('http://127.0.0.1:8000/api/todo-list/')
      .subscribe((res) => {
        this.todo = res;
      });

    this.http
      .get<todo>('http://127.0.0.1:8000/api/todo-bool/1/')
      .subscribe((res) => {
        this.todoTrue = res;
      });
    this.http
      .get<todo>('http://127.0.0.1:8000/api/todo-bool/0/')
      .subscribe((res) => {
        this.todoFalse = res;
      });
  }
}
