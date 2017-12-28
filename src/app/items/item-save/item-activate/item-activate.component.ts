import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemActivateModel } from './item-activate.model';
import { ItemApiService } from '../../../shared/services/api/itemApi.service';

@Component({
  selector: 'app-item-activate',
  templateUrl: './item-activate.component.html',
  styleUrls: ['./item-activate.component.css', '../../../shared/styles/general.css']
})
export class ItemActivateComponent implements OnInit {
  @Input() input: ItemActivateModel;
  @Output() onChangeActivityOutput = new EventEmitter<boolean>();

  constructor(private itemApiService: ItemApiService) { }

  ngOnInit() { }

  onDeactivateItem(){
    this.itemApiService.updateItemActivity(this.input.itemId, false).subscribe(
      res => { 
        this.input.isItemActive = false;
        this.onChangeActivityOutput.emit(false);
      },
      err => console.log("Error. Can't call UpdateItemActivity(x) HttpGet method")
    );
  }
  onActivateItem(){
    this.itemApiService.updateItemActivity(this.input.itemId, true).subscribe(
      res => {
        this.input.isItemActive = true;
        this.onChangeActivityOutput.emit(false);
      },
      err => console.log("Error. Can't call UpdateItemActivity(x) HttpGet method")
    );
  }

}
