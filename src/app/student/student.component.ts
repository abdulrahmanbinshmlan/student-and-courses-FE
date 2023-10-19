import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';
import { CoursesElement } from '../courses/courses.component';
import { Observable, of } from 'rxjs';
import { StudentService } from '../core/services/student.service';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

export interface StudentElement {
  name: string;
  id: number;
  courses: Array<CoursesElement>;
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'courses', 'add'];
  dataSource = new MatTableDataSource();
  public studentList: StudentElement[];
  isLoad = false;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private studentService: StudentService
  ) {}

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getAllStudents();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllStudents() {
    this.studentService.getAllStudents().subscribe((data) => {
      this.studentList = data;
      this.studentList.forEach((student) => this.dataSource.data.push(student));
      this.isLoad = true;
    });
  }

  deleteStudent(student: StudentElement) {
    const index = this.dataSource.data.indexOf(student);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  editStudent(isNew: boolean, student?: StudentElement): void {
    this.dataSource;
    console.log(student);
    const dialogRef = this.dialog.open(StudentDialogComponent, {
      data: { name: student?.name, courses: student?.courses, isNew: isNew },
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
