import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Notice } from '../../models/notice.model';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class NoticesService {

  notices: Notice[];
  notice: Notice;

  noticesChanged = new Subject<Notice[]>();
  noticeChanged = new Subject<Notice>();

  constructor(private db: AngularFirestore) {}

  //Create
  addNotice(notice: Notice) {
    this.db
      .collection('notices')
      .add(notice);
  }

  //Read
  getNotice(id: string) {
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
        this.noticeChanged.next(this.notice)
      })
  }

  //Update
  editNotice(id: string, notice: Notice) {
    this.db
      .collection('notices')
      .doc(id)
      .update(notice)
  }

  //Delete
  deleteNotice(id: string) {
    this.db
      .collection('notices')
      .doc(id)
      .delete()
  }

  //Read List
  getNotices() {
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
    })
  }

}
