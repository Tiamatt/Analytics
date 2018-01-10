import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// components (alphabetically)
import { ErrorComponent } from './error/error.component';
import { ItemActivateSaveComponent } from './items/item-save/item-activate-save/item-activate-save.component';
import { ItemDetailSaveComponent } from './items/item-save/item-detail-save/item-detail-save.component';
import { ItemDetailsViewComponent } from './items/item-details-view/item-details-view.component';
import { ItemImageSaveComponent } from './items/item-save/item-image-save/item-image-save.component';
import { ItemGeneralSaveComponent } from './items/item-save/item-general-save/item-general-save.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemSaveComponent } from './items/item-save/item-save.component';
import { ItemViewComponent } from './items/item-view/item-view.component';
import { ItemViewBoxComponent } from './items/item-view/item-view-box/item-view-box.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';



const appRoutes: Routes = [
    { path: '', redirectTo: '/item-list', pathMatch: 'full' },
    { path: 'item-save', component: ItemSaveComponent, children:[
        { path: '', redirectTo: 'item-general-save', pathMatch: 'full' },
        { path: 'item-general-save', component: ItemGeneralSaveComponent },
        { path: 'item-detail-save', component: ItemDetailSaveComponent },
        { path: 'item-image-save', component: ItemImageSaveComponent },
        { path: 'item-image-save/:itemId', component: ItemImageSaveComponent },
        { path: 'item-activate-save', component: ItemActivateSaveComponent }
    ]},
    { path: 'item-view', component: ItemViewComponent },
    { path: 'item-view/:itemId', component: ItemViewComponent },
    { path: 'item-details-view', component: ItemDetailsViewComponent },
    { path: 'item-list', component: ItemListComponent },
    { path: 'under-construction', component: UnderConstructionComponent},
    { path: '**', component: ErrorComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}