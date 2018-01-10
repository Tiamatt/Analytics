import { Component, OnInit, Input } from '@angular/core';
import { ItemApiService } from '../../../shared/services/api/itemApi.service';
import { TextValueCheckedModel } from '../../../shared/models/text-value-checked.model';
import { ItemActivateModel } from './item-activate/item-activate.model';

@Component({
  selector: 'app-item-activate-save',
  templateUrl: './item-activate-save.component.html',
  styleUrls: ['./item-activate-save.component.css', '../../../shared/styles/general.css']
})
export class ItemActivateSaveComponent implements OnInit {
  @Input() itemIdInput:string; // guid

  itemsTvc: TextValueCheckedModel; // for ddl
  selectedItemId: string;
  
  constructor(private itemApiService: ItemApiService) { }

  ngOnInit() {
    this.populateItemsTvc();
    this.selectedItemId = "-1";
  }

  /* -------------------  PRIVATE METHODS ---------------------- */
  populateItemsTvc(){
    this.itemApiService.getItemsTvc(null).subscribe(
      res => this.itemsTvc = res,
      err => {
        console.log("Error. Can't call GetItemsTvc() HttpGet method");
      }
    );
  }


  /* -------------------  EVENTS ---------------------- */
  onReselectItemTvc(_selectedItemId: string){
    this.selectedItemId =  _selectedItemId;
  }


}
