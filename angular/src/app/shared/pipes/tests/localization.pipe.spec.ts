import {LocalizationPipe} from '../localization.pipe';
import {mockLanguageService} from '../../constants/test.constants';


describe('Localization Pipe', () => {
  let localizationPipe: LocalizationPipe;
  beforeEach(() => {
    localizationPipe = new LocalizationPipe(mockLanguageService);
  });

  it('should construct', () => {
    expect(localizationPipe).toBeTruthy();
  });

  it('should transform', () => {
    mockLanguageService.translations = {'mock text': 'translation text'};
    expect(localizationPipe.transform('mock text')).toEqual('translation text');
  });
});
