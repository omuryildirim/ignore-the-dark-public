import {mockHttpClient} from '../../shared/constants/test.constants';
import {PhotographyService} from './photography.service';


describe('Photography Service', () => {
  let photographyService: PhotographyService;
  beforeEach(() => {
    photographyService = new PhotographyService(mockHttpClient);
    jest.clearAllMocks();
  });

  it('should construct', () => {
    expect(photographyService).toBeTruthy();
  });

  it('should get photo data', () => {
    photographyService.getPhotoData();
    expect(mockHttpClient.get.mock.calls.length).toEqual(1);
    expect(mockHttpClient.get.mock.calls[0]).toEqual(['/api/photography']);
  });

  it('should get photo', () => {
    photographyService.getPhoto('test.png');
    expect(mockHttpClient.get.mock.calls.length).toEqual(1);
    expect(mockHttpClient.get.mock.calls[0]).toEqual(['../../../../../photography/test.png', {'responseType': 'blob'}]);
  });
});
