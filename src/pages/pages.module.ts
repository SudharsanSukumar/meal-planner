import { NgModule } from '@angular/core';
import { HomePageModule } from './home-page/home-page.module';
import { IngredientPageModule } from './ingredient-page/ingredient-page.module';
import { SavedRecipesPageModule } from './saved-recipes/saved-recipes.module';
@NgModule({
    imports: [
        HomePageModule,
        IngredientPageModule,
        SavedRecipesPageModule
    ],
    declarations: [],
    exports: [
        HomePageModule,
        IngredientPageModule,
        SavedRecipesPageModule
    ]
})
export class PagesModule { }