import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {AppContext} from './../app-context';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() title;
  constructor(public appContext: AppContext) { }
  ngOnInit() {
    //console.log(this.title);
  }
  // onLogoutClick(){
  //   this.onLogout.emit()
  // }
  // onProfileClick(){
  //   this.onProfile.emit();
  // }

}
