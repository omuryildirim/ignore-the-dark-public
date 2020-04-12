import {mockLanguageService, mockRouter} from '../../shared/constants/test.constants';
import {MindComponent} from './mind.component';
import {Subject} from 'rxjs';

const mockMindService: any = {};

describe('Mind Component', () => {
  let mindComponent: MindComponent;
  beforeEach(() => {
    mindComponent = new MindComponent(mockRouter, mockMindService, mockLanguageService);
    jest.clearAllMocks();
  });

  it('should construct', () => {
    expect(mindComponent).toBeTruthy();
  });

  it('should initialize', () => {
    const mockGetArticles = jest.fn();
    mindComponent['getArticles'] = mockGetArticles;
    mindComponent.ngOnInit();

    expect(mockGetArticles.mock.calls.length).toEqual(1);
  });

  it('should navigate to default path', () => {
    mindComponent['navigateToDefaultPath']();

    expect(mockRouter.navigate.mock.calls.length).toEqual(1);
    expect(mockRouter.navigate.mock.calls[0]).toEqual([['/']]);
  });

  it('should select article', () => {
    mindComponent.articles = {1: {'en': {header: 'mock article header'}}} as any;

    mindComponent['selectArticle'](1);

    expect(mindComponent['selectedArticleIndex']).toEqual(1);
    expect(mindComponent['selectedArticle']).toEqual('mock article header');
  });

  it('should get articles', () => {
    const getArticlesResponse = new Subject();
    mockMindService.getArticles = jest.fn().mockReturnValueOnce(getArticlesResponse);
    mindComponent['getArticles']();

    expect(mockMindService.getArticles.mock.calls.length).toEqual(1);

    /*
     * On success.
     */
    getArticlesResponse.next([{en: {header: 'mock article header en'}, tr: {header: 'mock article header tr'}}]);
    expect(mindComponent.articles).toEqual([{
      en: {header: 'mock article header en'},
      tr: {header: 'mock article header tr'}
    }] as any);
    expect(mindComponent['articleHeaders']).toEqual([{'en': 'mock article header en', 'tr': 'mock article header tr'}]);
  });

  it('should select inverse', () => {
    mindComponent['selectInverse']();
    expect(mindComponent['inverse']).toEqual(false);
  });
});
