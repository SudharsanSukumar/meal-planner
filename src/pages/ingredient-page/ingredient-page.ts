import {Component} from '@angular/core';
import {NavController, NavParams, PopoverController} from 'ionic-angular';

//Components
import {IngredientPopover} from '../../components/ingredient-popover/ingredient-popover.component';

//Services
import {HttpTransportService} from '../../services/http-transport/http-transport.service';
import {RecipeService} from '../../services/recipe/recipe.service';

@Component({
    templateUrl: 'ingredient-page.html'
})
export class IngredientPage {
    public recipe: any;
    public ingredients: string[] = [];
    public instructionsUrl: string;
    public showOverflow: boolean[] = [];

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public httpTransport: HttpTransportService,
        public recipeService: RecipeService,
        public popoverCtrl: PopoverController
    ) {
        // If we navigated to this page, we will have an item available as a nav param
        this.recipe = navParams.get('recipe');
        this.getPageData(this.recipe.url);
    }


    getPageData(pageUrl: string) {
        this.httpTransport.send('GET', 'https://crossorigin.me/' + pageUrl).subscribe(
            (data) => {
                let currentIndex = data.indexOf('class="ings">');
                while (currentIndex > 0) {
                    let ingredient = this.recipeService.parseByTag(data, '<p>', '</p>', currentIndex);
                    currentIndex = data.indexOf('<p>', currentIndex) + 1;
                    if (ingredient.length > 100 || ingredient.length == 0) {
                        continue;
                    }
                    this.ingredients.push(ingredient);
                    this.showOverflow.push(false);
                }
                currentIndex = data.indexOf('card-prep');
                this.instructionsUrl = this.recipeService.parseByTag(data, '<a href="', '" class', currentIndex);
            },
            (err) => {
                console.log(err);
            },
            () => {}
        );
    }

    navToNewPage() {
        window.open(this.instructionsUrl);
    }

    toggleHiddenIngredient(ingredientNum: number) {
        this.showOverflow[ingredientNum] = !this.showOverflow[ingredientNum];
    }

    presentPopover(event) {
        let popover = this.popoverCtrl.create(IngredientPopover, {
            recipe: this.recipe
        });
        popover.present({
            ev: event
        });
    }
}