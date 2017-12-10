import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ItemModel } from "../../models/item.model";
import { ItemListFilterPanelModel } from "../../../items/item-list/item-list-filter-panel/item-list-filter-panel.model";
import { ItemViewModel } from "../../../items/item-view/item-view.model";
import { TextValueCheckedModel } from "../../models/text-value-checked.model";
import { ItemDetailModel } from "../../models/item-detail.model";
import { ItemImageModel } from "../../models/item-image.model";

@Injectable()

export class ItemApiService{
    private header: HttpHeaders; // http header
    employeeId: string = '6726B8BB-3483-40DB-9CBD-4EC5CB7CBE3E'; //kali
    private apiUrl_base: string;
    private apiUrl_getItemsTvc: string;
    private apiUrl_getItemNamesLowercase: string;
    private apiUrl_getItemViews: string;
    private apiUrl_getItemView: string;
    private apiUrl_insertItem: string;
    private apiUrl_insertItemDetail: string;
    private apiUrl_insertItemImage: string;

    constructor(private http: HttpClient){
        this.apiUrl_base = 'https://localhost:44385/api/analytics/'; //kali
        this.apiUrl_getItemsTvc = this.apiUrl_base + 'items-tvc/';
        this.apiUrl_getItemNamesLowercase = this.apiUrl_base + 'item-names-lowercase';
        this.apiUrl_getItemViews = this.apiUrl_base + 'item-views';
        this.apiUrl_getItemView = this.apiUrl_base + 'item-view/';
        this.apiUrl_insertItem = this.apiUrl_base + 'insert-item/' + this.employeeId;
        this.apiUrl_insertItemDetail = this.apiUrl_base + 'insert-item-detail/' + this.employeeId;
        this.apiUrl_insertItemImage = this.apiUrl_base + 'insert-item-image/' + this.employeeId;
        
        this.header = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'});
    }

    // Note: TVC means "Text Value Checked"
    getItemsTvc(_isActive: boolean | null):any{
        this.apiUrl_getItemsTvc += _isActive;
        return this.http.get<TextValueCheckedModel[]>(this.apiUrl_getItemsTvc, {headers: this.header}); 
    }

    getItemNamesLowercase():any{
        return this.http.get<string[]>(this.apiUrl_getItemNamesLowercase, {headers: this.header});
    }

    // not all fields are populated!
    getItemViews(_filters: ItemListFilterPanelModel): any{
        return this.http.post<ItemViewModel[]>(this.apiUrl_getItemViews, _filters, {headers: this.header});
    }

    getItemView(_itemId: string): any{
        this.apiUrl_getItemView += _itemId;
        return this.http.post<ItemViewModel>(this.apiUrl_getItemView, {headers: this.header}); 
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

}