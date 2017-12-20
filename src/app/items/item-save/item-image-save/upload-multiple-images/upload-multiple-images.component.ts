/*
Note: call from other places:
  <app-upload-multiple-images [imagesInput]="images" (onChangeOutput)="onUploadImages($event)"></app-upload-multiple-images>

Note: get all uploaded images
  onUploadImages(_val: UploadMultipleImagesModel[]){
    console.log('onUploadImages');
    console.log(_val);
  }
*/

import { Component, OnChanges, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { UploadMultipleImagesModel } from './upload-multiple-images.model';
import { CalculationService } from '../../../../shared/services/helpers/calculation.service';

@Component({
  selector: 'app-upload-multiple-images',
  templateUrl: './upload-multiple-images.component.html',
  styleUrls: ['./upload-multiple-images.component.css']
})
export class UploadMultipleImagesComponent implements OnChanges {
  @Input() imagesInput: UploadMultipleImagesModel[]; // images from db + newly uploaded images
  @Output() onChangeOutput = new EventEmitter<UploadMultipleImagesModel[]>();
  readonly maxFileSize: number = 104857600; // 100 MB = 104 857 600 KB
  readonly dimensionWidth: number = 480;
  readonly dimensionHeight: number = 640;
  // NOTE: 
  // a) images from db will have imagesInput.itemImageId value (file is undefined)
  // b) newly uploaded images will have imagesInput.file value (itemImageId is undefined)

  constructor(private calculationService: CalculationService) { }

  ngOnChanges(_changes: SimpleChanges){
    // show image from db for current itemId if any
    this.imagesInput = _changes.imagesInput.currentValue;
  }



  /* -------------------  EVENTS ---------------------- */
  // Output event
  onChange(){
    this.onChangeOutput.emit(this.imagesInput);
  }
  onFileUpload(_event):void {
    let files: FileList = _event.target.files;
    for(let i = 0; i< files.length; i++){
      let file: File = files[i];
      if(!file.type.match('image'))
        continue;
      else{
        let imgReader = new FileReader();
        imgReader.onload = (e:any) => {
          // use Image to get width and height  
          let img = new Image();
          img.src = e.target.result;
          img.onload = () => {
            let isImgValid = (file.size <= this.maxFileSize && img.width == this.dimensionWidth && img.height == this.dimensionHeight) ? true : false;
            this.imagesInput.push({
                file: file,
                itemImageId: "",
                src: e.target.result,
                size: file.size,
                sizeName: this.calculationService.getFileSize(file.size),
                isMain: false,
                width: img.width,
                height: img.height,
                isValid: isImgValid,
                imageType: file.type
              });
          }
        }
        imgReader.readAsDataURL(file);
      }
    }
    this.onChange();
  }
  onMakeMainImage(_file: File, _itemImageId: string):void{
    for(let i=0; i<this.imagesInput.length; i++)
    {
      if(_itemImageId) // images from db
        this.imagesInput[i].isMain = (this.imagesInput[i].itemImageId == _itemImageId) ? true : false;
      else // newly added images
        this.imagesInput[i].isMain = (this.imagesInput[i].file == _file) ? true : false;
    }
    this.onChange();
  }
  onDeleteImage(_file: File, _itemImageId: string):void{
    let obj: UploadMultipleImagesModel;
    if(_itemImageId) // images from db
      obj = this.imagesInput.find(x => x.itemImageId == _itemImageId);
    else // newly added images 
      obj = this.imagesInput.find(x => x.file == _file);      
    let index = this.imagesInput.indexOf(obj); 
    if (index > -1)
      this.imagesInput.splice(index, 1);

    this.onChange();  
  }  
}