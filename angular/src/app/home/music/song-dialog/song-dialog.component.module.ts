import {NgModule} from '@angular/core';
import {SongDialogComponent} from './song-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {PipesModule} from '../../../shared/pipes.module';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    PipesModule,
    MatDialogModule,
    CommonModule
  ],
  declarations: [
    SongDialogComponent
  ],
  exports: [
    SongDialogComponent
  ]
})
export class SongDialogComponentModule {
}
