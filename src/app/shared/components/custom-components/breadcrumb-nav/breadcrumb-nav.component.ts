import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { LinkStatusEnum } from '../../../enums/link-status.enum';
import { BreadcrumbNavModel } from './breadcrumb-nav.model';

@Component({
  selector: 'app-breadcrumb-nav',
  templateUrl: './breadcrumb-nav.component.html',
  styleUrls: ['./breadcrumb-nav.component.css']
})
export class BreadcrumbNavComponent implements OnInit {

  @Input() input: BreadcrumbNavModel[] = [];
  @Output() onLinkClickOutput = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  onLinkClick(_selectedIndex:number){
    this.onLinkClickOutput.emit(_selectedIndex);
  }

}
