export class ItemListFilterPanelModel{

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

    // need to pass to server an object with full info
    static initializeObject():ItemListFilterPanelModel{
        let result =  new ItemListFilterPanelModel();
        
        result.isShowPartialName_txt = false;
        result.partialName = null;
        result.isShowActive_ddl = false;
        result.active = 0;
        result.isShowGender_ddl = false;
        result.gender = 0;
        result.isShowCategory_chb = false;
        result.category = [];
        result.isShowBrand_chb = false;
        result.brand = [];

        return result;
    }
}