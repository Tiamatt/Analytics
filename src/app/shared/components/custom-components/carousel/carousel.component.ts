/*
<div class="carousel_M">
    <app-carousel [imgSrcs]="carouselImageSrcs"></app-carousel>   
</div>
*/

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Input() imgSrcs: string [];

  constructor() { }

  ngOnInit() {
  }

}
