import { Component, OnInit } from '@angular/core';
import { ItemImageModel } from '../../../shared/models/item-image.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextValueCheckedModel } from '../../../shared/models/text-value-checked.model';
import { ItemApiService } from '../../../shared/services/api/itemApi.service';
import { UploadMultipleImagesModel } from '../../../shared/components/custom-components/upload-multiple-images/upload-multiple-images.model';

@Component({
  selector: 'app-item-image-save',
  templateUrl: './item-image-save.component.html',
  styleUrls: ['./item-image-save.component.css', '../../../shared/styles/general.css']
})
export class ItemImageSaveComponent implements OnInit {
  itemImage: ItemImageModel = new ItemImageModel();
  itemImageForm: FormGroup;
  itemsTvc: TextValueCheckedModel;
  isShowAllValidations: boolean = false;

  constructor(private itemApiService: ItemApiService) { }

  ngOnInit() {
    this.populateItemsTvc();
    this.generateItemImageForm();
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


  /* -------------------  EVENTS ---------------------- */
  // generate html form
  private generateItemImageForm(){ 
    this.itemImageForm = new FormGroup({
      'itemsTvs': new FormControl(-1, Validators.min(1))
    });
  }


  // "Save" button
  onSave(){
    if(!this.itemImageForm.valid)      
      this.isShowAllValidations = true;
    else{

    }
  }

  // "Next" button
  onNextClick(){ // kali
    // redirect
  }

  // "Reset" button
  onResetClick(){ // kali
    
  }

  onUploadImages(_val: UploadMultipleImagesModel[]){
    console.log('onUploadImages');
    console.log(_val);
  }

}
