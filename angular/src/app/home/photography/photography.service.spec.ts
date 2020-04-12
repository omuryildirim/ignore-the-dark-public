import {mockHttpClient} from '../../shared/constants/test.constants';
import {PhotographyService} from './photography.service';


describe('Photography Service', () => {
  let photographyService: PhotographyService;
  beforeEach(() => {
    photographyService = new PhotographyService(mockHttpClient);
  });

  it('should construct', () => {
    expect(photographyService).toBeTruthy();
  });
});
