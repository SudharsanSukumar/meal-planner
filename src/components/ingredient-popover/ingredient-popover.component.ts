import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { RecipeService } from '../../services/recipe/recipe.service';

@Component({
    templateUrl: 'ingredient-popover.html'
})
export class IngredientPopover {
    public recipe: any;

    constructor(
        public viewCtrl: ViewController,
        public navParams: NavParams,
        public recipeService: RecipeService
    ) {
        this.recipe = this.navParams.get('recipe');
        console.log(this.recipe);
    }

    saveRecipe() {
        this.recipeService.saveToRecipes(this.recipe);
        this.viewCtrl.dismiss();
    }

    addToShoppingList() {
        this.recipeService.saveToShoppingList(this.recipe);
        this.viewCtrl.dismiss();
    }
}