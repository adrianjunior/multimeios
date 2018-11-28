import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Notice } from '../../models/notice.model';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map'
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NoticesService {

  notices: Notice[];
  notice: Notice;

  noticesChanged = new Subject<Notice[]>();
  noticeChanged = new Subject<Notice>();

  isLoading = new Subject<boolean>();

  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {}

  //Create
  addNotice(notice: Notice) {
    this.isLoading.next(true);
    this.db
      .collection('notices')
      .add(notice)
      .then(res => {
        this.isLoading.next(false);
        this.openSnackBar('Notícia postada com sucesso!', 'OK');
      })
      .catch(err => {
        this.isLoading.next(false);
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
      })
  }

  //Read
  getNotice(id: string) {
    this.isLoading.next(true);
    this.db
      .collection('notices')
      .doc(id)
      .snapshotChanges()
      .map(doc => {
        return {
          id: doc.payload.id,
          ...doc.payload.data()
        } as Notice;
      })
      .subscribe((notice: Notice) => {
        this.notice = notice;
        this.noticeChanged.next(this.notice);
        this.isLoading.next(false);
      })
  }

  //Update
  editNotice(id: string, notice: Notice) {
    this.isLoading.next(true);
    this.db
      .collection('notices')
      .doc(id)
      .update(notice)
      .then(res => {
        this.isLoading.next(false);
        this.openSnackBar('Notícia editada com sucesso!', 'OK');
      })
      .catch(err => {
        this.isLoading.next(false);
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
      })
  }

  //Delete
  deleteNotice(id: string) {
    this.isLoading.next(true);
    this.db
      .collection('notices')
      .doc(id)
      .delete()
      .then(res => {
        this.isLoading.next(false);
        this.openSnackBar('Notícia excluida com sucesso!', 'OK');
      })
      .catch(err => {
        this.isLoading.next(false);
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
      })
  }

  //Read List
  getNotices() {
    this.isLoading.next(true);
    this.db
    .collection('notices')
    .snapshotChanges()
    .map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
        } as Notice;
      });
    })
    .subscribe((notices: Notice[]) => {
      this.notices = notices;
      this.noticesChanged.next([...this.notices])
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
