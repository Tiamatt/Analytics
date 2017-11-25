import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BreadcrumbNavClass } from '../../models/models-for-components/BreadcrumbNav.model';
import { LinkStatusEnum } from '../../enums/link-status.enum';

@Component({
  selector: 'app-breadcrumb-nav',
  templateUrl: './breadcrumb-nav.component.html',
  styleUrls: ['./breadcrumb-nav.component.css']
})
export class BreadcrumbNavComponent implements OnInit {

  @Input() input: BreadcrumbNavClass[] = [];
  @Output() onLinkClickOutput = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  onLinkClick(_selectedIndex:number){
    this.onLinkClickOutput.emit(_selectedIndex);
  }

}
