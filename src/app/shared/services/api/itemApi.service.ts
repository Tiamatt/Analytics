import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

export class ItemApiService{
    apiUrl_base: string;
    apiUrl_getItemNamesLowercase: string;

    constructor(private http: HttpClient){
        this.apiUrl_base = 'https://localhost:44385/api/analytics/'; //kali
        this.apiUrl_getItemNamesLowercase = this.apiUrl_base + 'item-names-lowercase';
    }

    getItemNamesLowercase():any{
        return this.http.get<string[]>(this.apiUrl_getItemNamesLowercase);
    }

}