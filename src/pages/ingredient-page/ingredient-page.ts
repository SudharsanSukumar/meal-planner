import {Component} from '@angular/core';
import {NavController, NavParams, PopoverController} from 'ionic-angular';

//Components
import {IngredientPopover} from '../../components/ingredient-popover/ingredient-popover.component';

//Services
import {HttpTransportService} from '../../services/http-transport/http-transport.service';
import {ParseService} from '../../services/parse/parse.service';

@Component({
    templateUrl: './ingredient-page.html'
})
export class IngredientPage {
    private recipe: any;
    private ingredients: string[] = [];
    private instructionsUrl: string;
    private showOverflow: boolean[] = [];

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private httpTransport: HttpTransportService,
        private parseService: ParseService,
        private popoverCtrl: PopoverController
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
                    let ingredient = this.parseService.parseByTag(data, '<p>', '</p>', currentIndex);
                    currentIndex = data.indexOf('<p>', currentIndex) + 1;
                    if (ingredient.length > 100 || ingredient.length == 0) {
                        continue;
                    }
                    this.ingredients.push(ingredient);
                    this.showOverflow.push(false);
                }
                currentIndex = data.indexOf('card-prep');
                this.instructionsUrl = this.parseService.parseByTag(data, '<a href="', '" class', currentIndex);
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
        let popover = this.popoverCtrl.create(IngredientPopover);
        popover.present({
            ev: event
        });
    }
}