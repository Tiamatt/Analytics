import { SizeModel } from "../../../shared/models/size.model";
import { ColorModel } from "../../../shared/models/color.model";

export class ColorSizeMatrixModel{
    sizes: SizeModel[];
    colors: ColorModel[];
    quantities: number[][];
}