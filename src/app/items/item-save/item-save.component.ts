import { Component, OnInit } from '@angular/core';
import { LinkStatusEnum } from '../../shared/enums/link-status.enum';
import { BreadcrumbNavModel } from '../../shared/components/custom-components/breadcrumb-nav/breadcrumb-nav.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-save',
  templateUrl: './item-save.component.html',
  styleUrls: ['./item-save.component.css', '../../shared/styles/general.css']
})

export class ItemSaveComponent implements OnInit {
  breadcrumbNav: BreadcrumbNavModel[] = [];

  constructor( private router: Router) { }

  ngOnInit() {
    this.populateBreadcrumbNav();  
  }

  /* -------------------  PRIVATE METHODS ---------------------- */
  populateBreadcrumbNav(){ 
    let breadcrumbs = [
    { rowNum: 1,
      url:  '/item-save/item-general-save',
      title: '1. Create item',
      linkStatus: null },
    { rowNum: 2,
      url:  '/item-save/item-detail-save',
      title: '2. Add details',
      linkStatus: null },
    { rowNum: 3,
      url:  '/item-save/item-image-save',
      title: '3. Add images',
      linkStatus: null },
    { rowNum: 4,
      url:  '/item-save/item-activate-save',
      title: '4. Activate item',
      linkStatus: null }
    ];
    // get current Breadcrumb based on current url
    let currentBreadcrumb = null;
    for(let obj of breadcrumbs){
      if(this.router.url.includes(obj.url))
        currentBreadcrumb = obj; 
    }
    // add to breadcrumbNav
    for(let obj of breadcrumbs){
      let linkStatus = (obj == currentBreadcrumb) ? LinkStatusEnum.Active : (
        obj.rowNum > currentBreadcrumb.rowNum ? LinkStatusEnum.NotVisited : LinkStatusEnum.Visited
      );
      this.breadcrumbNav.push(new BreadcrumbNavModel(obj.title,obj.url,linkStatus));
    }
  }

  /* -------------------  EVENTS ---------------------- */
  onBreadcrumbLinkChange(_selectedIndex:number ){
    // change active link to visited
    let indexOfActiveLink = this.breadcrumbNav.findIndex(x => x.linkStatus == LinkStatusEnum.Active);
    this.breadcrumbNav[indexOfActiveLink].linkStatus = LinkStatusEnum.Visited;
    // change click link to active
    this.breadcrumbNav[_selectedIndex].linkStatus = LinkStatusEnum.Active;
  }

}