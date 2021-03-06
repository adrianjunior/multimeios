import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore';
import { Class } from '../../models/class.model';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';
import 'rxjs/add/operator/map'
import { MatSnackBar } from '@angular/material';
import { LogItem } from '../../models/logitem.model';
import { Employee } from '../../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  classes: Class[];
  class: Class;
  logItems: LogItem[];

  classesChanged = new Subject<Class[]>();
  classChanged = new Subject<Class>();
  logItemsChanged = new Subject<LogItem[]>();

  isLoading = new Subject<boolean>();
  didEdit = new Subject<boolean>();
  didDelete = new Subject<boolean>();

  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {}

  //Create
  addClass(clss: Class, employee: Employee) {
    this.isLoading.next(true);
    this.db
      .collection('classes')
      .add(clss)
      .then(res => {
        this.isLoading.next(false);
        this.openSnackBar('Turma cadastrada com sucesso!', 'OK');
        let logItem: LogItem = {
          type: 'Cadastro de Turma',
          dateTime: moment().toISOString(),
          employeeName: employee.name,
          bookTitle: clss.name
        }
        this.addLogItem(logItem);
      })
      .catch(err => {
        this.isLoading.next(false);
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
      })
  }

  //Read
  getClass(id: string) {
    this.isLoading.next(true);
    this.db
      .collection('classes')
      .doc(id)
      .snapshotChanges()
      .map(doc => {
        return {
          id: doc.payload.id,
          ...doc.payload.data()
        } as Class;
      })
      .subscribe((clss: Class) => {
        this.class = clss;
        this.classChanged.next(this.class);
        this.isLoading.next(false);
      })
  }

  //Update
  editClass(clss: Class, employee: Employee) {
    this.isLoading.next(true);
    this.db
      .collection('classes')
      .doc(clss.id)
      .set(clss)
      .then(res => {
        this.isLoading.next(false);
        this.didEdit.next(true);
        this.openSnackBar('Turma editada com sucesso!', 'OK');
        let logItem: LogItem = {
          type: 'Edição de Turma',
          dateTime: moment().toISOString(),
          employeeName: employee.name,
          bookTitle: clss.name
        }
        this.addLogItem(logItem);
      })
      .catch(err => {
        this.isLoading.next(false);
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
      })
  }

  //Delete
  deleteClass(clss: Class, employee: Employee) {
    this.isLoading.next(true);
    this.db
      .collection('classes')
      .doc(clss.id)
      .delete()
      .then(res => {
        this.isLoading.next(false);
        this.didDelete.next(true);
        this.openSnackBar('Turma excluida com sucesso!', 'OK');
        let logItem: LogItem = {
          type: 'Exclusão de Turma',
          dateTime: moment().toISOString(),
          employeeName: employee.name,
          bookTitle: clss.name,
        }
        this.addLogItem(logItem);
      })
      .catch(err => {
        this.isLoading.next(false);
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
      })
  }

  //Read List
  getClasses() {
    this.isLoading.next(true);
    this.db
    .collection('classes')
    .snapshotChanges()
    .map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
        } as Class;
      });
    })
    .subscribe((clsses: Class[]) => {
      this.classes = clsses;
      this.classesChanged.next([...this.classes])
      this.isLoading.next(false);
    })
  }

  addLogItem(logItem: LogItem) {
    this.db
      .collection('logs')
      .add(logItem)
  }

  //SnackBar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
