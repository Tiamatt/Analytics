import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// components (alphabetically)
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemSaveComponent } from './items/item-save/item-save.component';
import { ItemViewComponent } from './items/item-view/item-view.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/item-save', pathMatch: 'full' }, //kali
    { path: 'item-save', component: ItemSaveComponent },
    { path: 'item-view', component: ItemViewComponent },
    { path: 'item-list', component: ItemListComponent },
    { path: '**', redirectTo:  'item-save' } //kali
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}