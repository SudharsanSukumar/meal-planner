import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

//Pages
import { IngredientPage } from '../ingredient-page/ingredient-page';

//Services
import { StorageService } from '../../services/storage/storage.service';
import { RecipeService } from '../../services/recipe/recipe.service';

@Component({
    templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {
    public recipes: Object[] = [];
    public allRecipes: any = [];

    constructor(
        public storageService: StorageService,
        public navCtrl: NavController,
        public toastCtrl: ToastController,
        public recipeService: RecipeService
    ) {
        console.log('shopping list constructor');
        this.storageService.getData('shoppingList').then((recipes) => {
            if (recipes !== null) {
                this.recipes = JSON.parse(recipes);
            }
            this.allRecipes = this.recipes;
            console.log(this.recipes);
        });
    }

    clearShoppingList() {
        this.recipeService.clearShoppingList();
        this.recipes = [];
        this.allRecipes = [];
        console.log('clearing shopping list');
    }

    presentToast(message: string, duration?: number) {
        duration = duration === undefined ? 3000 : duration;
        let toast = this.toastCtrl.create({
            message: message,
            duration: duration
        });
        toast.present();
    }

    recipeSelect(recipeIndex: number) {
        this.navCtrl.push(IngredientPage, {
            recipe: this.recipes[recipeIndex]
        }, {
                animate: true
            });
    }

    removeRecipe(recipeNum: number) {
        event.stopPropagation();
        let recipeToRemove: any = this.recipes[recipeNum];
        this.recipes.splice(recipeNum, 1);
        for (let i = 0; i < this.allRecipes.length; i++) {
            if (this.allRecipes[i].title === recipeToRemove.title) {
                this.allRecipes.splice(i, 1);
            }
        }
        this.storageService.saveData('shoppingList', JSON.stringify(this.allRecipes));
    }

}