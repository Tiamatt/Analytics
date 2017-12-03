import { Component, OnInit } from '@angular/core';
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

export class ItemDetailSaveComponent implements OnInit {
  title: string = "Create new item detail"; // kali, can be "update existing item detail"
  itemDetail: ItemDetailModel = new ItemDetailModel();
  itemForm: FormGroup;
  itemsTvc: TextValueCheckedModel;
  sizes: TextValueCheckedModel;
  colors: TextValueCheckedModel;
  itemActions: RadiobuttonsSimpleClass;
  customers: TextValueCheckedModel;
  isShowCustomersDdl: boolean = false;
  isShowAllValidations: boolean = false;
  isItemActionValid: boolean = false;

  constructor(
    private filterApiService: FilterApiService,
    private itemApiService: ItemApiService
  ) { }

  ngOnInit() {
    this.populateItemsTvc();
    this.populateSizes();
    this.populateColors();
    this.populateItemActions();
    this.populateCustomers();
    this.generateItemForm();
  }

  /* -------------------  POPULATE ---------------------- */
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
  private populateItemActions(){
    this.filterApiService.getItemActions().subscribe(
      res => {
        this.itemActions = new RadiobuttonsSimpleClass("itemActions_1", res);
        this.itemActions.isStyleBorder = true;
        this.itemActions.title = "Action";
        //this.itemActions.selectedId = this.itemActions.options[0].id;
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

  /* -------------------  EVENTS ---------------------- */
  // generate html form
  private generateItemForm(){ 
    this.itemForm = new FormGroup({
      'itemsTvs': new FormControl(-1, Validators.min(1)),
      'sizes': new FormControl(-1, Validators.min(1)),
      'colors': new FormControl(-1, Validators.min(1)),      
      'quantity':new FormControl(null, [RequiredWithTrimValidator, Validators.pattern('^[0-9]*$'), Validators.min(0), Validators.max(1000000000)]),
      'customers': new FormControl(-1)    
    });
  }
  
  // get selected ItemAction from Custom RadiobuttonsSimple
  onItemActionSelected(_selectedItemActionId: number){
    this.itemDetail.itemActionId = _selectedItemActionId;
    this.isItemActionValid = true;
    // if Sold (2) or Returned (3) then add CustomerId
    this.isShowCustomersDdl = (_selectedItemActionId == 2 || _selectedItemActionId == 3) ? true : false;
  }

  // "Save" button
  onSave(){
    if(!this.itemForm.valid)      
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
      this.itemDetail.itemId = this.itemForm.value.itemsTvs;
      this.itemDetail.sizeId = this.itemForm.value.sizes;
      this.itemDetail.colorId = this.itemForm.value.colors;
      this.itemDetail.quantity = this.itemForm.value.quantity.trim();
      // this.itemDetail.itemActionId has been assigned in onItemActionSelected()
      this.itemDetail.customerId = this.itemForm.value.customers;

      // save in db via api
      this.itemApiService.insertItemDetail(this.itemDetail).subscribe(
        res => console.log(res),
        err => console.log(err.error)
      );
    }
  }

  // "Next" button
  onNextClick(){
    // redirect
  }

  // "Reset" button
  onResetClick(){
    
  }

}
