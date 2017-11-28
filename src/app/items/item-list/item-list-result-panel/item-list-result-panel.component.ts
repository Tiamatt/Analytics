import { Component, OnInit, Input } from '@angular/core';
import { ItemViewClass } from '../../../shared/models/ItemView.model';

@Component({
  selector: 'app-item-list-result-panel',
  templateUrl: './item-list-result-panel.component.html',
  styleUrls: ['./item-list-result-panel.component.css']
})

export class ItemListResultPanelComponent implements OnInit {
  tableData: ItemViewClass[];
  isSortAsc: boolean = true;
  pages: number[] = [1];
  currentPage: number = 1;
  currentSortedTableHeaderName: string = "name";
  readonly maxRowsPerPage:number = 5;

  @Input() input: ItemViewClass[];
  
  constructor() { }

  ngOnInit() { 
    // initial paging and sorting
    this.sortingAndPagingTable(this.currentSortedTableHeaderName);
    
    // get total numbers of pages
    let totalNumberOfPages = Math.ceil(this.input.length / this.maxRowsPerPage);
    console.log(totalNumberOfPages);
    for(var i = 2; i<= totalNumberOfPages; i++){
      this.pages.push(i);
    }

  }


  /* -------------------  EVENTS ---------------------- */
  onSort(_tableHeaderName: string){
    this.currentSortedTableHeaderName = _tableHeaderName;    
    this.isSortAsc = !this.isSortAsc;  // change sort direction to opposite
    this.currentPage = 1;   // make first page as current page
    this.sortingAndPagingTable(_tableHeaderName);
  }
  onPageChange(_currentPage: number){
    this.currentPage = _currentPage;    
    this.sortingAndPagingTable(this.currentSortedTableHeaderName);
  }


  /* -------------------- PRIVATE METHODS -------------------------- */
  private sortingAndPagingTable(_tableHeaderName: string){
    // sort asc
    if(this.isSortAsc == true){
      this.tableData = this.input.sort(function(a, b) {
            return a.item[_tableHeaderName] > b.item[_tableHeaderName]  ? 1 : ((a.item[_tableHeaderName] < b.item[_tableHeaderName] ) ? -1 : 0);
      });
    }  
    // sort desc
    else {
      this.tableData = this.input.sort(function(a, b) {
        return a.item[_tableHeaderName] < b.item[_tableHeaderName]  ? 1 : ((a.item[_tableHeaderName] > b.item[_tableHeaderName] ) ? -1 : 0);
      });
    }
    // slicing to show records less than maxRowsPerPage
    let fromRow = (this.currentPage - 1) * this.maxRowsPerPage;
    let toRow = this.currentPage*this.maxRowsPerPage;
    this.tableData = this.tableData.slice(fromRow, toRow);
  }

}
