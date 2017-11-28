export class IdNameCheckedClass{
    // fields
    id: number;
    name: string;
    checked: boolean;

    constructor(){}

    // methods
    static getArrayOfSelectedValues(_idNameCheckedArr: IdNameCheckedClass[]):number[]
    {
      let result: number[] = [];
      for(let i=0; i<_idNameCheckedArr.length; i++){
        if(_idNameCheckedArr[i].checked)
          result.push(_idNameCheckedArr[i].id);
      }
      return result;
    }
}