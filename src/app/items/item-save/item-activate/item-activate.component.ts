import { Component, OnInit, Input } from '@angular/core';
import { ItemActivateModel } from './item-activate.model';

@Component({
  selector: 'app-item-activate',
  templateUrl: './item-activate.component.html',
  styleUrls: ['./item-activate.component.css', '../../../shared/styles/general.css']
})
export class ItemActivateComponent implements OnInit {
  @Input() input: ItemActivateModel;
  constructor() { }

  ngOnInit() { }

}
