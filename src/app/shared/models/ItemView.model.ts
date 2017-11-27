import { ItemClass } from "./Item.model";
import { ItemDetailClass } from "./ItemDetail.model";

export class ItemViewClass{
    item: ItemClass;
    infoForIsActive: string;
    itemDetails: ItemDetailClass[]
}