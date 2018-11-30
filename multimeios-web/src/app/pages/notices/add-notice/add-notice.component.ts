import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NoticesService } from '../../../services/notices/notices.service';
import { Notice } from '../../../models/notice.model';
import * as moment from 'moment';
import { EmployeesService } from '../../../services/employees/employees.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-add-notice',
  templateUrl: './add-notice.component.html',
  styleUrls: ['./add-notice.component.css']
})
export class AddNoticeComponent implements OnInit {

  loading: boolean = false;
  employee: Employee;

  constructor(private noticesService: NoticesService, private employeesService: EmployeesService) { }

  ngOnInit() {
    this.noticesService.isLoading.subscribe(loading => {
      this.loading = loading;
    })
    this.employeesService.employeeChanged.subscribe(employee => {
      this.employee = employee;
    })
    this.employeesService.getCurrentEmployee();
  }

  postNotice(form: NgForm) {
    const notice: Notice = {
      title: form.value.title,
      body: form.value.body,
      dateTime: moment().toISOString(),
      edited: false,
      employeeId: this.employee.id,
      employeeName: this.employee.name
    }
    this.noticesService.addNotice(notice);
  }
}
