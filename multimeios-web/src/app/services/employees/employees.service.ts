import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Employee } from '../../models/employee.model';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map'
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { AngularFireModule } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  employees: Employee[];
  employee: Employee;

  employeesChanged = new Subject<Employee[]>();
  employeeChanged = new Subject<Employee>();
  employeeAdded = new Subject<boolean>();

  isLoading = new Subject<boolean>();

  constructor(private db: AngularFirestore, private authentication: AngularFireAuth, private snackBar: MatSnackBar) {}

  //Create
  addEmployee(employee: Employee, password: string) {
    this.isLoading.next(true);
    this.authentication.auth.createUserAndRetrieveDataWithEmailAndPassword(employee.email, password)
      .then(data => {
        this.db
          .collection('employees')
          .doc(data.user.uid)
          .set(employee)
          .then(res => {
            this.isLoading.next(false);
            this.employeeAdded.next(true);
            this.openSnackBar('Funcionário cadastrado com sucesso!', 'OK');
          })
          .catch(err => {
            this.isLoading.next(false);
            this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
          })
      })
      .catch(err => {
        this.isLoading.next(false);
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
      })
  }

  //Read
  getEmployee(id: string) {
    this.isLoading.next(true);
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
        this.isLoading.next(false);
      })
  }

  //Update
  editEmployee(id: string, employee: Employee) {
    this.isLoading.next(true);
    this.db
      .collection('employees')
      .doc(id)
      .update(employee)
      .then(res => {
        this.isLoading.next(false);
        this.openSnackBar('Funcionário editado com sucesso!', 'OK');
      })
      .catch(err => {
        this.isLoading.next(false);
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
      })
  }

  //Delete
  deleteEmployee(id: string) {
    this.isLoading.next(true);
    this.db
      .collection('employees')
      .doc(id)
      .delete()
      .then(res => {
        this.isLoading.next(false);
        this.openSnackBar('Funcionário excluido com sucesso!', 'OK');
      })
      .catch(err => {
        this.isLoading.next(false);
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
      })
  }

  //Read List
  getEmployees() {
    this.isLoading.next(true);
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
      this.employeesChanged.next([...this.employees]);
      this.isLoading.next(false);
    })
  }

  getCurrentEmployee() {
    this.getEmployee(this.authentication.auth.currentUser.uid);
  }

  //SnackBar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
