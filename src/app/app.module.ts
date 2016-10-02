import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePageModule } from '../pages/home-page/home-page.module';
import { IngredientPageModule } from '../pages/ingredient-page/ingredient-page.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    CoreModule,
    HomePageModule,
    IngredientPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: []
})
export class AppModule {}
