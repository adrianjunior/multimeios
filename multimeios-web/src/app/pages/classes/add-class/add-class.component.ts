import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../../../services/classes/classes.service';
import { NgForm } from '@angular/forms';
import { Class } from '../../../models/class.model';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  loading: boolean = false;

  constructor(private classesService: ClassesService) { }

  ngOnInit() {
    this.classesService.isLoading.subscribe(loading => {
      this.loading = loading;
    })
  }

  addClass(form: NgForm) {
    const clss: Class = {
      name: form.value.name
    }
    this.classesService.addClass(clss);
  }

}
