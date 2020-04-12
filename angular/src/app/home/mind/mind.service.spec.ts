import {mockHttpClient} from '../../shared/constants/test.constants';
import {MindService} from './mind.service';

describe('Mind Component', () => {
  let mindService: MindService;
  beforeEach(() => {
    mindService = new MindService(mockHttpClient);
    jest.clearAllMocks();
  });

  it('should construct', () => {
    expect(mindService).toBeTruthy();
  });

  it('should get articles', () => {
    mindService.getArticles();

    expect(mockHttpClient.get.mock.calls.length).toEqual(1);
    expect(mockHttpClient.get.mock.calls[0]).toEqual(['../../public/data/articles.json']);
  });
});
