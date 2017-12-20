import { Component, OnInit } from '@angular/core';
import { ItemApiService } from '../../shared/services/api/itemApi.service';
import { ItemViewModel } from '../item-view/item-view.model';
import { ItemListFilterPanelModel } from './item-list-filter-panel/item-list-filter-panel.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css', '../../shared/styles/general.css']
})

export class ItemListComponent implements OnInit {
  itemListFilterPanel: ItemListFilterPanelModel;
  itemViewsTableData: ItemViewModel[];

  constructor(
    private itemApiService: ItemApiService
  ) { }

  ngOnInit() {
    this.itemListFilterPanel = ItemListFilterPanelModel.initializeObject();
    this.populateItemListFilterPanel();
    this.populateItemViews();
  }  


  /* -------------------  POPULATE ---------------------- */
  populateItemListFilterPanel(){
    this.itemListFilterPanel = ItemListFilterPanelModel.initializeObject();
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
  onFiltersSearch(_filters: ItemListFilterPanelModel){
    this.itemListFilterPanel = _filters;
    this.populateItemViews();
  }
  onRepopulateData(){
    this.populateItemViews();
  }
  
  

}
