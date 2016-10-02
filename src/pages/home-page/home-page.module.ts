import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home-page';
import { IonicModule } from 'ionic-angular';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
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