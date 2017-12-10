import { ItemModel } from "../../shared/models/item.model";
import { ItemDetailModel } from "../../shared/models/item-detail.model";
import { ItemImageModel } from "../../shared/models/item-image.model";
import { ItemActivityEnum } from "../../shared/enums/item-activity.enum";

export class ItemViewModel{
    item: ItemModel;    
    itemDetails: ItemDetailModel[];
    itemImages: ItemImageModel[];
    itemActivities: ItemActivityEnum[];
}