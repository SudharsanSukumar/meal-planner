import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class HttpTransportService {

    constructor() {
        console.log('http transport constructor');
    }

    send(httpMethod: string, url: string, sendData?: string): Observable<any> {
        httpMethod = httpMethod.toLowerCase();

        return Observable.create((observer) => {
            let XHR = new XMLHttpRequest();

            // We define what will happen if the data are successfully sent
            XHR.addEventListener("load", function (event: any) {
                observer.next(event.currentTarget.response);
                observer.complete();
            });

            // We define what will happen in case of error
            XHR.addEventListener("error", function (event) {
                observer.error('Request error: ', event);
            });


            if (httpMethod === 'get') {
                XHR.open("GET", url, true);
                XHR.send();
            }
            else if (httpMethod === 'post') {
                XHR.open("POST", url, true);
                XHR.send(sendData);
            }
        });
    }

}