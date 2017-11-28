export class ItemListFilterPanelClass{
    isShowPartialName_txt: boolean;
    partialName:string;
    isShowActive_ddl: boolean;
    active: number; // 0 is "All", 1 is "Active", 2 is "Not Active"
    isShowGender_ddl: boolean;
    gender: number; // 0 is "All", 1 is "Women", 2 is "Men"
    isShowCategory_chb: boolean;
    category: number[];
    isShowBrand_chb: boolean;
    brand: number[];
}