import { Component, OnChanges, Input } from '@angular/core';
import { ItemImageModel } from '../../../shared/models/item-image.model';

@Component({
  selector: 'app-item-images-box',
  templateUrl: './item-images-box.component.html',
  styleUrls: ['./item-images-box.component.css']
})
export class ItemImagesBoxComponent implements OnChanges {
  @Input() input: ItemImageModel[] = [];
  selectedItemImage: ItemImageModel;

  constructor() { }

  ngOnChanges() {
    this.getMainItemImage();
  }

  getMainItemImage(){
    this.selectedItemImage= this.input.find(x => x.isMain);
  }

  onReselectItemImage(_selectedItemImage: ItemImageModel){
    this.selectedItemImage = _selectedItemImage;
  }

}
