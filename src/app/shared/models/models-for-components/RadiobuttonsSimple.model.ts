import { IIdNameChecked } from "../IIdNameChecked.model";

export class RadiobuttonsSimpleClass{
    uniqueId: string;
    title: string;
    options: IIdNameChecked[];
    selectedId: number;
    isStyleBorder: boolean;

    constructor( _uniqueId: string, _options: IIdNameChecked[] ){
        this.uniqueId = _uniqueId;
        this.options = _options;
    }
}