import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IIdName } from "../../models/IIdName.model";
import { IIdNameChecked } from "../../models/IIdNameChecked.model";

@Injectable()

export class FilterApiService{
    apiUrl_base: string;
    apiUrl_getBrands: string;
    apiUrl_getPriceRanges: string;

    constructor(private http: HttpClient){
        this.apiUrl_base = 'https://localhost:44385/api/analytics/'; //kali
        this.apiUrl_getBrands = this.apiUrl_base + 'brands';
        this.apiUrl_getPriceRanges = this.apiUrl_base + 'price-ranges';
    }

    getBrands():any{
        return this.http.get<IIdNameChecked[]>(this.apiUrl_getBrands);
    }

    getPriceRanges():any{
        return this.http.get<IIdNameChecked[]>(this.apiUrl_getPriceRanges); 
    }
}