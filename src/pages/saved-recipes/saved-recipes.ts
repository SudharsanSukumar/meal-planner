import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

//Pages
import { IngredientPage } from '../ingredient-page/ingredient-page';

//Services
import { StorageService } from '../../services/storage/storage.service';

@Component({
    templateUrl: './saved-recipes.html'
})
export class SavedRecipesPage {
    public recipes: Object[] = [];
    public allRecipes: any = [];
    public searchInput: string = '';

    constructor(
        public storageService: StorageService,
        public navCtrl: NavController,
        public toastCtrl: ToastController
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

    onInput() {
        if (this.searchInput === '') {
            this.recipes = this.allRecipes;
            return;
        }
        this.recipes = [];
        let matchingRecipes: Object[] = [];
        let wordsToMatch: string[] = this.searchInput.split(' ');
        for (let i = 0; i < this.allRecipes.length; i++) {
            let tempRecipe = this.allRecipes[i];
            tempRecipe.title = tempRecipe.title.toLowerCase();
            let recipePriority = 0;
            for (let word of wordsToMatch) {
                word = word.toLowerCase();
                if (this.allRecipes[i].title.indexOf(word) !== -1) {
                    recipePriority++;
                }
            }
            if (recipePriority !== 0) {
                tempRecipe['priority'] = recipePriority;
                matchingRecipes.push(tempRecipe);
            }
        }
        matchingRecipes.sort((a: any, b: any) => {
            return parseFloat(b.priority) - parseFloat(a.priority);
        });
        this.recipes = matchingRecipes;
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
        this.presentToast('Recipe Removed');
    }

    recipeSelect(recipeIndex: number) {
        this.navCtrl.push(IngredientPage, {
            recipe: this.recipes[recipeIndex]
        }, {
                animate: true
            });
    }

}