import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { HomePage } from '../pages/home-page/home-page';
import { SavedRecipesPage } from '../pages/saved-recipes/saved-recipes';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { SettingsPage } from '../pages/settings/settings';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    // make HelloIonicPage the root (or first) page
    rootPage: any = HomePage;
    pages: Array<{ title: string, component: any }>;

    constructor(
        public platform: Platform,
        public menu: MenuController
    ) {
        this.initializeApp();

        // set our app's pages
        this.pages = [
            { title: 'Home Page', component: HomePage },
            { title: 'Saved Recipes', component: SavedRecipesPage },
            { title: 'Shopping List', component: ShoppingListPage },
            { title: 'Settings', component: SettingsPage }
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }

    openPage(page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        if (page.component === HomePage) {
            this.nav.setRoot(page.component);
        }
        else {
            this.nav.push(page.component);
        }
    }
}
