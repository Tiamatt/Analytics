import { Component, OnInit, Input } from '@angular/core';
import { ColorSizeMatrixModel } from './color-size-matrix.model';

@Component({
  selector: 'app-color-size-matrix-box',
  templateUrl: './color-size-matrix-box.component.html',
  styleUrls: ['./color-size-matrix-box.component.css']
})
export class ColorSizeMatrixBoxComponent implements OnInit {
  @Input() input: ColorSizeMatrixModel;
  constructor() { }

  ngOnInit() {
  }

}
