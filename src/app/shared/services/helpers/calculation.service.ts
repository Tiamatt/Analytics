import { Injectable } from "@angular/core";

@Injectable()

export class CalculationService{
    
    constructor(){}

    getFileSize(_fileSize: number):string{
        let fileSize = Math.round(_fileSize/1024) + "KB";
        if(_fileSize/(1024*1024)>1)
            fileSize = Math.round(_fileSize/(1024*1024)) + "MB";
        if(_fileSize/(1024*1024*1024)>1)
            fileSize = Math.round(_fileSize/(1024*1024*1024)) + "GB"; 
        return fileSize;
    }
}