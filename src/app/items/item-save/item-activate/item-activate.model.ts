import { ItemActivityEnum } from "../../../shared/enums/item-activity.enum";

export class ItemActivateModel{
    itemId: string;
    itemName: string;
    isItemActive: boolean;
    itemActivities: ItemActivityEnum[];
}