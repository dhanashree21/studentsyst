import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/shared/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  constructor(private service:StudentService) { }

  listData:MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName', 'email', 'mobile', 'city', 'departmentName','gender','hireDate','actions'];
  ngOnInit() {
    this.service.getStudents().subscribe(
      list => {
        let array = list.map(item => {
          
          return {
            $key: item.key,
      
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
       
        
      });
  }



  onDelete($key){
    if(confirm('Are you sure to delete this record ?')){
    this.service.deleteStudent($key);
    // this.notificationService.warn('! Deleted successfully');
    }
  }

}
