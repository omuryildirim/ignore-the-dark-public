import {enableProdMode, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LanguageService} from './shared/services/language.service';
import {HomeComponentModule} from './home/home.component.module';
import {PipesModule} from './shared/pipes.module';
import {MindComponentModule} from './home/mind/mind.component.module';

enableProdMode();

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing,
    BrowserAnimationsModule,
    HomeComponentModule,
    MindComponentModule,
    PipesModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    LanguageService,
    {
      provide: LOCALE_ID,
      deps: [LanguageService],
      useFactory: (languageService) => languageService.language
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
