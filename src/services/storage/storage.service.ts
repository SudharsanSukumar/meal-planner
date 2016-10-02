import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {
    public storage: Storage;

    constructor(_storage: Storage) {
        this.storage = _storage;
        console.log('storage constructor');
    }

    //Get data from SqlStorage
    getData(name: string) {
        return this.storage.get(name);
    }

    //Save data to SqlStorage
    saveData(name: string, jsonString: string) {
        this.storage.set(name, jsonString);
    }

    //Remove data by keyname
    removeDataByKey(key: string) {
        this.storage.remove(key);
    }

    //Clear all data from storage
    clearAll() {
        this.storage.clear();
    }

}