import {SongDialogComponent} from './song-dialog.component';

const songData: any = {};

describe('Song Dialog', () => {
  let songDialog: SongDialogComponent;
  beforeEach(() => {
    songDialog = new SongDialogComponent(songData);
    jest.clearAllMocks();
  });

  it('should construct', () => {
    expect(songDialog).toBeTruthy();
  });
});
