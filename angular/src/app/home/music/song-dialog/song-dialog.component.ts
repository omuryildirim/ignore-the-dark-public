import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MusicConstants} from '../music.constants';

export interface SongData {
  name: string;
  songsConstant: string;
}

@Component({
  selector: 'app-song-dialog',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './song-dialog.component.html',
  styleUrls: ['./song-dialog.component.scss'],
})

export class SongDialogComponent {
  public musicConstants = MusicConstants;

  /**
   * Initializer.
   * @param data
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: SongData) {
  }
}
