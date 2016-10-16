import { NgModule } from '@angular/core';
import { HomePageModule } from './home-page/home-page.module';
import { IngredientPageModule } from './ingredient-page/ingredient-page.module';
import { SavedRecipesPageModule } from './saved-recipes/saved-recipes.module';
import { ShoppingListPageModule } from './shopping-list/shopping-list.module';
import { SettingsPageModule } from './settings/settings.module';
@NgModule({
    imports: [
        HomePageModule,
        IngredientPageModule,
        SavedRecipesPageModule,
        ShoppingListPageModule,
        SettingsPageModule
    ],
    declarations: [],
    exports: [
        HomePageModule,
        IngredientPageModule,
        SavedRecipesPageModule,
        ShoppingListPageModule,
        SettingsPageModule
    ]
})
export class PagesModule { }