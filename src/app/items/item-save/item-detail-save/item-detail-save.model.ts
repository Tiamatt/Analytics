import { ItemModel } from "../../../shared/models/Item.model";
import { SizeModel } from "../../../shared/models/Size.model";
import { ItemDetailModel } from "../../../shared/models/item-detail.model";

export class ItemDetailSaveClass{
    // kali! Samira, intead of ItemModel[], use TextValue 
    items: ItemModel[]; // get list of {itemId, name}, all rest fields are ignored
    sizes: SizeModel[];
    itemDetail: ItemDetailModel; 

}