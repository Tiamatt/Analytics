import { Component, OnInit } from '@angular/core';
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

  constructor(private itemApiService: ItemApiService) { }

  ngOnInit() {
    this.populateItemsTvc();    
  }

    /* -------------------  POPULATE ---------------------- */
    private populateItemsTvc(){
      this.itemApiService.getItemsTvc(null).subscribe(
        res => {
          this.itemsTvc = res;
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
