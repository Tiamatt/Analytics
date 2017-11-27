import { Component, OnInit } from '@angular/core';
import { ItemViewClass } from '../../shared/models/ItemView.model';
import { ItemApiService } from '../../shared/services/api/itemApi.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css', '../../shared/styles/general.css']
})
export class ItemListComponent implements OnInit {
  itemViews: ItemViewClass[] = [];
  tableData: ItemViewClass[];
  isSortAsc: boolean = true;
  pages: number[] = [1];
  currentPage: number = 1;
  currentSortedTableHeaderName: string = "name"; 
  readonly maxRowsPerPage:number = 5;

  constructor(private itemApiService: ItemApiService) { }

  ngOnInit() {
    this.populateItemViews();
  }

  populateItemViews(){
    this.itemApiService.getItemViews().subscribe(
      res => { 
        this.itemViews = res;
        this.sortingAndPagingTable(this.currentSortedTableHeaderName); 

        let totalNumberOfPages = Math.ceil(this.itemViews.length / this.maxRowsPerPage);
        console.log(totalNumberOfPages);
        for(var i = 2; i<= totalNumberOfPages; i++){
          this.pages.push(i);
        }

      },
      err => console.log(err)
    );
  }

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

  private sortingAndPagingTable(_tableHeaderName: string){
    // sort asc
    if(this.isSortAsc == true){
      this.tableData = this.itemViews.sort(function(a, b) {
            return a.item[_tableHeaderName] > b.item[_tableHeaderName]  ? 1 : ((a.item[_tableHeaderName] < b.item[_tableHeaderName] ) ? -1 : 0);
      });
    }  
    // sort desc
    else {
      this.tableData = this.itemViews.sort(function(a, b) {
        return a.item[_tableHeaderName] < b.item[_tableHeaderName]  ? 1 : ((a.item[_tableHeaderName] > b.item[_tableHeaderName] ) ? -1 : 0);
      });
    }
    // slicing to show records less than maxRowsPerPage
    let fromRow = (this.currentPage - 1) * this.maxRowsPerPage;
    let toRow = this.currentPage*this.maxRowsPerPage;
    this.tableData = this.tableData.slice(fromRow, toRow);
  }

}
