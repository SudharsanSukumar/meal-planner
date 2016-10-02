import { NgModule } from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';
import { HomePage } from './home-page';
import { IonicModule } from 'ionic-angular';

@NgModule({
    imports: [
        SharedModule,
        IonicModule.forRoot(HomePage)
    ],
    declarations: [
        HomePage
    ],
    exports: [
        HomePage
    ]
})
export class HomePageModule { }