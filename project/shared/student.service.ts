import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private firebase:AngularFireDatabase,private datePipe: DatePipe) { }
  studentList:AngularFireList<any>

  form:FormGroup = new FormGroup({
    $key:new FormControl(null),
    fullname:new FormControl('', Validators.required),
    email:new FormControl('',Validators.email),
    mobile:new FormControl('',[Validators.required, Validators.minLength(10)]),
    city:new FormControl(''),
    gender:new FormControl('1'),
    department:new FormControl(0),
    hireDate:new FormControl(''),
  })
  initializeFormGroup()
  {
    this.form.setValue({
      $key:null,
      fullname:'',
      email:'',
      mobile:'',
      city:'',
      gender:'1',
      department:0,
      hireDate:''
    })
  }


  getStudents()
  {
    this.studentList = this.firebase.list('students');
    return this.studentList.snapshotChanges();
  }

  insertStudent(student)
  {
    this.studentList.push({
      fullname:student.fullname,
      email:student.email,
      mobile:student.mobile,
      city:student.city,
      gender:student.gender,
      department:student.department,
      hireDate:student.hireDate =="" ? "" : this.datePipe.transform(student.hireDate, 'yyyy-MM-dd')

    });
  }
  updateStudent(student)
   
  { this.studentList.update(student.$key,{
    fullname:student.fullname,
    email:student.email,
    mobile:student.mobile,
    city:student.city,
    gender:student.gender,
    department:student.department,
    // hireDate:student.hireDate == "" ? "" : this.datePipe.transform(student.hireDate, 'yyyy-MM-dd'),

  });
}

  deleteStudent($key:string)
  {
this.studentList.remove($key);
  }



}
