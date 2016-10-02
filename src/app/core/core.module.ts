import { NgModule, Optional, SkipSelf } from '@angular/core';

import { HttpTransportService } from '../../services/http-transport/http-transport.service';
import { ParseService } from '../../services/parse/parse.service';

@NgModule({
    imports: [],
    providers: [
        ParseService,
        HttpTransportService
    ]
})
export class CoreModule {

    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}