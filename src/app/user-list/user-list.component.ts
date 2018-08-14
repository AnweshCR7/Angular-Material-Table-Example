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
    this.columns = ['Name', 'DOB', 'Age','Email', 'Phone', 'Active', 'Edit', 'Toggle']; //,'Mobile', 'Active', 'Actions'];
  }

  applyFilter(filterValue: string) {
    this.usertable.filter = filterValue.trim().toLowerCase();
  }

  onActiveToggle(ifActive, key){
    // Since I have used ngModel for the toggle slider, this is defunct
    // A write can be made to the object whose 'active' status has changed (key as phone number as it is generally unique)... and
    // Then the data can be fetched anew.
    // console.log(ifActive, key);
    let myobj = JSON.stringify(this.users);

    localStorage.setItem("myObj", myobj);
    console.log(localStorage);
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
    this.dialogService.editUser('Edit-User', 'Update', selected_user)
    .subscribe(res => this.updateDataSource(res));
  }

  updateDataSource(edited_user){
    console.log(edited_user);
    const user_profiles = this.users;
    for (let i in user_profiles){
      if (user_profiles[i].last_name == edited_user.last_name){
        this.users[i].first_name = edited_user.first_name;
        //this.users[i].last_name = edited_user.last_name;
      }
    }
    console.log(this.users);
    this.usertable = new MatTableDataSource(this.users);
  }

  addToDataSource(new_user) {
    this.users.push(new_user);
    this.usertable = new MatTableDataSource(this.users);
  }

  onRefresh() {
    console.log(this.users);
    this.getUserData();
  }
}