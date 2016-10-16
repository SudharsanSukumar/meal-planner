import { Injectable } from '@angular/core';

//Services
import { StorageService } from '../storage/storage.service';

@Injectable()
export class RecipeService {

    constructor(
        public storageService: StorageService
    ) {
        console.log('parse service constructor');
    }

    parseByTag(stringBlob: string, startTag: string, stopTag: string, offset?: number) {
        let stringOffset = (offset == undefined ? 0 : offset);
        let startIndex = stringBlob.indexOf(startTag, stringOffset);
        let stopIndex = stringBlob.indexOf(stopTag, startIndex + startTag.length);
        return stringBlob.substring(startIndex + startTag.length, stopIndex);
    }

    saveToRecipes(recipe) {
        let promise = new Promise((resolve, reject) => {
            this.storageService.getData('savedRecipes').then((data) => {
                let currentlySaved = [];
                if (data !== null) {
                    currentlySaved = JSON.parse(data);
                }
                currentlySaved.push(recipe);
                this.storageService.saveData('savedRecipes', JSON.stringify(currentlySaved));
                resolve();
            });
        });
        return promise;
    }

    saveToShoppingList(recipe) {
        let promise = new Promise((resolve, reject) => {
            this.storageService.getData('shoppingList').then((data) => {
                let currentlySaved = [];
                if (data !== null) {
                    currentlySaved = JSON.parse(data);
                }

                currentlySaved.push(recipe);
                this.storageService.saveData('shoppingList', JSON.stringify(currentlySaved));
                resolve();
            });

        });
        return promise;
    }

}