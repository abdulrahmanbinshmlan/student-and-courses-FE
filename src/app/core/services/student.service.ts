import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { StudentElement } from 'src/app/student/student.component';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private _url: string = `http://localhost:3000/students`;
  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<StudentElement[]> {
    return this.http.get<StudentElement[]>(this._url);
  }
}
