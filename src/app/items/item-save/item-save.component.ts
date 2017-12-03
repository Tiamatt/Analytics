import { Component, OnInit } from '@angular/core';
import { LinkStatusEnum } from '../../shared/enums/link-status.enum';
import { BreadcrumbNavClass } from '../../shared/components/custom-components/breadcrumb-nav/breadcrumb-nav.model';

@Component({
  selector: 'app-item-save',
  templateUrl: './item-save.component.html',
  styleUrls: ['./item-save.component.css', '../../shared/styles/general.css']
})

export class ItemSaveComponent implements OnInit {
  title: string = "Create item";
  breadcrumbNav: BreadcrumbNavClass[] = [];
  constructor( ) { }
  ngOnInit() {
    this.populateBreadcrumbNav();  
  }

  onBreadcrumbLinkChange(_selectedIndex:number ){
    // change active link to visited
    let indexOfActiveLink = this.breadcrumbNav.findIndex(x => x.linkStatus == LinkStatusEnum.Active);
    this.breadcrumbNav[indexOfActiveLink].linkStatus = LinkStatusEnum.Visited;
    // change click link to active
    this.breadcrumbNav[_selectedIndex].linkStatus = LinkStatusEnum.Active;
  }

  populateBreadcrumbNav(){
    let step1 = new BreadcrumbNavClass('1. Create item','/item-save/item-general-save',LinkStatusEnum.Visited);
    this.breadcrumbNav.push(step1);

    let step2 = new BreadcrumbNavClass('2. Add details','/item-save/item-detail-save',LinkStatusEnum.Active);
    this.breadcrumbNav.push(step2);

    let step3 = new BreadcrumbNavClass('3. Add images','/item-save/item-image-save',LinkStatusEnum.NotVisited);
    this.breadcrumbNav.push(step3);

    let step4 = new BreadcrumbNavClass('4. View item','/item-save/item-view-box',LinkStatusEnum.NotVisited);
    this.breadcrumbNav.push(step4);
  }

}