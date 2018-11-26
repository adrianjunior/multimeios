import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Employee } from '../../models/employee.model';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map'
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  employees: Employee[];
  employee: Employee;

  employeesChanged = new Subject<Employee[]>();
  employeeChanged = new Subject<Employee>();

  constructor(private db: AngularFirestore, private authentication: AngularFireAuth, private snackBar: MatSnackBar) {}

  //Create
  addEmployee(employee: Employee, password: string) {
    this.authentication.auth.createUserAndRetrieveDataWithEmailAndPassword(employee.email, password)
      .then(data => {
        this.db
          .collection('employees')
          .doc(data.user.uid)
          .set(employee)
          .then(res => {
            this.openSnackBar('Funcionário Cadastrado com sucesso!', 'OK')
          });
      })
      .catch(err => {
        console.log(err);
      })
  }

  //Read
  getEmployee(id: string) {
    this.db
      .collection('employees')
      .doc(id)
      .snapshotChanges()
      .map(doc => {
        return {
          id: doc.payload.id,
          ...doc.payload.data()
        } as Employee;
      })
      .subscribe((employee: Employee) => {
        this.employee = employee;
        this.employeeChanged.next(this.employee)
      })
  }

  //Update
  editEmployee(id: string, employee: Employee) {
    this.db
      .collection('employees')
      .doc(id)
      .update(employee)
  }

  //Delete
  deleteEmployee(id: string) {
    this.db
      .collection('employees')
      .doc(id)
      .delete()
  }

  //Read List
  getEmployees() {
    this.db
    .collection('employees')
    .snapshotChanges()
    .map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
        } as Employee;
      });
    })
    .subscribe((employees: Employee[]) => {
      this.employees = employees;
      this.employeesChanged.next([...this.employees])
    })
  }

  getCurrentEmployee() {
    return this.authentication.auth.currentUser;
  }

  //SnackBar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
