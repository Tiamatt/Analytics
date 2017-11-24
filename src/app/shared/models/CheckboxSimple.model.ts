import { IIdNameChecked } from "./IIdNameChecked.model";

export class CheckboxSimpleClass{
    uniqueId: string;
    title: string;
    options: IIdNameChecked[];
    isStyleBorder: boolean;

    constructor( _uniqueId: string, _options: IIdNameChecked[] ){
        this.uniqueId = _uniqueId;
        this.options = _options;
    }
}