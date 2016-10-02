import { NgModule } from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';
import { SavedRecipesPage } from './saved-recipes';
import { IonicModule } from 'ionic-angular';

@NgModule({
    imports: [
        SharedModule,
        IonicModule.forRoot(SavedRecipesPage)
    ],
    declarations: [
        SavedRecipesPage
    ],
    exports: [
        SavedRecipesPage
    ]
})
export class SavedRecipesPageModule { }