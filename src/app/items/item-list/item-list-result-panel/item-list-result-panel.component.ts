/*
Note: call from other components:
  <app-item-list-result-panel *ngIf="itemViewsTableData" [input]="itemViewsTableData" (onRepopulateDataOutput)="onRepopulateData()"></app-item-list-result-panel>

Note: populate input
  itemViewsTableData: ItemViewModel[];
  populateItemViews(){
    this.itemApiService.getItemViews(this.itemListFilterPanel).subscribe(
      res => { 
        this.itemViewsTableData = res;
      },
      err => console.log(err)
    );
  }

Note: get output event
 onRepopulateData(){
    this.populateItemViews();
  }
*/
import { Component, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { ItemViewModel } from '../../item-view/item-view.model';
import { ItemApiService } from '../../../shared/services/api/itemApi.service';
import { Router } from '@angular/router';
import { ItemActivateModel } from '../../item-save/item-activate/item-activate.model';
import { PagingSimpleModel } from '../../../shared/components/custom-components/paging-simple/paging-simple.model';

@Component({
  selector: 'app-item-list-result-panel',
  templateUrl: './item-list-result-panel.component.html',
  styleUrls: ['./item-list-result-panel.component.css', '../../../shared/styles/general.css', '../../../shared/styles/table.css']
})

export class ItemListResultPanelComponent implements OnChanges {
  @Input() input: ItemViewModel[]; //data for table
  @Output() onRepopulateDataOutput = new EventEmitter<void>(); //refresh input and resend here

  tableData: ItemViewModel[];
  dataForItemActivate: ItemActivateModel;
  isSortAsc: boolean = true;
  pageData: PagingSimpleModel;
  currentSortedTableHeaderName: string = "name";
  selectedEditItemId: string;

  constructor( private itemApiService: ItemApiService, private router: Router) { }

  ngOnChanges(_changes: SimpleChanges){
    this.input = _changes.input.currentValue;
    this.populatePageData(1);
    // initial paging and sorting
    this.sortingAndPagingTable(this.currentSortedTableHeaderName);
  } 

  /* -------------------  PRIVATE METHODS ---------------------- */
  private populatePageData(_currentPage: number){
    this.pageData = new PagingSimpleModel();
    this.pageData.maxRowsPerPage = 5;
    this.pageData.currentPage = _currentPage;
    this.pageData.rowsCount = this.input.length;
  }
  private sortingAndPagingTable(_tableHeaderName: string){
    // sort asc
    if(this.isSortAsc == true){
      this.tableData = this.input.sort(function(a, b) {
        if(isNaN(a.item[_tableHeaderName])) // if string, then make  sorting case insensetive
          return a.item[_tableHeaderName].toLowerCase() > b.item[_tableHeaderName].toLowerCase()  ? 1 : ((a.item[_tableHeaderName].toLowerCase() < b.item[_tableHeaderName].toLowerCase() ) ? -1 : 0);
        else
          return a.item[_tableHeaderName] > b.item[_tableHeaderName]  ? 1 : ((a.item[_tableHeaderName] < b.item[_tableHeaderName] ) ? -1 : 0);
      });
    }  
    // sort desc
    else {
      this.tableData = this.input.sort(function(a, b) {
        if(isNaN(a.item[_tableHeaderName])) // if string, then make  sorting case insensetive
          return a.item[_tableHeaderName].toLowerCase() < b.item[_tableHeaderName].toLowerCase()  ? 1 : ((a.item[_tableHeaderName].toLowerCase() > b.item[_tableHeaderName].toLowerCase() ) ? -1 : 0);
        else
          return a.item[_tableHeaderName] < b.item[_tableHeaderName] ? 1 : ((a.item[_tableHeaderName] > b.item[_tableHeaderName] ) ? -1 : 0);
      });
    }
    // slicing to show records less than maxRowsPerPage
    let fromRow = (this.pageData.currentPage - 1) * this.pageData.maxRowsPerPage;
    let toRow = this.pageData.currentPage * this.pageData.maxRowsPerPage;
    this.tableData = this.tableData.slice(fromRow, toRow);
  }

  /* -------------------  EVENTS ---------------------- */
  onSort(_tableHeaderName: string){
    this.currentSortedTableHeaderName = _tableHeaderName;    
    this.isSortAsc = !this.isSortAsc;  // change sort direction to opposite
    this.populatePageData(1); // make first page as current page
    this.sortingAndPagingTable(_tableHeaderName);
  }
  onPageChange(_currentPage: number){
    this.populatePageData(_currentPage);   
    this.sortingAndPagingTable(this.currentSortedTableHeaderName);
  }
  onShowItemActivities(_selectedRow: ItemViewModel){
      this.dataForItemActivate = new ItemActivateModel();
      this.dataForItemActivate.itemId = _selectedRow.item.itemId;
      this.dataForItemActivate.itemName = _selectedRow.item.name;
      this.dataForItemActivate.isItemActive = _selectedRow.item.isActive;
      this.dataForItemActivate.itemActivities = _selectedRow.itemActivities;
  }
  onChangeItemActivity(_isItemActive: boolean){
    this.onRepopulateDataOutput.emit();
  }
  onEditItem(_itemId: string){
    document.getElementById("openModalAlert").click();
    this.selectedEditItemId = _itemId;
  }
  onEditItemFromChild(_isSucceded){
    if(_isSucceded)
      this.onRepopulateDataOutput.emit();
  }
  onDeleteItem(_itemId: string, _itemName: string){
    if(confirm('Are you sure to delete "' + _itemName + '"?'))
    {
      this.itemApiService.deleteItem(_itemId).subscribe(
        res => {
          alert('Item ' + _itemName + ' deleted successfully');
          this.onRepopulateDataOutput.emit();
        },
        err => alert('Failed to delete ' + _itemName + ' item.')  // kali
      );
    }
  }
  onRedirectToViewItem(_itemId: string){
    this.router.navigate(['./item-view', _itemId]);
  }



}
