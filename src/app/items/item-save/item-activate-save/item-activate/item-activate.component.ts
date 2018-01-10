import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ItemActivateModel } from './item-activate.model';
import { ItemApiService } from '../../../../shared/services/api/itemApi.service';

@Component({
  selector: 'app-item-activate',
  templateUrl: './item-activate.component.html',
  styleUrls: ['./item-activate.component.css', '../../../../shared/styles/general.css']
})
export class ItemActivateComponent implements OnInit, OnChanges {
  @Input() itemIdInput: string;
  @Output() onChangeActivityOutput = new EventEmitter<boolean>();

  data: ItemActivateModel;

  constructor(private itemApiService: ItemApiService) { }

  ngOnInit() { }

  ngOnChanges(){
    this.itemApiService.getItemActivity(this.itemIdInput).subscribe(
      res => this.data = res,
      err => console.log("Error. Can't call GetItemActivity(x) HttpGet method")
    );
  }

  onDeactivateItem(){
    this.itemApiService.updateItemActivity(this.data.itemId, false).subscribe(
      res => { 
        this.data.isItemActive = false;
        this.onChangeActivityOutput.emit(false);
      },
      err => console.log("Error. Can't call UpdateItemActivity(x) HttpGet method")
    );
  }
  onActivateItem(){
    this.itemApiService.updateItemActivity(this.data.itemId, true).subscribe(
      res => {
        this.data.isItemActive = true;
        this.onChangeActivityOutput.emit(false);
      },
      err => console.log("Error. Can't call UpdateItemActivity(x) HttpGet method")
    );
  }

}
