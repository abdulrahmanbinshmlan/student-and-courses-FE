import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource } from '@angular/material/table';
import { CoursesDialogComponent } from './courses-dialog/courses-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from '../core/services/course.service';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable, of } from 'rxjs';

export interface CoursesElement {
  name: string;
  position: number;
}
 export let coursesListTable: CoursesElement[] = [];

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'name','add'];
  dataSource = new MatTableDataSource();
  private coursesList: CoursesElement[];
  isLoad = false;

  constructor(private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog, private courseService: CourseService) {}

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
      this.getAllCourses();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(data => {
      this.coursesList = data;
      coursesListTable = data;
      this.coursesList.forEach(course => this.dataSource.data.push(course));
      this.isLoad = true;
    });
  }

  deleteStudent(course: CoursesElement) {
    const index = this.dataSource.data.indexOf(course);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
  
  editCourse(isNew: boolean, course?: CoursesElement): void {
    const dialogRef = this.dialog.open(CoursesDialogComponent, {
      data: {name: course?.name, isNew: isNew},
      height: '400px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
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
