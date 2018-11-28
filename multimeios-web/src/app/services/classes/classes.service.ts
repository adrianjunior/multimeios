import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Class } from '../../models/class.model';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map'
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  classes: Class[];
  class: Class;

  classesChanged = new Subject<Class[]>();
  classChanged = new Subject<Class>();

  isLoading = new Subject<boolean>();

  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {}

  //Create
  addClass(clss: Class) {
    this.isLoading.next(true);
    this.db
      .collection('classes')
      .add(clss)
      .then(res => {
        this.isLoading.next(false);
        this.openSnackBar('Turma cadastrada com sucesso!', 'OK');
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
  editClass(id: string, clss: Class) {
    this.isLoading.next(true);
    this.db
      .collection('classes')
      .doc(id)
      .update(clss)
      .then(res => {
        this.isLoading.next(false);
        this.openSnackBar('Turma editada com sucesso!', 'OK');
      })
      .catch(err => {
        this.isLoading.next(false);
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
      })
  }

  //Delete
  deleteClass(id: string) {
    this.isLoading.next(true);
    this.db
      .collection('classes')
      .doc(id)
      .delete()
      .then(res => {
        this.isLoading.next(false);
        this.openSnackBar('Turma excluida com sucesso!', 'OK');
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

  //SnackBar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
