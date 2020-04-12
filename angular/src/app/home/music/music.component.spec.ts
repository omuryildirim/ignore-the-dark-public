import {MusicComponent} from './music.component';
import {mockDialog} from '../../shared/constants/test.constants';

describe('Music Component', () => {
  let musicComponent: MusicComponent;
  beforeEach(() => {
    musicComponent = new MusicComponent(mockDialog);
  });

  it('should construct', () => {
    expect(musicComponent).toBeTruthy();
  });
});
