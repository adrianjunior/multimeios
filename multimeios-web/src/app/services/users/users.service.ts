import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../models/user.model';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/take'
import 'rxjs/add/operator/map'
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[];
  user: User;
  userByEmail: User[];

  usersChanged = new Subject<User[]>();
  userChanged = new Subject<User>();
  userByEmailChanged = new Subject<User>();
  isLoading = new Subject<boolean>();
  userAdded = new Subject<boolean>();

  getUserByEmailSub = new Subscription;

  constructor(private db: AngularFirestore, private authentication: AngularFireAuth, private snackBar: MatSnackBar) { }

  //Create
  addUser(user: User) {
    this.isLoading.next(true);
    this.db
      .collection('users')
      .add(user)
      .then(res => {
        this.openSnackBar('Usuário Cadastrado com sucesso!', 'OK')
        this.isLoading.next(false);
        this.userAdded.next(true);
      })
      .catch(err => {
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK')
        this.isLoading.next(false);
      });
  }

  //Read
  getUser(id: string) {
    this.isLoading.next(true);
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
        this.isLoading.next(false);
        this.user = user;
        this.userChanged.next(this.user)
      })
  }

  //Update
  editUser(id: string, user: User) {
    this.isLoading.next(true);
    this.db
      .collection('users')
      .doc(id)
      .update(user)
      .then(res => {
        this.openSnackBar('Usuário editado com sucesso!', 'OK');
        this.isLoading.next(false);
      })
      .catch(err => {
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
        this.isLoading.next(false);
      })
  }

  //Delete
  deleteUser(id: string) {
    this.isLoading.next(true);
    this.db
      .collection('users')
      .doc(id)
      .delete()
      .then(res => {
        this.openSnackBar('Usuário excluido com sucesso!', 'OK');
        this.isLoading.next(false);
      })
      .catch(err => {
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
        this.isLoading.next(false);
      })
  }

  //Read List
  getUsers() {
    this.isLoading.next(true);
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
      this.isLoading.next(false);
      this.users = users;
      this.usersChanged.next([...this.users])
    })
  }

  getUserByEmail(userEmail: string) {
    this.isLoading.next(true);
    this.getUserByEmailSub = this.db
      .collection('users', ref => ref.where('email', '==', userEmail))
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
        this.isLoading.next(false);
        if(users == []) {
          this.userByEmailChanged.next(null)
        } else {
          this.userByEmailChanged.next(users[0])
        }
        this.getUserByEmailSub.unsubscribe();
      })
  }

  //SnackBar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
