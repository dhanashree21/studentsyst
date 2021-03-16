import { Component, OnInit } from '@angular/core';

import {StudentService} from '../../shared/student.service'

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(public service:StudentService) { }

  departments= [
    {id:'Comp', value: 'Computer'},
    {id:'Mech', value: 'Mechanical'},
    {id:'Civ', value: 'Civil'}
  ]
  ngOnInit(): void {
    this.service.getStudents()
  }
  onClear()
  {
    this.service.form.reset();
    this.service.initializeFormGroup();

  }
  onSubmit()
  {
    if(this.service.form.valid)
    {
      // alert(this.service.form.get.hireDate);
      this.service.insertStudent(this.service.form.value); 
      this.service.form.reset();
      this.service.initializeFormGroup();
    }
  }

}
