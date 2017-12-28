import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ItemDetailModel } from '../../../shared/models/item-detail.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextValueCheckedModel } from '../../../shared/models/text-value-checked.model';
import { RadiobuttonsSimpleClass } from '../../../shared/components/custom-components/radiobuttons-simple/radiobuttons-simple.model';
import { FilterApiService } from '../../../shared/services/api/filterApi.service';
import { ItemApiService } from '../../../shared/services/api/itemApi.service';
import { RequiredWithTrimValidator } from '../../../shared/custom-directives/validators/required-with-trim.validator';

@Component({
  selector: 'app-item-detail-save',
  templateUrl: './item-detail-save.component.html',
  styleUrls: ['./item-detail-save.component.css', '../../../shared/styles/general.css']
})

export class ItemDetailSaveComponent implements OnInit, OnChanges {
  @Input() itemDetailIdInput:string; // guid
  @Output() onSavedOutput = new EventEmitter<boolean>();

  itemDetail: ItemDetailModel = new ItemDetailModel();
  itemDetailForm: FormGroup;
  title: string = "Add item detail"; // if input is not null, then "Update item detail"
  saveButtonName: string = "Add";  // if input is not null, then "Update"
  // ddls + radiobuttons
  itemsTvc: TextValueCheckedModel;
  sizes: TextValueCheckedModel;
  colors: TextValueCheckedModel;
  itemActions: RadiobuttonsSimpleClass;
  customers: TextValueCheckedModel;
  // validations
  isShowCustomersDdl: boolean = false;
  isShowAllValidations: boolean = false;
  isItemActionValid: boolean = false;
  // notifications
  resultNotification: string;

  constructor(
    private filterApiService: FilterApiService,
    private itemApiService: ItemApiService
  ) { }

  ngOnInit() {
    this.populateItemsTvc();
    this.populateSizes();
    this.populateColors();
    this.populateItemActions(null);
    this.populateCustomers();
    this.generateItemDetailForm();
  }
  ngOnChanges(_changes: SimpleChanges){
    if(_changes.itemDetailIdInput != undefined)
    {
      this.itemDetailIdInput = _changes.itemDetailIdInput.currentValue;
      this.prepopulateItemDetailModel(this.itemDetailIdInput);
    }
  }

  /* -------------------  PRIVATE METHODS ---------------------- */
  private populateItemsTvc(){
    this.itemApiService.getItemsTvc(null).subscribe(
      res => this.itemsTvc = res,
      err => {
        console.log("Error. Can't call GetItemsTvc() HttpGet method");
      }
    );
  }
  private populateSizes(){
    this.filterApiService.getSizes().subscribe(
      res => this.sizes = res,
      err => {
        console.log("Error. Can't call GetSizes() HttpGet method");
      }
    );
  }
  private populateColors(){
    this.filterApiService.getColors().subscribe(
      res => this.colors = res,
      err => {
        console.log("Error. Can't call GetColors() HttpGet method");
      }
    );
  }
  private populateItemActions(_itemActionId: number){
    this.filterApiService.getItemActions().subscribe(
      res => {
        this.itemActions = new RadiobuttonsSimpleClass("itemActions_1", res);
        this.itemActions.isStyleBorder = true;
        this.itemActions.title = "Action";
        if(_itemActionId)
          this.itemActions.selectedId = _itemActionId;
      },
      err => {
        console.log("Error. Can't call GetItemActions() HttpGet method");
      }
    );
  } 
  private populateCustomers(){
    this.filterApiService.getCustomers().subscribe(
      res => this.customers = res,
      err => {
        console.log("Error. Can't call GetCustomers() HttpGet method");
      }
    );
  }
  private prepopulateItemDetailModel(_itemDetailId: string){
    this.itemApiService.getItemDetail(_itemDetailId).subscribe(
      res => {
        this.itemDetail = (res)? res : new ItemDetailModel();
        this.generateItemDetailForm();
        this.populateItemActions(this.itemDetail.itemActionId);
        this.onItemActionSelected(this.itemDetail.itemActionId);
        this.title = "Update item detail";
        this.saveButtonName = "Update";
      },
      err => console.log("Error. Can't call GetItemDetail(X) HttpGet method")
    );
  }
  private generateItemDetailForm(){ 
    this.itemDetailForm = new FormGroup({
      'itemsTvs': new FormControl((this.itemDetail.itemId) ? this.itemDetail.itemId.toUpperCase() : -1, Validators.min(1)),
      'sizes': new FormControl((this.itemDetail.sizeId) ? this.itemDetail.sizeId : -1, Validators.min(1)),
      'colors': new FormControl((this.itemDetail.colorId) ? this.itemDetail.colorId : -1, Validators.min(1)),      
      'quantity':new FormControl((this.itemDetail.quantity) ? Math.abs(this.itemDetail.quantity).toString() : null, [RequiredWithTrimValidator, Validators.pattern('^[0-9]*$'), Validators.min(0), Validators.max(1000000000)]),
      'customers': new FormControl((this.itemDetail.customerId) ? this.itemDetail.customerId.toUpperCase() : -1)    
    });
  }
  
  /* -------------------  EVENTS ---------------------- */
  // get selected ItemAction from Custom RadiobuttonsSimple
  onItemActionSelected(_selectedItemActionId: number){    this.itemDetail.itemActionId = _selectedItemActionId;
    this.isItemActionValid = true;
    // if Sold (2) or Returned (3) then add CustomerId
    this.isShowCustomersDdl = (_selectedItemActionId == 2 || _selectedItemActionId == 3) ? true : false;
  }
  // "Save" button
  onSave(){
    if(!this.itemDetailForm.valid)      
      this.isShowAllValidations = true;
    else if(this.itemDetail.itemActionId  == undefined || this.itemDetail.itemActionId  < 1)
    {
      this.isItemActionValid = false;
      this.isShowAllValidations = true;
    }
    else
    {      
      this.isShowAllValidations = false;

      // populate item object
      // this.itemDetail.itemDetailId will be specified in SQL Server 
      this.itemDetail.itemId = this.itemDetailForm.value.itemsTvs;
      this.itemDetail.sizeId = this.itemDetailForm.value.sizes;
      this.itemDetail.colorId = this.itemDetailForm.value.colors;
      this.itemDetail.quantity = this.itemDetailForm.value.quantity.trim();
      // this.itemDetail.itemActionId has been assigned in onItemActionSelected()
      this.itemDetail.customerId = (this.itemDetailForm.value.customers != -1) ? this.itemDetailForm.value.customers : null;

      // create new itemDetail
      if(this.itemDetailIdInput)
      {
        this.itemApiService.updateItemDetail(this.itemDetail).subscribe(
          res => { 
            this.resultNotification = "Item Detail updated successfully"; 
            this.onSavedOutput.emit(true);
          },
          err => { 
            this.resultNotification = "Failed to updated Item Detail";
            this.onSavedOutput.emit(false); 
            console.log(err);
          }
        );
      }
      else{
        this.itemApiService.insertItemDetail(this.itemDetail).subscribe(
          res => { 
            this.resultNotification = "Item Detail created successfully";
            this.onSavedOutput.emit(true); 
          },
          err => { 
            this.resultNotification = "Failed to create Item Detail";
            this.onSavedOutput.emit(false);  
            console.log(err);
          }
        );
      }
    }
  }
  // "Reset" button
  onResetClick(){ // kali
    if(this.itemDetailIdInput)
      this.prepopulateItemDetailModel(this.itemDetailIdInput);
    else{
      this.itemDetail = new ItemDetailModel();
      this.generateItemDetailForm();
    }
  }

}
