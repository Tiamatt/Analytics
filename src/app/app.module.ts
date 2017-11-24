import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// modules (alphabetically)
import { AppRoutingModule } from './app-routing.module';
// components (alphabetically)
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ItemSaveComponent } from './items/item-save/item-save.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemViewComponent } from './items/item-view/item-view.component';
import { MainNavComponent } from './main-nav/main-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ItemSaveComponent,
    ItemListComponent,
    ItemViewComponent,
    MainNavComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
