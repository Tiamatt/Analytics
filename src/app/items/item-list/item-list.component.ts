import { Component, OnInit } from '@angular/core';
import { ItemViewClass } from '../../shared/models/ItemView.model';
import { ItemApiService } from '../../shared/services/api/itemApi.service';
import { ItemListFilterPanelClass } from '../../shared/models/ItemListFilterPanel.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css', '../../shared/styles/general.css']
})

export class ItemListComponent implements OnInit {
  itemListFilterPanel: ItemListFilterPanelClass;
  itemViewsTableData: ItemViewClass[];

  constructor(
    private itemApiService: ItemApiService
  ) { }

  ngOnInit() {
    this.itemListFilterPanel = ItemListFilterPanelClass.initializeObject();
    this.populateItemListFilterPanel();
    this.populateItemViews();
  }  


  /* -------------------  POPULATE ---------------------- */
  populateItemListFilterPanel(){
    this.itemListFilterPanel = ItemListFilterPanelClass.initializeObject();
    this.itemListFilterPanel.isShowPartialName_txt = true;
    this.itemListFilterPanel.isShowActive_ddl = true;
    this.itemListFilterPanel.isShowGender_ddl = true;
    this.itemListFilterPanel.isShowCategory_chb = true;
    this.itemListFilterPanel.isShowBrand_chb = true;
  }
  populateItemViews(){
    this.itemApiService.getItemViews(this.itemListFilterPanel).subscribe(
      res => { 
        this.itemViewsTableData = res;
      },
      err => console.log(err)
    );
  }
  
  /* -------------------  EVENTS ---------------------- */
  onFiltersSearch(_filters: ItemListFilterPanelClass){
    this.itemListFilterPanel = _filters;
    this.populateItemViews();
  }

  
  

}
