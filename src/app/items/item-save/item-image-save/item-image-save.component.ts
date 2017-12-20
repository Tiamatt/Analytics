import { Component, OnInit } from '@angular/core';
import { ItemImageModel } from '../../../shared/models/item-image.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextValueCheckedModel } from '../../../shared/models/text-value-checked.model';
import { ItemApiService } from '../../../shared/services/api/itemApi.service';
import { UploadMultipleImagesModel } from './upload-multiple-images/upload-multiple-images.model';
import { CalculationService } from '../../../shared/services/helpers/calculation.service';

@Component({
  selector: 'app-item-image-save',
  templateUrl: './item-image-save.component.html',
  styleUrls: ['./item-image-save.component.css', '../../../shared/styles/general.css']
})

export class ItemImageSaveComponent implements OnInit {
  itemImageForm: FormGroup;
  itemsTvc: TextValueCheckedModel; //item ddl
  images: UploadMultipleImagesModel[] = []; // images from db + newly uploaded images
  // variables for validations
  validationMessage: string = "";
  errorMessage: string = "";
  successMessage: string = "";

  constructor(
    private itemApiService: ItemApiService,
    private calculationService: CalculationService
  ) { }

  ngOnInit() {
    this.populateItemsTvc();
    this.generateItemImageForm();
  }

 /* -------------------  PRIVATE METHODS ---------------------- */
  private populateItemsTvc(){
    this.itemApiService.getItemsTvc(null).subscribe(
      res => this.itemsTvc = res,
      err => console.log("Error. Can't call GetItemsTvc(x) HttpGet method")
    );
  }
  // based on selected item show its images if any
  private populateItemImages(_itemId: string){
    this.itemApiService.getItemImageModel(_itemId).subscribe(
      res => {
        this.images = [];
        for(let iim of res)
        {
          let newUmim = new UploadMultipleImagesModel();
          newUmim.file = undefined;
          newUmim.itemImageId = iim.itemImageId;
          newUmim.src = iim.src;
          newUmim.size = iim.size;
          newUmim.sizeName = this.calculationService.getFileSize(iim.size);
          newUmim.isMain  = iim.isMain;
          newUmim.width = 480;
          newUmim.height = 640;
          newUmim.isValid = true;
          newUmim.imageType = iim.imageType;
          this.images.push(newUmim);
        }
      },
      error => console.log("Error. Can't call GetItemImageModel(x) HttpGet method")
    );
  }
  // generate html form
  private generateItemImageForm(){ 
    this.itemImageForm = new FormGroup({
      'itemsTvs': new FormControl(-1, Validators.min(1))
    });
  }
  // check if user selected main image
  private isValidImages():boolean{
    if(this.images.length < 1)
    {
      this.validationMessage = "* Please, upload at least one image";
      return false;
    }

    let atLeastOneInvalidImage = this.images.find(x => x.isValid == false);
    if(atLeastOneInvalidImage){ // validation of image dimensions and sizes
      this.validationMessage = "* Image(s) are invalid.";
      return false;
    }

    let mainImage = this.images.find(x => x.isMain == true);
    if(!mainImage){
      this.validationMessage = "* Please, pick the best image and make it main.";
      return false;
    }

    return true;
  }
  private cleanMessages(){
    this.errorMessage = "";
    this.validationMessage = "";
    this.successMessage = "";
  }
  /* -------------------  EVENTS ---------------------- */
  // When item reselected from item ddl
  onItemSelected(_event:any){
    this.cleanMessages();
    let selectedItemId: string = _event.target.value;
    this.populateItemImages(selectedItemId);
  }
  // getting image array from UploadMultipleImagesComponent
  // on delete, upload, change to mainImage
  onUploadImages(_images: UploadMultipleImagesModel[]){
    this.cleanMessages();
    this.images = _images;
  }
  // "Save" button
  onSave(){
    if(this.itemImageForm.valid && this.isValidImages()){
      let itemImages: ItemImageModel[] = [];
      for(let i=0; i < this.images.length; i++)
      {        
        let itemImage = new ItemImageModel();
        itemImage.itemId = this.itemImageForm.value.itemsTvs;
        itemImage.src = this.images[i].src;
        itemImage.isMain = this.images[i].isMain;
        itemImage.size = this.images[i].size;
        itemImage.imageType = this.images[i].imageType;
        itemImages.push(itemImage);
      }
      this.itemApiService.insertItemImage(itemImages).subscribe(
        res => this.successMessage = "Images uploaded successfully.",
        err => this.errorMessage = "Failed to upload images."
      );
    }
    else
      this.errorMessage = "* Can't save. Please, read notifications above.";
  }
  // "Reset" button
  onResetClick(){
    this.images = [];
    this.cleanMessages();
  }

}
