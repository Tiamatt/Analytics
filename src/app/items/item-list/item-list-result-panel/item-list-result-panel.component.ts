import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ItemViewModel } from '../../item-view/item-view.model';


@Component({
  selector: 'app-item-list-result-panel',
  templateUrl: './item-list-result-panel.component.html',
  styleUrls: ['./item-list-result-panel.component.css', '../../../shared/styles/general.css']
})

export class ItemListResultPanelComponent implements OnChanges {
  // inputs, outputs
  @Input() input: ItemViewModel[];
  // fields
  tableData: ItemViewModel[];
  dataForInfoForIsActive: ItemViewModel;
  isSortAsc: boolean = true;
  pages: number[] = [1];
  currentPage: number = 1;
  currentSortedTableHeaderName: string = "name";
  readonly maxRowsPerPage:number = 5;

  constructor() { }

  ngOnChanges(_changes: SimpleChanges){
    this.input = _changes.input.currentValue;
    this.populatePages();
    // initial paging and sorting
    this.sortingAndPagingTable(this.currentSortedTableHeaderName);
  } 


  /* -------------------  POPULATE ---------------------- */
  populatePages(){
    // get total numbers of pages if need more than 1 page
    if(this.input.length > this.maxRowsPerPage)
    {
      let totalNumberOfPages = Math.ceil(this.input.length / this.maxRowsPerPage);
      // turn number to array
      for(var i = 2; i<= totalNumberOfPages; i++){
        this.pages.push(i);
      }
    }
    else 
      this.pages = [1];
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
  onShowInfoForIsActive(_selectedRow: ItemViewModel){
    this.dataForInfoForIsActive =(!_selectedRow.item.isActive) ? _selectedRow : null; 
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
