import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { StudentElement } from '../student.component';
import { CoursesElement, coursesListTable } from 'src/app/courses/courses.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.scss']
})
export class StudentDialogComponent implements OnInit {
    courses = coursesListTable;
    studentCourses = new FormControl();
    name = new FormControl('');
  constructor(public dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    console.log(this.data.courses);
    console.log(this.courses);
    let course: CoursesElement[] = [];

    this.data.courses?.forEach((c: { position: number; }) => course.push(this.courses[this.courses.findIndex(item => item.position === c.position)]))
    console.log(course);
    this.studentCourses.setValue(course);
  }

    onNoClick(): void {
      this.dialogRef.close();
    }
}
