import {mockDomSanitizer} from '../../constants/test.constants';
import {SafePipe} from '../safe.pipe';


describe('Safe Pipe', () => {
  let safePipe: SafePipe;
  beforeEach(() => {
    safePipe = new SafePipe(mockDomSanitizer);
    jest.clearAllMocks();
  });

  it('should construct', () => {
    expect(safePipe).toBeTruthy();
  });

  it('should transform', () => {
    mockDomSanitizer.bypassSecurityTrustResourceUrl.mockReturnValueOnce('safe url');
    expect(safePipe.transform('mock url')).toEqual('safe url');
    expect(mockDomSanitizer.bypassSecurityTrustResourceUrl.mock.calls.length).toEqual(1);
    expect(mockDomSanitizer.bypassSecurityTrustResourceUrl.mock.calls[0]).toEqual(['mock url']);
  });
});
