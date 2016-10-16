import { NgModule } from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';
import { ShoppingListPage } from './shopping-list';
import { IonicModule } from 'ionic-angular';

@NgModule({
    imports: [
        SharedModule,
        IonicModule.forRoot(ShoppingListPage)
    ],
    declarations: [
        ShoppingListPage
    ],
    exports: [
        ShoppingListPage
    ]
})
export class ShoppingListPageModule { }