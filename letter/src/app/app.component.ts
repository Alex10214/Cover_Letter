import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Letter} from './interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  @ViewChild('checkbox', {static: false}) checkbox: ElementRef;

  form: FormGroup;
  arrDataLetter: Array<Letter> = [];
  dataLetter: any;
  isActive = true;
  isEditMode = false;
  isRegisteredId = false;

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(this.dataLetter?.id, [
        Validators.required,
        Validators.min(1),
        Validators.max(1000000000)
      ]),
      profession: new FormControl( this.dataLetter?.profession, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]),
      name: new FormControl(this.dataLetter?.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      about: new FormControl(this.dataLetter?.about, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]),
      draft: new FormControl(this.isActive, [Validators.required])
    });
  }
  submit(): void {

    if (this.form.valid && this.isActive === false && this.isEditMode) {
      if (this.arrDataLetter.length > 0) {
        this.dataLetter = {...this.form.value};
        const obj = this.arrDataLetter.find(n => n.id === this.dataLetter.id);
        if (obj) {
          Object.assign(obj, this.dataLetter);
        } else {
          this.arrDataLetter.push(this.dataLetter);
        }
      }
      this.form.reset();
    } else {
      if (this.form.valid && this.isActive === true && this.isEditMode === false) {
        this.isActive = false;
        const formData: Letter = {...this.form.value};
        if (this.arrDataLetter.length > 0) {
          for (const el of this.arrDataLetter) {
            if (formData.id !== el.id) {
              this.arrDataLetter.push(formData);
              this.form.reset();
            } else {
              this.isRegisteredId = true;
              return;
            }
          }
        }
        this.arrDataLetter.push(formData);
        this.form.reset();
        this.isActive = false;
        localStorage.setItem('formData', JSON.stringify(this.arrDataLetter));
      }
    }
    this.isEditMode = false;
    this.checkbox.nativeElement.removeAttribute('disabled', 'disabled');
  }

  edit(ob: Letter): void {
    this.isActive = false;
    this.isEditMode = true;
    for (const i of this.arrDataLetter) {
      if (i.id === ob.id) {
        this.dataLetter = i;
      }
    }
    this.ngOnInit();
    this.checkbox.nativeElement.setAttribute('disabled', 'disabled');
  }
}

