import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../models/user.model';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map'
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[];
  user: User;

  usersChanged = new Subject<User[]>();
  userChanged = new Subject<User>();

  constructor(private db: AngularFirestore, private authentication: AngularFireAuth, private snackBar: MatSnackBar) { }

  //Create
  addUser(user: User, password: string, isStudent: boolean) {
    if(isStudent) {
      this.authentication.auth.createUserWithEmailAndPassword(user.email, password)
      .then(res => {
        this.db
          .collection('users')
          .add(user)
          .then(res => {
            this.openSnackBar('Usuário Cadastrado com sucesso!', 'OK')
          });
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  //Read
  getUser(id: string) {
    this.db
      .collection('users')
      .doc(id)
      .snapshotChanges()
      .map(doc => {
        return {
          id: doc.payload.id,
          ...doc.payload.data()
        } as User;
      })
      .subscribe((user: User) => {
        this.user = user;
        this.userChanged.next(this.user)
      })
  }

  //Update
  editUser(id: string, user: User) {
    this.db
      .collection('users')
      .doc(id)
      .update(user)
  }

  //Delete
  deleteUser(id: string) {
    this.db
      .collection('users')
      .doc(id)
      .delete()
  }

  //Read List
  getUsers() {
    this.db
    .collection('users')
    .snapshotChanges()
    .map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
        } as User;
      });
    })
    .subscribe((users: User[]) => {
      this.users = users;
      this.usersChanged.next([...this.users])
    })
  }

  //SnackBar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
