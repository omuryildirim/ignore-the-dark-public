import {mockDomSanitizer, mockRouter} from '../../shared/constants/test.constants';
import {PhotographyComponent} from './photography.component';

const mockPhotographyService: any = {};

describe('Photography Component', () => {
  let photographyComponent: PhotographyComponent;
  beforeEach(() => {
    photographyComponent = new PhotographyComponent(mockRouter, mockDomSanitizer, mockPhotographyService);
  });

  it('should construct', () => {
    expect(photographyComponent).toBeTruthy();
  });
});
