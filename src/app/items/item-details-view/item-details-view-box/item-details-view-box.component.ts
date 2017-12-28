import { Component, OnChanges, Input } from '@angular/core';
import { ItemApiService } from '../../../shared/services/api/itemApi.service';
import { ItemDetailModel } from '../../../shared/models/item-detail.model';
import { PagingSimpleModel } from '../../../shared/components/custom-components/paging-simple/paging-simple.model';

@Component({
  selector: 'app-item-details-view-box',
  templateUrl: './item-details-view-box.component.html',
  styleUrls: ['./item-details-view-box.component.css', '../../../shared/styles/general.css', '../../../shared/styles/table.css']
})
export class ItemDetailsViewBoxComponent implements OnChanges {
  @Input() itemIdInput: string; // guid
  tableData: ItemDetailModel[] = [];
  tableDataSliced: ItemDetailModel[] = [];
  pageData: PagingSimpleModel;
  isSortAsc: boolean = true;
  selectedEditItemDetailId: string; 
  currentSortedTableHeaderName: string = "quantity";
  constructor(private itemApiService: ItemApiService) { }

  ngOnChanges() {
    this.populateTableData();
  }

  /* -------------------  PRIVATE METHODS ---------------------- */
  private populateTableData(){
    this.itemApiService.getItemDetails(this.itemIdInput).subscribe(
      res => {  
        this.tableData = res;
        this.populatePageData(1);
        this.sortingAndPagingTable(this.currentSortedTableHeaderName);
      },
      err => {
        console.log("Error. Can't call GetItemDetails(x) HttpGet method");
      }
    )
  }
  private sortingAndPagingTable(_tableHeaderName: string){
    // sort asc
    if(this.isSortAsc == true){
      this.tableData = this.tableData.sort(function(a, b) {
        // if string, then make  sorting case insensetive
        if(isNaN(a[_tableHeaderName]) || isNaN(b[_tableHeaderName])){ // if string, then make  sorting case insensetive
          let _a = (a[_tableHeaderName] == null) ? "" : a[_tableHeaderName].toLowerCase();
          let _b = (b[_tableHeaderName] == null) ? "" : b[_tableHeaderName].toLowerCase();
          return _a > _b? 1 : ((_a < _b) ? -1 : 0);
        }
        // else numbers
        else
          return a[_tableHeaderName] > b[_tableHeaderName]  ? 1 : ((a[_tableHeaderName] < b[_tableHeaderName] ) ? -1 : 0);
      });
    }  
    // sort desc
    else {
      this.tableData = this.tableData.sort(function(a, b) {
        // if string, then make  sorting case insensetive
        if(isNaN(a[_tableHeaderName]) || isNaN(b[_tableHeaderName])){
          let _a = (a[_tableHeaderName] == null) ? "" : a[_tableHeaderName].toLowerCase();
          let _b = (b[_tableHeaderName] == null) ? "" : b[_tableHeaderName].toLowerCase();
          return _a < _b? 1 : ((_a > _b) ? -1 : 0);
        }
        // else numbers
        else
          return a[_tableHeaderName] < b[_tableHeaderName] ? 1 : ((a[_tableHeaderName] > b[_tableHeaderName] ) ? -1 : 0);
      });
    }
    // slicing to show records less than maxRowsPerPage
    let fromRow = (this.pageData.currentPage - 1) * this.pageData.maxRowsPerPage;
    let toRow = this.pageData.currentPage * this.pageData.maxRowsPerPage;
    this.tableDataSliced = this.tableData.slice(fromRow, toRow);
  }
  private populatePageData(_currentPage: number){
    this.pageData = new PagingSimpleModel();
    this.pageData.maxRowsPerPage = 5;
    this.pageData.currentPage = _currentPage;
    this.pageData.rowsCount = this.tableData.length;
  }

  /* -------------------  EVENTS ---------------------- */
  onPageChange(_currentPage: number){ 
    this.populatePageData(_currentPage); 
    this.sortingAndPagingTable(this.currentSortedTableHeaderName);
  }
  onSort(_tableHeaderName: string){
    this.isSortAsc = !this.isSortAsc;  // change sort direction to opposite
    this.currentSortedTableHeaderName = _tableHeaderName;
    this.sortingAndPagingTable(_tableHeaderName);
  }
  onDeleteItemDetail(_itemDetailId:string){
    if(confirm('Are you sure to delete selected item detail?'))
    {
      this.itemApiService.deleteItemDetail(_itemDetailId).subscribe(
        res => {
          alert('Selected item detail deleted successfully');
          this.populateTableData();
        },
        err => alert('Failed to delete selected item detail.')
      );
    }
  }
  onEditItemDetail(_itemDetailId:string){
    document.getElementById("openModalAlert").click();
    this.selectedEditItemDetailId = _itemDetailId;
  }
  onEditItemDetailFromChild(_isSucceded){
    if(_isSucceded)
      this.populateTableData();
  }



}
