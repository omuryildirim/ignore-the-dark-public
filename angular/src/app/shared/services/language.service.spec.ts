import {LanguageService} from './language.service';
import {mockHttpClient} from '../constants/test.constants';
import {Subject} from 'rxjs';

describe('Language Service', () => {
  let languageService: LanguageService;
  beforeEach(() => {
    languageService = new LanguageService(mockHttpClient);
    jest.clearAllMocks();
  });

  it('should construct', () => {
    expect(languageService).toBeTruthy();
  });

  it('should initialize', () => {
    const mockGetTranslations = jest.fn();
    languageService['getTranslations'] = mockGetTranslations;
    languageService.ngOnInit();

    expect(mockGetTranslations.mock.calls.length).toEqual(1);
  });

  it('should get and set languages', () => {
    const mockGetTranslations = jest.fn();
    languageService['getTranslations'] = mockGetTranslations;
    languageService.language = 'test language';

    expect(mockGetTranslations.mock.calls.length).toEqual(1);
    expect(languageService.language).toEqual('test language');
  });

  it('should switch language', () => {
    languageService['getTranslations'] = jest.fn();

    languageService.switchLanguage();
    expect(languageService.language).toEqual('tr');

    languageService.switchLanguage();
    expect(languageService.language).toEqual('en');
  });

  it('should get translations', () => {
    const translationsResponse = new Subject();
    mockHttpClient.get.mockReturnValueOnce(translationsResponse);
    languageService['_language'] = 'en';

    languageService['getTranslations']();
    expect(mockHttpClient.get.mock.calls.length).toEqual(1);
    expect(mockHttpClient.get.mock.calls[0]).toEqual(['../../../public/data/translations_en.json']);

    /*
     * On success.
     */
    translationsResponse.next('test translations');
    expect(languageService.translations).toEqual('test translations');
  });
});
