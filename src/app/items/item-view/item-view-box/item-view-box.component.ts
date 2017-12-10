import { Component, OnInit, Input } from '@angular/core';
import { ItemApiService } from '../../../shared/services/api/itemApi.service';
import { ItemViewModel } from '../item-view.model';

@Component({
  selector: 'app-item-view-box',
  templateUrl: './item-view-box.component.html',
  styleUrls: ['./item-view-box.component.css', '../../../shared/styles/general.css']
})
export class ItemViewBoxComponent implements OnInit {
  @Input() input: string; // itemId (guid)
  itemView: ItemViewModel;

  constructor(private itemApiService: ItemApiService) { }

  ngOnInit() {
    this.populateItemView();
  }

  /* -------------------  POPULATE ---------------------- */
  populateItemView(){
    // this.itemApiService.getItemView(this.input).subsribe(
    //   res => this.itemView = res,
    //   err => {
    //     console.log("Error. Can't call GetItemView() HttpGet method");
    //     console.log(err);
    //   }
    // );
  }

 /* -------------------  EVENTS ---------------------- */

}
