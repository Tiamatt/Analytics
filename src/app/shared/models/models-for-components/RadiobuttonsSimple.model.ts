import { IdNameCheckedClass } from "../IdNameChecked.model";

export class RadiobuttonsSimpleClass{
    uniqueId: string;
    title: string;
    options: IdNameCheckedClass[];
    selectedId: number;
    isStyleBorder: boolean;

    constructor( _uniqueId: string, _options: IdNameCheckedClass[] ){
        this.uniqueId = _uniqueId;
        this.options = _options;
    }
}