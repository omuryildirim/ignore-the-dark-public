import {HomeComponent} from './home.component';
import {NgModule} from '@angular/core';
import {PipesModule} from '../shared/pipes.module';
import {MusicComponentModule} from './music/music.component.module';
import {PhotographyComponentModule} from './photography/photography.component.module';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    PipesModule,
    MusicComponentModule,
    PhotographyComponentModule,
    CommonModule
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeComponentModule {
}
