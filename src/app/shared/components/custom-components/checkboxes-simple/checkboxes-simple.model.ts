import { TextValueCheckedModel } from "../../../models/text-value-checked.model";



export class CheckboxesSimpleClass{
    uniqueId: string;
    title: string;
    options: TextValueCheckedModel[];
    isStyleBorder: boolean;

    constructor( _uniqueId: string, _options: TextValueCheckedModel[] ){
        this.uniqueId = _uniqueId;
        this.options = _options;
    }
}