import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ItemModel } from "../../models/item.model";
import { ItemListFilterPanelModel } from "../../../items/item-list/item-list-filter-panel/item-list-filter-panel.model";
import { ItemViewModel } from "../../../items/item-view/item-view.model";
import { TextValueCheckedModel } from "../../models/text-value-checked.model";
import { ItemDetailModel } from "../../models/item-detail.model";
import { ItemImageModel } from "../../models/item-image.model";
import { ColorSizeMatrixModel } from "../../../items/item-view/color-size-matrix-box/color-size-matrix.model";
import { ItemActivateModel } from "../../../items/item-save/item-activate-save/item-activate/item-activate.model";

@Injectable()

export class ItemApiService{
    private header: HttpHeaders; // http header
    employeeId: string = '6726B8BB-3483-40DB-9CBD-4EC5CB7CBE3E'; //kali
    private apiUrl_base: string;
    private apiUrl_getItemsTvc: string;
    private apiUrl_getItemNamesLowercase: string;
    private apiUrl_getItemModel:string;
    private apiUrl_getItemImageModel:string;
    private apiUrl_getItemViews: string;
    private apiUrl_getItemView: string;
    private apiUrl_getItemDetails: string;
    private apiUrl_getColorSizeMatrix: string;
    private apiUrl_getItemDetail: string;
    private apiUrl_getItemActivity: string;
    private apiUrl_insertItem: string;
    private apiUrl_insertItemDetail: string;
    private apiUrl_insertItemImage: string;
    private apiUrl_updateItem: string;
    private apiUrl_updateItemDetail: string;
    private apiUrl_updateItemActivity: string;
    private apiUrl_deleteItem: string;
    private apiUrl_deleteItemDetail: string;

    constructor(private http: HttpClient){
        this.apiUrl_base = 'https://www.tiamatt.com/api/analytics/';
        this.apiUrl_getItemsTvc = this.apiUrl_base + 'items-tvc/';
        this.apiUrl_getItemNamesLowercase = this.apiUrl_base + 'item-names-lowercase/';
        this.apiUrl_getItemModel = this.apiUrl_base + 'item-model/'
        this.apiUrl_getItemImageModel = this.apiUrl_base + 'item-image-model/'
        this.apiUrl_getItemViews = this.apiUrl_base + 'item-views';
        this.apiUrl_getItemView = this.apiUrl_base + 'item-view/';
        this.apiUrl_getItemDetails = this.apiUrl_base + 'item-details/';
        this.apiUrl_getColorSizeMatrix = this.apiUrl_base + 'color-size-matrix/';
        this.apiUrl_getItemDetail = this.apiUrl_base + 'item-detail/';
        this.apiUrl_getItemActivity = this.apiUrl_base + 'item-activity/';
        this.apiUrl_insertItem = this.apiUrl_base + 'insert-item/' + this.employeeId;
        this.apiUrl_insertItemDetail = this.apiUrl_base + 'insert-item-detail/' + this.employeeId;
        this.apiUrl_insertItemImage = this.apiUrl_base + 'insert-item-image/' + this.employeeId;
        this.apiUrl_updateItem = this.apiUrl_base + 'update-item/' + this.employeeId;
        this.apiUrl_updateItemDetail = this.apiUrl_base + 'update-item-detail/' + this.employeeId;
        this.apiUrl_updateItemActivity = this.apiUrl_base + 'update-item-activity/' + this.employeeId;
        this.apiUrl_deleteItem = this.apiUrl_base + 'delete-item/' + this.employeeId;
        this.apiUrl_deleteItemDetail = this.apiUrl_base + 'delete-item-detail/' + this.employeeId;

        this.header = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'});
    }

    // Note: TVC means "Text Value Checked"
    getItemsTvc(_isActive: boolean | null):any{
        let apiUrl = this.apiUrl_getItemsTvc + _isActive;
        return this.http.get<TextValueCheckedModel[]>(apiUrl, {headers: this.header}); 
    }

    getItemNamesLowercase(_itemId: string):any{
        let apiUrl = this.apiUrl_getItemNamesLowercase + _itemId;
        return this.http.get<string[]>(apiUrl, {headers: this.header});
    }

    getItemModel(_itemId: string): any{
        let apiUrl = this.apiUrl_getItemModel + _itemId;
        return this.http.get<ItemModel>(apiUrl, {headers: this.header}); 
    }

    getItemImageModel(_itemId: string): any{
        let apiUrl = this.apiUrl_getItemImageModel + _itemId;
        return this.http.get<ItemImageModel>(apiUrl, {headers: this.header}); 
    }

    // not all fields are populated!
    getItemViews(_filters: ItemListFilterPanelModel): any{
        return this.http.post<ItemViewModel[]>(this.apiUrl_getItemViews, _filters, {headers: this.header});
    }

    getItemView(_itemId: string): any{
        let apiUrl = this.apiUrl_getItemView + _itemId;
        return this.http.post<ItemViewModel>(apiUrl, {headers: this.header}); 
    }
    
    getItemDetails(_itemId: string): any{
        let apiUrl = this.apiUrl_getItemDetails + _itemId;
        return this.http.get<ItemDetailModel>(apiUrl, {headers: this.header}); 
    }
    
    getColorSizeMatrix(_itemId: string): any{
        let apiUrl = this.apiUrl_getColorSizeMatrix + _itemId;
        return this.http.post<ColorSizeMatrixModel>(apiUrl, {headers: this.header}); 
    }

    getItemDetail(_itemDetailId: string): any{
        let apiUrl = this.apiUrl_getItemDetail + _itemDetailId;
        return this.http.post<ItemDetailModel>(apiUrl, {headers: this.header}); 
    }

    getItemActivity(_itemId: string): any{
        let apiUrl = this.apiUrl_getItemActivity + _itemId;
        return this.http.post<ItemActivateModel>(apiUrl, {headers: this.header}); 
    }

    insertItem(_newItem: ItemModel){
        return this.http.post(this.apiUrl_insertItem, _newItem, {headers: this.header});
    }

    insertItemDetail(_newItemDetail: ItemDetailModel){
        return this.http.post(this.apiUrl_insertItemDetail, _newItemDetail, {headers: this.header});
    }

    insertItemImage( _itemImages: ItemImageModel[]){
        return this.http.post(this.apiUrl_insertItemImage, _itemImages, {headers: this.header});
    }

    updateItem(_item: ItemModel){
        return this.http.post(this.apiUrl_updateItem, _item, {headers: this.header});
    }

    updateItemDetail(_itemDetail: ItemDetailModel){
        return this.http.post(this.apiUrl_updateItemDetail, _itemDetail, {headers: this.header});
    }

    updateItemActivity(_itemId: string, _isActive: boolean){
        let apiUrl = this.apiUrl_updateItemActivity + '/' + _itemId + '/' + _isActive;
        return this.http.post(apiUrl, {headers: this.header}); 
    }

    deleteItem(_itemId: string){
        let apiUrl = this.apiUrl_deleteItem + '/' + _itemId;
        return this.http.delete(apiUrl, {headers: this.header});
    }

    deleteItemDetail(_itemDetailId: string){
        let apiUrl = this.apiUrl_deleteItemDetail + '/' + _itemDetailId;
        return this.http.delete(apiUrl, {headers: this.header});
    }
}