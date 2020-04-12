import {enableProdMode, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {MindComponent} from './home/mind/mind.component';
import {PhotographyComponent} from './home/photography/photography.component';
import {routing} from './app.routing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {LocalizationPipe} from './shared/pipes/localization.pipe';
import {LanguageService} from './shared/services/language.service';
import {MusicComponent} from './home/music/music.component';
import {ParticlesModule} from 'angular-particle';
import {SongDialogComponent} from './home/music/song-dialog/song-dialog.component';
import {SafePipe} from './shared/pipes/safe.pipe';

enableProdMode();

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    ParticlesModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    MindComponent,
    MusicComponent,
    PhotographyComponent,
    SongDialogComponent,
    LocalizationPipe,
    SafePipe
  ],
  entryComponents: [
    SongDialogComponent,
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
