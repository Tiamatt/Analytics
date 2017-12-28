/*
Note: call from other components:
  <app-paging-simple [input]="pageData" (onPageChangeOutput)="onPageChange($event)"></app-paging-simple>

Note: populate input
  private populatePageData(_currentPage: number){
    this.pageData = new PagingSimpleModel();
    this.pageData.maxRowsPerPage = 5;
    this.pageData.currentPage = _currentPage;
    this.pageData.rowsCount = this.input.length;
  }

Note: get output event
   onPageChange(_currentPage: number){
    this.populatePageData(_currentPage);
  }
*/

import { Component, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { PagingSimpleModel } from './paging-simple.model';

@Component({
  selector: 'app-paging-simple',
  templateUrl: './paging-simple.component.html',
  styleUrls: ['./paging-simple.component.css']
})
export class PagingSimpleComponent implements OnChanges {
  @Input() input: PagingSimpleModel;
  @Output() onPageChangeOutput = new EventEmitter<number>();
  pages: number[];

  constructor() { }

  ngOnChanges(_changes: SimpleChanges){
    this.input = _changes.input.currentValue;
    this.populatePages();
  }

  /* -------------------  PRIVATE METHODS ---------------------- */
  private populatePages(){
    this.pages = [1];
    // get total numbers of pages if need more than 1 page
    if(this.input.rowsCount > this.input.maxRowsPerPage)
    {
      let totalNumberOfPages = Math.ceil(this.input.rowsCount / this.input.maxRowsPerPage);
      // turn number to array
      for(var i = 2; i<= totalNumberOfPages; i++){
        this.pages.push(i);
      }
    }
    else 
      this.pages = [1];
  }

  /* -------------------  EVENTS ---------------------- */
  onPageChange(_currentPage: number){
    this.onPageChangeOutput.emit(_currentPage);
  }
  
}
