import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IIdName } from "../../models/IIdName.model";
import { IIdNameChecked } from "../../models/IIdNameChecked.model";

@Injectable()

export class FilterApiService{
    private header: HttpHeaders; // http header
    private apiUrl_base: string;
    private apiUrl_getGenders: string;
    private apiUrl_getCategories: string;
    private apiUrl_getBrands: string;
    private apiUrl_getPriceRanges: string;

    constructor(private http: HttpClient){
        this.apiUrl_base = 'https://localhost:44385/api/analytics/'; //kali
        this.apiUrl_getGenders = this.apiUrl_base + 'genders';
        this.apiUrl_getCategories = this.apiUrl_base + 'categories';
        this.apiUrl_getBrands = this.apiUrl_base + 'brands';
        this.apiUrl_getPriceRanges = this.apiUrl_base + 'price-ranges';

        this.header = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'});
    }

    getGenders():any{
        return this.http.get<IIdNameChecked[]>(this.apiUrl_getGenders, {headers: this.header});
    }

    getCategories():any{
        return this.http.get<IIdNameChecked[]>(this.apiUrl_getCategories, {headers: this.header});
    }

    getBrands():any{
        return this.http.get<IIdNameChecked[]>(this.apiUrl_getBrands, {headers: this.header});
    }

    getPriceRanges():any{
        return this.http.get<IIdNameChecked[]>(this.apiUrl_getPriceRanges, {headers: this.header}); 
    }
}