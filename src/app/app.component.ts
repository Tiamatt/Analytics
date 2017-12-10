import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  isExpandNav: boolean = true;

  onShrinkExpandNav(_isExpandNav: boolean){
    this.isExpandNav = _isExpandNav;
  }
}
