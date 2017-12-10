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
  images: UploadMultipleImagesModel[] = [];
  isShowAllValidations: boolean = false;

  constructor(
    private itemApiService: ItemApiService
    //private fileUploadApiService: FileUploadApiService
  ) { }

  ngOnInit() {
    this.populateItemsTvc();
    this.generateItemImageForm();
  }

  /* -------------------  POPULATE ---------------------- */
  private populateItemsTvc(){
    this.itemApiService.getItemsTvc(null).subscribe(
      res => this.itemsTvc = res,
      err => {
        console.log("Error. Can't call GetItemsTvc(x) HttpGet method");
        console.log(err);
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
      let itemImages: ItemImageModel[] = [];
      for(let i=0; i < this.images.length; i++)
      {
        let itemImage = new ItemImageModel();
        itemImage.itemId = this.itemImageForm.value.itemsTvs;
        itemImage.src = this.images[i].src;
        itemImage.isMain = this.images[i].isMainFile;
        itemImage.size = this.images[i].file.size;
        itemImage.imageType = this.images[i].file.type;
        itemImages.push(itemImage);
      }

      this.itemApiService.insertItemImage(itemImages).subscribe(
        res => alert(res),
        err => console.log(err.error)
      );
    }
  }

  // "Next" button
  onNextClick(){ // kali
    // redirect
  }

  // "Reset" button
  onResetClick(){ // kali
    
  }

  onUploadImages(_images: UploadMultipleImagesModel[]){
    console.log("Upload img before saving");
    console.log(_images);
    this.images = _images;
  }

  private uploadImages(){
    if(this.images.length > 0) {
    }

  }

}
