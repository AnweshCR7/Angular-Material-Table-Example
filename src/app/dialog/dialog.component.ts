import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    // if(!this.selected_user){
    //   this.selected_user = {first_name:"",last_name:""};//,email:"",phone:"",dob:"",active:""};
    // }
    this.form = this.formBuilder.group({
      first_name:"", last_name:"", email:'', phone: '', dob: '', active: false, birthDate: '', age:''
    });
  }

  // submit() {
  //   console.log(this.selected_user);
  //   this.dialogRef.close(this.selected_user);
  // }

  submit(form) {
    //console.log(form);
    this.dialogRef.close(form.value);
  }

}
