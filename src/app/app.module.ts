import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { PagesModule } from '../pages/pages.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    CoreModule,
    PagesModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: []
})
export class AppModule {}
