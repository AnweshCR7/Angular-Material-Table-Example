import { Observable } from 'rxjs/Rx';
import { DialogComponent } from './dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public addUser(title, action): Observable<any> {

      let dialogRef: MatDialogRef<DialogComponent>;

      dialogRef = this.dialog.open(DialogComponent);
      dialogRef.componentInstance.title = title;
      dialogRef.componentInstance.action = action;

      return dialogRef.afterClosed();
  }

  public editUser(title, action, user): Observable<any> {

    let dialogRef: MatDialogRef<DialogComponent>;

    dialogRef = this.dialog.open(DialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.action = action;
    console.log(user);
    dialogRef.componentInstance.form.setValue(user);
    return dialogRef.afterClosed();
  }

}
