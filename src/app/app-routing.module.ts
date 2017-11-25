import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// components (alphabetically)
import { ItemDetailSaveComponent } from './items/item-save/item-detail-save/item-detail-save.component';
import { ItemGeneralSaveComponent } from './items/item-save/item-general-save/item-general-save.component';
import { ItemImageSaveComponent } from './items/item-save/item-image-save/item-image-save.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemSaveComponent } from './items/item-save/item-save.component';
import { ItemViewComponent } from './items/item-view/item-view.component';
import { ItemViewBoxComponent } from './items/item-view/item-view-box/item-view-box.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/item-view', pathMatch: 'full' },
    { path: 'item-save', component: ItemSaveComponent, children:[
        { path: '', redirectTo: 'item-general-save', pathMatch: 'full' },
        { path: 'item-general-save', component: ItemGeneralSaveComponent },
        { path: 'item-detail-save', component: ItemDetailSaveComponent },
        { path: 'item-image-save', component: ItemImageSaveComponent },
        { path: 'item-view-box', component: ItemViewBoxComponent }
    ]},
    { path: 'item-view', component: ItemViewComponent },
    { path: 'item-list', component: ItemListComponent },
    { path: '**', redirectTo:  'item-view' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}