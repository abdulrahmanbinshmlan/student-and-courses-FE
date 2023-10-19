import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { CoursesElement } from 'src/app/courses/courses.component';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private _url: string = `http://localhost:3000/courses`;
  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<CoursesElement[]> {
    return this.http.get<CoursesElement[]>(this._url);
  }
}
