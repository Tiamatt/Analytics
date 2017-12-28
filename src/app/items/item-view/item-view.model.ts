import { ItemModel } from "../../shared/models/item.model";
import { ItemDetailModel } from "../../shared/models/item-detail.model";
import { ItemImageModel } from "../../shared/models/item-image.model";
import { ItemActivityEnum } from "../../shared/enums/item-activity.enum";
import { ColorSizeMatrixModel } from "./color-size-matrix-box/color-size-matrix.model";

export class ItemViewModel{
    item: ItemModel;
    itemImages: ItemImageModel[];
    itemActivities: ItemActivityEnum[];
}