import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NoticesService } from '../../../services/notices/notices.service';
import { Notice } from '../../../models/notice.model';
import * as moment from 'moment';

@Component({
  selector: 'app-add-notice',
  templateUrl: './add-notice.component.html',
  styleUrls: ['./add-notice.component.css']
})
export class AddNoticeComponent implements OnInit {

  loading: boolean = false;

  constructor(private noticesService: NoticesService) { }

  ngOnInit() {
    this.noticesService.isLoading.subscribe(loading => {
      this.loading = loading;
    })
  }

  postNotice(form: NgForm) {
    const notice: Notice = {
      title: form.value.title,
      body: form.value.body,
      dateTime: moment().toISOString(),
      edited: false
    }
    this.noticesService.addNotice(notice);
  }
}
