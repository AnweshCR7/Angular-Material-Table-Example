import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppContext} from './app-context';
import {UserService} from './user-list/user.service';
import {HttpClientModule} from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatDialogModule
} from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from './dialog/dialog.service';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    ToolbarComponent,
    DialogComponent
  ],
  imports: [
  BrowserModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
   MatMenuModule,
   MatIconModule,
   MatToolbarModule,
   HttpClientModule,
   MatTableModule,
   NoopAnimationsModule,
   FormsModule,
   ReactiveFormsModule,
   MatFormFieldModule,
   MatInputModule,
   MatButtonModule,
   MatSlideToggleModule,
   MatDialogModule
  ],
  providers: [AppContext, UserService, DialogService],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
