import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Base } from '../base-controller';
import {UserService} from './user.service';
import { DialogService } from "../dialog/dialog.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends Base implements OnInit {
  users: any;
  usertable: any;
  columns: any;
  date = new Date();
  currYear = this.date.getFullYear();
  constructor(private userDataService: UserService, private dialogService: DialogService) { 
    super();
  }


  ngOnInit() {
    this.getUserData();
    this.columns = ['Name', 'DOB', 'Age','Email', 'Phone', 'Active', 'Toggle', 'Edit', 'Delete']; //,'Mobile', 'Active', 'Actions'];
  }

  applyFilter(filterValue: string) {
    this.usertable.filter = filterValue.trim().toLowerCase();
  }

  onActiveToggle(ifActive, key){
    // Since I have used ngModel for the toggle slider, this is defunct
    // A write can be made to the object whose 'active' status has changed (key as phone number as it is generally unique)... and
    // Then the data can be fetched anew.
    // console.log(ifActive, key);
    // let myobj = JSON.stringify(this.users);

    // localStorage.setItem("myObj", myobj);
    // console.log(localStorage);
  }

  getDateInFormat(user){
    let utcSeconds = user.dob;
      let dt = new Date(0); // The 0 there sets the date to the epoch
      dt.setUTCSeconds(utcSeconds);
      return dt;
  }

  getUserData(): void {
    this.isLoading = true;
    this.noData = false;
    this.errorMsg = '';
    this.userDataService.getData()
      .subscribe((users) => this.getUserDataDone(users),
        (err) => this.getUserDataFail(err));

  }
  filterPredicate(data, filter) {
    return data.first_name.toLowerCase().includes(filter) || data.last_name.toLowerCase().includes(filter) || 
    data.email.toLowerCase().includes(filter);
  }

  getUserDataDone(users) {
    this.isLoading = false;
    this.users = users.users; // Users is the JSON response object
    this.users.map((user) => {
      let dt = this.getDateInFormat(user);
      user.birthDate = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
      user.age = this.currYear - dt.getFullYear();
    });
    this.usertable = new MatTableDataSource(this.users);
    this.usertable.filterPredicate = this.filterPredicate;
    if (!users.users.length) {
      this.noData = true;
    }
  }

  getUserDataFail(err) {
    this.isLoading = false;
    this.errorMsg = 'Unable to retrieve users';
  }

  onAdd() {
    this.dialogService.addUser('Add-User', 'Add')
    .subscribe(res => this.addToDataSource(res));
  }

  onUpdate(selected_user) {
    if(!selected_user){
      return;
    }
    // Required to convert date into a standard format so that it can be passed as input to the date picker
    selected_user.birthDate = this.getDateInFormat(selected_user);
    this.dialogService.editUser('Edit-User', 'Update', selected_user)
    .subscribe(res => this.updateDataSource(res));
  }

  updateDataSource(edited_user){
    //console.log(edited_user);
    const user_profiles = this.users;
    for (let i in user_profiles) {
      if (user_profiles[i].phone == edited_user.phone){
        this.users[i].first_name = edited_user.first_name;
        this.users[i].last_name = edited_user.last_name;
        this.users[i].email = edited_user.email;
        // we need seconds.
        this.users[i].dob = (Date.UTC(edited_user.birthDate.getUTCFullYear(),
        edited_user.birthDate.getUTCMonth(), edited_user.birthDate.getUTCDate())) / 1000;
        let dt = this.getDateInFormat(this.users[i]);
        this.users[i].birthDate = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
        this.users.age = this.currYear - dt.getFullYear();
        console.log(this.users[i].birthDate);
        this.users[i].active = edited_user.active;
      }
    }
    this.usertable = new MatTableDataSource(this.users);
  }

  addToDataSource(new_user) {
    if(!new_user){
      return;
    }
    if(new_user.phone){
      // This repetitive code should be a function.
      new_user.dob = (Date.UTC(new_user.birthDate.getUTCFullYear(),
      new_user.birthDate.getUTCMonth(), new_user.birthDate.getUTCDate())) / 1000;
      let dt = this.getDateInFormat(new_user);
      new_user.birthDate = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
      new_user.age = this.currYear - dt.getFullYear();
      this.users.push(new_user);
      this.usertable = new MatTableDataSource(this.users);
    }
  }

  onRefresh() {
    this.usertable = new MatTableDataSource([]); // to Emulate a refresh look... UI wise
    this.getUserData();
  }
  
  onDelete(selected_user){
   this.users = this.users.filter(user => user.phone != selected_user.phone);
   if(!this.users.length){
     this.noData = true;
   }
   this.usertable = new MatTableDataSource(this.users);
  }
}
