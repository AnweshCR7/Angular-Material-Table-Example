import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  public title;
  public action;
  public selected_user;

  constructor(public dialogRef: MatDialogRef<DialogComponent>) {
    this.selected_user = {first_name:"",last_name:""};//,email:"",phone:"",dob:"",active:""};
  }

  submit() {
    console.log(this.selected_user);
    this.dialogRef.close(this.selected_user);
  }

}
