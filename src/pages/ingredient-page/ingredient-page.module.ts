import { NgModule } from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';
import { IngredientPage } from './ingredient-page';
import { IonicModule } from 'ionic-angular';
import { IngredientPopover } from '../../components/ingredient-popover/ingredient-popover.component';

@NgModule({
    imports: [
        SharedModule,
        IonicModule.forRoot(IngredientPage),
        IonicModule.forRoot(IngredientPopover)
    ],
    declarations: [
        IngredientPage,
        IngredientPopover
    ],
    exports: [
        IngredientPage
    ]
})
export class IngredientPageModule { }