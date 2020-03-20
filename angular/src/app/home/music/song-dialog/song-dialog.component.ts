import {Component, Inject, OnInit, ViewEncapsulation} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material";
import {MusicConstants} from "../music.constants";

export interface SongData {
  name: string;
  songsConstant: string;
}

@Component({
  selector: "app-song-dialog",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./song-dialog.component.html",
  styleUrls: ["./song-dialog.component.scss"],
})

export class SongDialogComponent implements OnInit {
  public musicConstants = MusicConstants;

  constructor(@Inject(MAT_DIALOG_DATA) public data: SongData) {
  }

  ngOnInit() {
  }

}
