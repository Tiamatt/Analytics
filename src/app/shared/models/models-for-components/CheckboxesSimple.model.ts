import { IdNameCheckedClass } from "./../IdNameChecked.model";

export class CheckboxesSimpleClass{
    uniqueId: string;
    title: string;
    options: IdNameCheckedClass[];
    isStyleBorder: boolean;

    constructor( _uniqueId: string, _options: IdNameCheckedClass[] ){
        this.uniqueId = _uniqueId;
        this.options = _options;
    }
}