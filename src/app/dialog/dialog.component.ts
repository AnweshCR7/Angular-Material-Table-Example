import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  form: FormGroup;
  public title;
  public action;
  public selected_user;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DialogComponent>) {
    this.form = this.formBuilder.group({
      first_name:"", last_name:"", email:['', Validators.email ], phone: ['', Validators.required ], 
      dob: '', active: false, birthDate: '', age:''
    });
  }

  submit(form) {
    //console.log(form);
    this.dialogRef.close(form.value);
  }

}
