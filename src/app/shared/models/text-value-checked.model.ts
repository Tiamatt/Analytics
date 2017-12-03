export class TextValueCheckedModel{
    valueStr: string;
    valueNum: number;
    text: string;
    extraText: string;
    isChecked: boolean;

    constructor(){}
    
    // returns array of strings
    static getArrayOfSelectedValuesStr(_textValueCheckedArr: TextValueCheckedModel[]):string[]
    {
        let result: string[] = [];
        for(let i=0; i<_textValueCheckedArr.length; i++){
        if(_textValueCheckedArr[i].isChecked)
            result.push(_textValueCheckedArr[i].valueStr);
        }
        return result;
    }

    // returns array of numbers
    static getArrayOfSelectedValuesNum(_textValueCheckedArr: TextValueCheckedModel[]):number[]
    {
        let result: number[] = [];
        for(let i=0; i<_textValueCheckedArr.length; i++){
        if(_textValueCheckedArr[i].isChecked)
            result.push(_textValueCheckedArr[i].valueNum);
        }
        return result;
    }
    
}