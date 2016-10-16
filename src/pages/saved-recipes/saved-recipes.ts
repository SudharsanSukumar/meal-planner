import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

//Pages
import { IngredientPage } from '../ingredient-page/ingredient-page';

//Services
import { StorageService } from '../../services/storage/storage.service';
import { RecipeService } from '../../services/recipe/recipe.service';

@Component({
    templateUrl: 'saved-recipes.html'
})
export class SavedRecipesPage {
    public recipes: Object[] = [];
    public allRecipes: any = [];
    public searchInput: string = '';

    constructor(
        public storageService: StorageService,
        public navCtrl: NavController,
        public toastCtrl: ToastController,
        public recipeService: RecipeService
    ) {
        this.storageService.getData('savedRecipes').then((recipes) => {
            this.recipes = JSON.parse(recipes);
            this.allRecipes = this.recipes;
        });
    }

    presentToast(message: string, duration?: number) {
        duration = duration === undefined ? 3000 : duration;
        let toast = this.toastCtrl.create({
            message: message,
            duration: duration
        });
        toast.present();
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
        this.storageService.saveData('savedRecipes', JSON.stringify(this.allRecipes));
    }

    recipeSelect(recipeIndex: number) {
        this.navCtrl.push(IngredientPage, {
            recipe: this.recipes[recipeIndex]
        }, {
                animate: true
            });
    }

    addToShoppingList(recipeNum: number) {
        event.stopPropagation();
        this.recipeService.saveToShoppingList(this.recipes[recipeNum]).then(() => {
            this.presentToast('Added To Shopping List', 500);
        });
    }

}