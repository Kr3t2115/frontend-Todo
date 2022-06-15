import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  id: string | undefined;
  group: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    fb: FormBuilder,
    private router: Router
  ) {
    this.group = fb.group({
      content: '',
      completed: false,
    });
  }

  complete = false;
  todo: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.http
      .get(`http://127.0.0.1:8000/api/todo-detail/${this.id}/`)
      .subscribe(
        (res) => {
          this.todo = res;
        },
        (err) => {
          this.router.navigate(['']);
          console.log(err);
        }
      );
  }
  submit() {
    const reqBody = this.group.value;

    console.log(reqBody);
    this.http
      .post(`http://127.0.0.1:8000/api/todo-update/${this.id}/`, reqBody)
      .subscribe((res) => {
        console.log(res);
      });
    this.router.navigate(['']);
  }
  click() {
    if (this.complete == true) {
      this.complete = false;
    } else {
      this.complete = true;
    }
    console.log(this.complete);
  }
}
