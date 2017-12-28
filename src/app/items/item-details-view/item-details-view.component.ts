import { Component, OnInit } from '@angular/core';
import { ItemApiService } from '../../shared/services/api/itemApi.service';
import { TextValueCheckedModel } from '../../shared/models/text-value-checked.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-item-details-view',
  templateUrl: './item-details-view.component.html',
  styleUrls: ['./item-details-view.component.css', '../../shared/styles/general.css', '../../shared/styles/table.css']
})
export class ItemDetailsViewComponent implements OnInit {
  itemsTvc: TextValueCheckedModel[] = [];
  selectedItemId: string;

  constructor(private itemApiService: ItemApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getPreselectedItemId();
  }

  /* -------------------  PRIVATE METHODS ---------------------- */
  private getPreselectedItemId(){
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        let itemId = params['itemId'];
        if(itemId)
          this.selectedItemId = itemId.toUpperCase();
        this.populateItemsTvc();
      }
    );
  }
  private populateItemsTvc(){
    this.itemApiService.getItemsTvc(null).subscribe(
      res => {
        this.itemsTvc = res;
        if(!this.selectedItemId) // in undefined then first option
          this.selectedItemId = this.itemsTvc[0].valueStr;
      },
      err => {
        console.log("Error. Can't call GetItemsTvc(x) HttpGet method");
      }
    );
  }  
  
  /* -------------------  EVENTS ---------------------- */
  onReselectItemTvc(_selectedItemId: string){
    this.selectedItemId =  _selectedItemId;
  }

}
