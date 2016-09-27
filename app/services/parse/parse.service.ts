import {Injectable} from '@angular/core';

@Injectable()
export class ParseService {

    constructor() {
        console.log('parse service constructor');
    }

    parseByTag(stringBlob: string, startTag: string, stopTag: string, offset?: number) {
        let stringOffset = (offset == undefined ? 0 : offset);
        let startIndex = stringBlob.indexOf(startTag, stringOffset);
        let stopIndex = stringBlob.indexOf(stopTag, startIndex + startTag.length);
        return stringBlob.substring(startIndex + startTag.length, stopIndex);
    }

}