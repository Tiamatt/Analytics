import { Component, OnChanges, Input } from '@angular/core';
import { ItemApiService } from '../../../shared/services/api/itemApi.service';
import { ItemViewModel } from '../item-view.model';

@Component({
  selector: 'app-item-view-box',
  templateUrl: './item-view-box.component.html',
  styleUrls: ['./item-view-box.component.css', '../../../shared/styles/general.css']
})
export class ItemViewBoxComponent implements OnChanges {
  @Input() itemIdInput: string; // itemId (guid)
  itemView: ItemViewModel;

  constructor(private itemApiService: ItemApiService) { }

  ngOnChanges() {
    this.populateItemView();
  }

  /* -------------------  POPULATE ---------------------- */
  private populateItemView(){
    this.itemApiService.getItemView(this.itemIdInput).subscribe(
      res => this.itemView = res,
      err => {
        console.log("Error. Can't call GetItemView(x) HttpGet method");
        console.log(err);
      }
    )
  }

 /* -------------------  EVENTS ---------------------- */

}
