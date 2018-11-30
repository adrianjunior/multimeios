import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../../../services/classes/classes.service';
import { NgForm } from '@angular/forms';
import { Class } from '../../../models/class.model';
import { EmployeesService } from '../../../services/employees/employees.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  loading: boolean = false;
  employee: Employee;

  constructor(private classesService: ClassesService, private employeesService: EmployeesService) { }

  ngOnInit() {
    this.classesService.isLoading.subscribe(loading => {
      this.loading = loading;
    })
    this.employeesService.employeeChanged.subscribe(employee => {
      this.employee = employee;
    })
    this.employeesService.getCurrentEmployee();
  }

  addClass(form: NgForm) {
    const clss: Class = {
      name: form.value.name
    }
    this.classesService.addClass(clss, this.employee);
  }

}
