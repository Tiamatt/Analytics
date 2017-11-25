import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// modules (alphabetically)
import { AppRoutingModule } from './app-routing.module';
// services (alphabetically)
import {FilterApiService } from './shared/services/api/filterApi.service';
// components (alphabetically)
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ItemSaveComponent } from './items/item-save/item-save.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemViewComponent } from './items/item-view/item-view.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { CheckboxesSimpleComponent } from './shared/components/checkboxes-simple/checkboxes-simple.component';
import { CheckboxesAlphabetComponent } from './shared/components/checkboxes-alphabet/checkboxes-alphabet.component';
import { RadiobuttonsSimpleComponent } from './shared/components/radiobuttons-simple/radiobuttons-simple.component';
import { ItemGeneralSaveComponent } from './items/item-save/item-general-save/item-general-save.component';
import { ItemDetailSaveComponent } from './items/item-save/item-detail-save/item-detail-save.component';
import { ItemImageSaveComponent } from './items/item-save/item-image-save/item-image-save.component';
import { BreadcrumbNavComponent } from './shared/components/breadcrumb-nav/breadcrumb-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ItemSaveComponent,
    ItemListComponent,
    ItemViewComponent,
    MainNavComponent,
    CheckboxesSimpleComponent,
    CheckboxesAlphabetComponent,
    RadiobuttonsSimpleComponent,
    ItemGeneralSaveComponent,
    ItemDetailSaveComponent,
    ItemImageSaveComponent,
    BreadcrumbNavComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,    
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    FilterApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
