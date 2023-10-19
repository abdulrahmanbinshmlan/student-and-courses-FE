import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentDialogComponent } from 'src/app/student/student-dialog/student-dialog.component';
import { CoursesElement } from '../courses.component';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrls: ['./courses-dialog.component.scss']
})
export class CoursesDialogComponent implements OnInit {
  name = new FormControl('');
  constructor(public dialogRef: MatDialogRef<CoursesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
   
  }

    onNoClick(): void {
      this.dialogRef.close();
    }
}
