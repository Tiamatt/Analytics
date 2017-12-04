/*
Note: call from other places:
 <app-upload-multiple-images (onChangeOutput)="onUploadImages($event)"></app-upload-multiple-images>

Note: get all uploaded images
  onUploadImages(_val: UploadMultipleImagesModel[]){
    console.log('onUploadImages');
    console.log(_val);
  }
*/

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UploadMultipleImagesModel } from './upload-multiple-images.model';

@Component({
  selector: 'app-upload-multiple-images',
  templateUrl: './upload-multiple-images.component.html',
  styleUrls: ['./upload-multiple-images.component.css']
})
export class UploadMultipleImagesComponent implements OnInit {
  @Output() onChangeOutput = new EventEmitter<UploadMultipleImagesModel[]>();
  
  images: UploadMultipleImagesModel[] = [];
  mainFile: File;
  maxFileSize: number = 104857600; // 100 MB = 104 857 600 KB

  constructor() { }

  ngOnInit() {
  }

  // Output event
  onChange(){
    this.onChangeOutput.emit(this.images);
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
          this.images.push({
              file: file,
              src: e.target.result,
              size: this.getFileSize(file.size),
              isMainFile: false
            });
        }
        imgReader.readAsDataURL(file);
      }
    }
    this.onChange();
  }

  onMakeMainImage(_file: File):void{
    this.mainFile = _file;
    for(let i=0; i<this.images.length; i++)
    {
      this.images[i].isMainFile = (this.images[i].file == _file) ? true : false;
    }
    this.onChange();
  }

  onDeleteImage(_file: File):void{
    // if current file is main, then reassign to null
    if(this.mainFile == _file)
      this.mainFile = null;
    // delete  
    let obj = this.images.find(x => x.file == _file);
    let index = this.images.indexOf(obj); 
    if (index > -1)
      this.images.splice(index, 1);

    this.onChange();  
  }  

  private getFileSize(_fileSize: number):string{
    let fileSize = Math.round(_fileSize/1024) + "KB";
    if(_fileSize/(1024*1024)>1)
      fileSize = Math.round(_fileSize/(1024*1024)) + "MB";
    if(_fileSize/(1024*1024*1024)>1)
      fileSize = Math.round(_fileSize/(1024*1024*1024)) + "GB"; 
    return fileSize;
  }

}