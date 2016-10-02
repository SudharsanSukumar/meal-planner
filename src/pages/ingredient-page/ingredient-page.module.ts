import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IngredientPage } from './ingredient-page';
import { IonicModule } from 'ionic-angular';
import { IngredientPopover } from '../../components/ingredient-popover/ingredient-popover.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
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