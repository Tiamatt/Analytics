import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ItemModel } from "../../models/item.model";
import { ItemListFilterPanelModel } from "../../../items/item-list/item-list-filter-panel/item-list-filter-panel.model";
import { ItemViewModel } from "../../../items/item-view/item-view.model";

@Injectable()

export class ItemApiService{
    private header: HttpHeaders; // http header
    employeeId: string = '6726B8BB-3483-40DB-9CBD-4EC5CB7CBE3E';
    private apiUrl_base: string;
    private apiUrl_getItemNamesLowercase: string;
    private apiUrl_getItemViews: string;
    private apiUrl_insertItem: string;

    constructor(private http: HttpClient){
        this.apiUrl_base = 'https://localhost:44385/api/analytics/'; //kali
        this.apiUrl_getItemNamesLowercase = this.apiUrl_base + 'item-names-lowercase';
        this.apiUrl_getItemViews = this.apiUrl_base + 'item-views';
        this.apiUrl_insertItem = this.apiUrl_base + 'insert-item/' + this.employeeId;

        this.header = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'});
    }

    getItemNamesLowercase():any{
        return this.http.get<string[]>(this.apiUrl_getItemNamesLowercase, {headers: this.header});
    }

    // getItemsIdname():any{
    //     return this.http.get<>
    // }

    // not all fields are populated!
    getItemViews(_filters: ItemListFilterPanelModel): any{
        return this.http.post<ItemViewModel[]>(this.apiUrl_getItemViews, _filters, {headers: this.header});
    }


    insertItem(_newItem: ItemModel)
    {
        return this.http.post(this.apiUrl_insertItem, _newItem, {headers: this.header});
    }

}