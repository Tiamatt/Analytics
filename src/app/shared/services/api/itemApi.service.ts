import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ItemClass } from "../../models/Item.model";

@Injectable()

export class ItemApiService{
    header: HttpHeaders; // http header
    employeeId: string = '6726B8BB-3483-40DB-9CBD-4EC5CB7CBE3E';
    apiUrl_base: string;
    apiUrl_getItemNamesLowercase: string;
    apiUrl_insertItem: string;

    constructor(private http: HttpClient){
        this.apiUrl_base = 'https://localhost:44385/api/analytics/'; //kali
        this.apiUrl_getItemNamesLowercase = this.apiUrl_base + 'item-names-lowercase';
        this.apiUrl_insertItem = this.apiUrl_base + 'insert-item/' + this.employeeId;

        this.header = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'});
    }

    getItemNamesLowercase():any{
        return this.http.get<string[]>(this.apiUrl_getItemNamesLowercase, {headers: this.header});
    }

    insertItem(_newItem: ItemClass)
    {
        return this.http.post(this.apiUrl_insertItem, _newItem, {headers: this.header});
    }

}