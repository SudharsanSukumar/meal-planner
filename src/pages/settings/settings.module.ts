import { NgModule } from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';
import { SettingsPage } from './settings';
import { IonicModule } from 'ionic-angular';

@NgModule({
    imports: [
        SharedModule,
        IonicModule.forRoot(SettingsPage)
    ],
    declarations: [
        SettingsPage
    ],
    exports: [
        SettingsPage
    ]
})
export class SettingsPageModule { }