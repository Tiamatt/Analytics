import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TextValueCheckedModel } from "../../models/text-value-checked.model";

@Injectable()

export class FilterApiService{
    private header: HttpHeaders; // http header
    private apiUrl_base: string;
    private apiUrl_getGenders: string;
    private apiUrl_getCategories: string;
    private apiUrl_getBrands: string;
    private apiUrl_getSizes: string;
    private apiUrl_getColors: string;
    private apiUrl_getItemActions: string;
    private apiUrl_getPriceRanges: string;
    private apiUrl_getCustomers: string;

    constructor(private http: HttpClient){
        this.apiUrl_base = 'https://www.tiamatt.com/api/analytics/';
        this.apiUrl_getGenders = this.apiUrl_base + 'genders';
        this.apiUrl_getCategories = this.apiUrl_base + 'categories';
        this.apiUrl_getBrands = this.apiUrl_base + 'brands';
        this.apiUrl_getSizes = this.apiUrl_base + 'sizes';
        this.apiUrl_getColors = this.apiUrl_base + 'colors';
        this.apiUrl_getItemActions = this.apiUrl_base + 'item-actions';
        this.apiUrl_getBrands = this.apiUrl_base + 'brands';
        this.apiUrl_getPriceRanges = this.apiUrl_base + 'price-ranges';
        this.apiUrl_getCustomers = this.apiUrl_base + 'customers';

        this.header = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'});
    }

    getGenders():any{
        return this.http.get<TextValueCheckedModel[]>(this.apiUrl_getGenders, {headers: this.header});
    }

    getCategories():any{
        return this.http.get<TextValueCheckedModel[]>(this.apiUrl_getCategories, {headers: this.header});
    }

    getBrands():any{
        return this.http.get<TextValueCheckedModel[]>(this.apiUrl_getBrands, {headers: this.header});
    }

    getSizes():any{
        return this.http.get<TextValueCheckedModel[]>(this.apiUrl_getSizes, {headers: this.header});
    }    

    getColors():any{
        return this.http.get<TextValueCheckedModel[]>(this.apiUrl_getColors, {headers: this.header});
    }

    getItemActions():any{
        return this.http.get<TextValueCheckedModel[]>(this.apiUrl_getItemActions, {headers: this.header});
    }

    getPriceRanges():any{
        return this.http.get<TextValueCheckedModel[]>(this.apiUrl_getPriceRanges, {headers: this.header}); 
    }

    getCustomers():any{
        return this.http.get<TextValueCheckedModel[]>(this.apiUrl_getCustomers, {headers: this.header}); 
    }
}