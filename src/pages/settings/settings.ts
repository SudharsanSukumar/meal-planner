import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';

//Services
import { StorageService } from '../../services/storage/storage.service';

@Component({
    templateUrl: 'settings.html'
})
export class SettingsPage {
    public recipes: Object[] = [];
    public allRecipes: any = [];
    public searchInput: string = '';

    constructor(
        public storageService: StorageService,
        public toastCtrl: ToastController
    ) {

    }

    presentToast(message: string, duration?: number) {
        duration = duration === undefined ? 3000 : duration;
        let toast = this.toastCtrl.create({
            message: message,
            duration: duration
        });
        toast.present();
    }

    clearAll() {
        this.storageService.clearAll();
    }

    clearSavedRecipes() {
        this.storageService.removeDataByKey('savedRecipes');
    }

    clearShoppingList() {
        this.storageService.removeDataByKey('shoppingList');
    }
}