import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Notice } from '../../models/notice.model';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';

import 'rxjs/add/operator/map'
import { MatSnackBar } from '@angular/material';
import { LogItem } from '../../models/logitem.model';
import { Employee } from '../../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class NoticesService {

  notices: Notice[];
  notice: Notice;

  noticesChanged = new Subject<Notice[]>();
  noticeChanged = new Subject<Notice>();

  isLoading = new Subject<boolean>();
  didEdit = new Subject<boolean>();
  didDelete = new Subject<boolean>();

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
  editNotice(notice: Notice, employee: Employee) {
    this.isLoading.next(true);
    notice.edited = true;
    notice.dateTime = moment().toISOString();
    this.db
      .collection('notices')
      .doc(notice.id)
      .set(notice)
      .then(res => {
        this.isLoading.next(false);
        this.didEdit.next(true);
        this.openSnackBar('Notícia editada com sucesso!', 'OK');
        let logItem: LogItem = {
          type: 'Edição de Notícia',
          dateTime: moment().toISOString(),
          employeeName: employee.name,
          bookTitle: notice.title
        }
        this.addLogItem(logItem);
      })
      .catch(err => {
        this.isLoading.next(false);
        this.openSnackBar('Ocorreu um erro. Verifique sua conexão.', 'OK');
      })
  }

  //Delete
  deleteNotice(notice: Notice, employee: Employee) {
    this.isLoading.next(true);
    this.db
      .collection('notices')
      .doc(notice.id)
      .delete()
      .then(res => {
        this.isLoading.next(false);
        this.didDelete.next(true);
        this.openSnackBar('Notícia excluida com sucesso!', 'OK');
        let logItem: LogItem = {
          type: 'Exclusão de Notícia',
          dateTime: moment().toISOString(),
          employeeName: employee.name,
          bookTitle: notice.title,
        }
        this.addLogItem(logItem);
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
      this.notices = notices.sort((item1, item2) => {
        return moment(item2.dateTime).diff(item1.dateTime);
      })
      this.notices.forEach(notice => {
        notice.dateTime = moment(notice.dateTime).locale('pt-br').format('LLL');
      })
      this.noticesChanged.next([...this.notices])
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
