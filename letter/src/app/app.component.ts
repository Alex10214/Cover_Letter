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
  @ViewChild('inputId', {static: false}) inputId: ElementRef;

  form: FormGroup;
  arrDataLetter: Array<Letter> = [];
  dataLetterOneLetter: any;
  isActiveCheck = true;
  isEditMode = false;

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(this.dataLetterOneLetter?.id, [
        Validators.required,
        Validators.min(1),
        Validators.max(1000000000)
      ]),
      profession: new FormControl( this.dataLetterOneLetter?.profession, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]),
      name: new FormControl(this.dataLetterOneLetter?.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      about: new FormControl(this.dataLetterOneLetter?.about, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]),
      draft: new FormControl(this.isActiveCheck, [Validators.required])
    });
  }



  submit(): void {
    if (this.form.valid && this.isEditMode === false) {
      this.isActiveCheck = true;

      const formDataValue = {... this.form.value};

      if (this.arrDataLetter.length >= 0) {
        this.arrDataLetter.push(formDataValue);
      } else {
        for (const el of this.arrDataLetter) {
          if (el.id !== formDataValue.id) {
            this.arrDataLetter.push(formDataValue);
          } else {
            return;
          }
        }
      }
      this.form.reset();
    } else if (this.form.valid && this.isEditMode === true ) {

      const newFormDataValue = {... this.form.value};

      const obj = this.arrDataLetter.find(n => n.id === newFormDataValue.id);

      if (obj) {
        Object.assign(obj, newFormDataValue);
      } else {
        this.arrDataLetter.push(newFormDataValue);
      }
      this.checkbox.nativeElement.removeAttribute('disabled', 'disabled');
      this.inputId.nativeElement.removeAttribute('disabled', 'disabled');
      this.form.reset();
    }
  }

  edit(ob: Letter): void {
    this.isEditMode = true;
    this.isActiveCheck = false;
    for (const el of this.arrDataLetter) {
      if (el.id === ob.id) {
        this.dataLetterOneLetter = ob;
      }
    }
    this.ngOnInit();
    this.checkbox.nativeElement.setAttribute('disabled', 'disabled');
    this.inputId.nativeElement.setAttribute('disabled', 'disabled');
  }
}




