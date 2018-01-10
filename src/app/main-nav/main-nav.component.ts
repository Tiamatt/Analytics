import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MainNavModel } from './main-nav.model';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  @Output() onShrinkExpandNavOutput = new EventEmitter<boolean>();
  
  navData: MainNavModel[] = [];
  isExpandNav: boolean = true;
  
  constructor() { }

  ngOnInit() {
    this.populateNav();
  }

  /* -------------------  POPULATE ---------------------- */
  populateNav(){
    // items
    let items = new MainNavModel();
    items.titleName = "items";
    items.titleFaIcon = "fa fa-tags";
    items.titleFaCaret = "fa fa-caret-right caret_M";
    items.isShowSubtitles = true;
    items.subtitles = [
      { routerLink: "/item-save", name: "Create item" },
      { routerLink: "/item-list", name: "View list of items" },
      { routerLink: "/item-view", name: "View item" },
      { routerLink: "/item-details-view", name: "View item details" }
    ];
    this.navData.push(items);

    // sales
    let sales = new MainNavModel();
    sales.titleName = "sales";
    sales.titleFaIcon = "fa fa-pie-chart";
    sales.titleFaCaret = "fa fa-caret-right caret_M";
    sales.isShowSubtitles = true;
    sales.subtitles = [
      { routerLink: "/under-construction", name: "Total Sales" }, // kali
      { routerLink: "/under-construction", name: "Total inventory" }, // kali
      { routerLink: "/under-construction", name: "Total Returns" }, // kali
      { routerLink: "/under-construction", name: "Inventory to Sales Ratio" }, // kali
      { routerLink: "/under-construction", name: "Days of Supply" } // kali
    ];
    this.navData.push(sales);

    // employees
    let employees = new MainNavModel();
    employees.titleName = "employees";
    employees.titleFaIcon = "fa fa-users";
    employees.titleFaCaret = "fa fa-caret-right caret_M";
    employees.isShowSubtitles = true;
    employees.subtitles = [
      { routerLink: "/under-construction", name: "List of employees" }// kali
    ];
    this.navData.push(employees);
  }

  /* -------------------  EVENTS ---------------------- */  
  onShowHideSubtitles(_titleFaCaret: string, _titleName: string){
    let isShowSubtitles = (_titleFaCaret.indexOf("down") > 0);
    let selectedMainNav:MainNavModel = this.navData.find(x => x.titleName == _titleName);   
    // modify navData properties
    selectedMainNav.titleFaCaret = isShowSubtitles ? "fa fa-caret-right caret_M": "fa fa-caret-down caret_M";
    selectedMainNav.isShowSubtitles = isShowSubtitles;
  }
  onShrinkExpandNav(){
    this.isExpandNav = !this.isExpandNav;
    for(let i=0; i<this.navData.length; i++)
    {
      this.navData[i].isShowSubtitles = (this.isExpandNav) ? true : false;
      this.navData[i].titleFaCaret = (this.isExpandNav) ? "fa fa-caret-right caret_M" : "fa fa-caret-down caret_M";
    }
    this.onShrinkExpandNavOutput.emit(this.isExpandNav);
  }

}
