import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ItemApiService } from '../../shared/services/api/itemApi.service';
import { TextValueCheckedModel } from '../../shared/models/text-value-checked.model';
import { ItemViewModel } from './item-view.model';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css', '../../shared/styles/general.css']
})
export class ItemViewComponent implements OnInit {
  itemsTvc: TextValueCheckedModel[]= [];
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
        console.log(err);
      }
    );
  }


  /* -------------------  EVENTS ---------------------- */
  onReselectItemTvc(_selectedItemId: string){
    this.selectedItemId =  _selectedItemId;
  }
}
