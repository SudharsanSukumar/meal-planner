import { Component } from '@angular/core';
import { ToastController, NavController, NavParams } from 'ionic-angular';

//Pages
import { IngredientPage } from '../ingredient-page/ingredient-page';

//Services
import { HttpTransportService } from '../../services/http-transport/http-transport.service';
import { RecipeService } from '../../services/recipe/recipe.service';
import { StorageService } from '../../services/storage/storage.service';


@Component({
    templateUrl: 'home-page.html'
})
export class HomePage {

    public recipes: Array<Object> = [];
    public defaultRecipes: Array<Object> = [];
    public numRecipesToLoad: number = 40;
    public searchInput: string = '';

    constructor(
        public httpTransport: HttpTransportService,
        public toastCtrl: ToastController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public recipeService: RecipeService,
        public storageService: StorageService
    ) {
        this.landingPageParseRecipes();
    }

    saveToRecipes(recipeNum: number) {
        event.stopPropagation();
        this.recipeService.saveToRecipes(this.recipes[recipeNum]).then((data) => {
            this.presentToast('Recipe Saved', 1000);
        });
    }

    addToShoppingList(recipeNum: number) {
        event.stopPropagation();
        this.recipeService.saveToShoppingList(this.recipes[recipeNum]).then(() => {
            this.presentToast('Added To Shopping List', 1000);
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

    landingPageParseRecipes() {
        this.recipes = [];
        this.httpTransport.send('GET', 'https://crossorigin.me/http://www.foodily.com/').subscribe(
            (data) => {
                let currentIndex = 0;
                for (let i = 0; i < this.numRecipesToLoad && currentIndex > -1; i++) {
                    currentIndex = data.indexOf('tsource=', currentIndex + 1);
                    if (currentIndex === -1) {
                        this.presentToast(i + ' Entries Loaded', 3000);
                        break;
                    }
                    let imageUrl = this.recipeService.parseByTag(data, ';" src=\'', '\'>', currentIndex);
                    let author = this.recipeService.parseByTag(data, 'tsource=\'', '\' ', currentIndex - 1);
                    let prelimTitle = this.recipeService.parseByTag(data, '<a href=\'/r', '\'', currentIndex);
                    let url = 'http://www.foodily.com/r/' + this.recipeService.parseByTag(prelimTitle + 'done', '/', 'done');
                    prelimTitle = this.recipeService.parseByTag(prelimTitle, '-', '-by');
                    let title = prelimTitle.replace(/-/g, ' ');
                    title = title.replace(/\w\S*/g, (txt) => {
                        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    });
                    //console.log(author, imageUrl, title, url);
                    this.recipes.push(
                        {
                            title: title,
                            imageUrl: imageUrl,
                            author: author,
                            url: url
                        }
                    );
                    this.defaultRecipes.push(
                        {
                            title: title,
                            imageUrl: imageUrl,
                            author: author,
                            url: url
                        }
                    );
                }
            },
            (err) => {
                console.log(err);
            },
            () => { }
        );

    }

    recipeSelect(recipeIndex: number) {
        this.navCtrl.push(IngredientPage, {
            recipe: this.recipes[recipeIndex]
        }, {
                animate: true
            });
    }

    onInput() {
        if (this.searchInput === '') {
            this.recipes = this.defaultRecipes;
            return;
        }
        let formattedSearch = this.searchInput.replace(/ /g, "-");
        console.log(formattedSearch);
        this.httpTransport.send('GET', 'https://crossorigin.me/http://www.foodily.com/s/' + formattedSearch).subscribe(
            (data) => {
                this.recipes = [];
                let currentIndex = 0;
                for (let i = 0; i < this.numRecipesToLoad && currentIndex > -1; i++) {
                    currentIndex = data.indexOf('class="item _object-card"', currentIndex + 1);
                    if (currentIndex === -1) {
                        this.presentToast(i + ' Entries Loaded', 3000);
                        break;
                    }

                    let imageUrl = this.recipeService.parseByTag(data, 'onerror="this.src=\'/stx/images/235x235/noimg.jpg\'; return true;" src="', '">', currentIndex);
                    let prelimTitle = this.recipeService.parseByTag(data, 'link="/r/', '" addedInListIdxs=""', currentIndex);
                    let author = this.recipeService.parseByTag(data, '"Card title","c":"', '"}\' title="', currentIndex);
                    let url = 'http://www.foodily.com/r/' + this.recipeService.parseByTag(prelimTitle + 'done', '/', 'done');
                    prelimTitle = this.recipeService.parseByTag(prelimTitle, '-', '-by');
                    let title = prelimTitle.replace(/-/g, ' ');
                    title = title.replace(/\w\S*/g, (txt) => {
                        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    });
                    this.recipes.push(
                        {
                            title: title,
                            imageUrl: imageUrl,
                            author: author,
                            url: url
                        }
                    );
                }
            },
            (err) => {
                console.log(err);
            },
            () => { }
        );
    }
}
