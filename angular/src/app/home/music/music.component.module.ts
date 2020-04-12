import {NgModule} from '@angular/core';
import {PipesModule} from '../../shared/pipes.module';
import {MusicComponent} from './music.component';
import {SongDialogComponentModule} from './song-dialog/song-dialog.component.module';
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    PipesModule,
    SongDialogComponentModule,
    CommonModule,
    // ParticlesModule, TODO: Waiting Angular Particle to update for Angular Ivy
  ],
  declarations: [
    MusicComponent
  ],
  exports: [
    MusicComponent
  ]
})
export class MusicComponentModule {
}
