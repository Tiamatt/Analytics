import { TextValueCheckedModel } from "../../../models/text-value-checked.model";

export class RadiobuttonsSimpleClass{
    uniqueId: string;
    title: string;
    options: TextValueCheckedModel[];
    selectedId: number;
    isStyleBorder: boolean;

    constructor( _uniqueId: string, _options: TextValueCheckedModel[] ){
        this.uniqueId = _uniqueId;
        this.options = _options;
    }
}