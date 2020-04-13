import {mockDomSanitizer, mockRouter} from '../../shared/constants/test.constants';
import {PhotographyComponent} from './photography.component';
import {Subject} from 'rxjs';
import {fakeAsync, tick} from '@angular/core/testing';

const mockPhotographyService: any = {};

describe('Photography Component', () => {
  let photographyComponent: PhotographyComponent;
  beforeEach(() => {
    photographyComponent = new PhotographyComponent(mockRouter, mockDomSanitizer, mockPhotographyService);
    jest.clearAllMocks();
  });

  it('should construct', () => {
    expect(photographyComponent).toBeTruthy();
  });

  it('should initialize', () => {
    const getPhotoDataResponse = new Subject();
    mockPhotographyService.getPhotoData = jest.fn().mockReturnValueOnce(getPhotoDataResponse);
    photographyComponent.ngOnInit();

    /*
     * On success.
     */
    getPhotoDataResponse.next([{'name': 'mock photo'}]);
    expect(photographyComponent.photoData).toEqual({'mock photo': {'name': 'mock photo'}});
    expect(photographyComponent.photoNames).toEqual(['mock photo']);
  });

  it('should scroll through thumbnails', () => {
    photographyComponent.gallery = {'nativeElement': {scrollLeft: 10}};
    photographyComponent.scrollThroughThumbnails({deltaY: 10} as WheelEvent);

    expect(photographyComponent.gallery.nativeElement.scrollLeft).toEqual(20);
  });

  it('should change picture', () => {
    photographyComponent.gallery = {'nativeElement': {scrollLeft: 10}};
    photographyComponent.selectedPhotography = 'mock photo name';
    photographyComponent.photoNames = ['mock first photo name', 'mock photo name'];
    const mockSelectPhoto = jest.fn();
    photographyComponent['selectPhoto'] = mockSelectPhoto;

    const event: any = {keyCode: 37};
    photographyComponent.changePicture(event);

    expect(photographyComponent.gallery.nativeElement.scrollLeft).toEqual(0);
    expect(mockSelectPhoto.mock.calls.length).toEqual(1);
    expect(mockSelectPhoto.mock.calls[0]).toEqual(['mock first photo name']);

    /*
     * If user presses to right arrow.
     */
    event.keyCode = 38;
    photographyComponent.selectedPhotography = 'mock first photo name';
    photographyComponent.changePicture(event);
    expect(photographyComponent.gallery.nativeElement.scrollLeft).toEqual(160);

    /*
     * If user presses to right arrow but there is no selected photo.
     */
    photographyComponent.selectedPhotography = '';
    photographyComponent.changePicture(event);
    expect(photographyComponent.gallery.nativeElement.scrollLeft).toEqual(0);
  });

  it('should select photo', fakeAsync(() => {
    const getPhotoResponse = new Subject();
    mockPhotographyService.getPhoto = jest.fn().mockReturnValueOnce(getPhotoResponse);
    photographyComponent['selectPhoto']('mock photo name');

    expect(photographyComponent.selectedPhotography).toEqual('mock photo name');
    expect(photographyComponent['selectedPhotographyData']).toEqual(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAQAAACRI2S5AAAAEklEQVR4' +
      '2mNU+8+AFzCOKgADAJetClfoY2QoAAAAAElFTkSuQmCC');
    expect(mockPhotographyService.getPhoto.mock.calls.length).toEqual(1);
    expect(mockPhotographyService.getPhoto.mock.calls[0]).toEqual(['mock photo name']);

    /*
     * On success.
     */
    const originalURL = window.URL;
    const mockURL: any = {createObjectURL: jest.fn().mockReturnValueOnce('mock url response')};
    window.URL = mockURL;
    mockDomSanitizer.bypassSecurityTrustUrl = jest.fn().mockReturnValueOnce('secure url');
    getPhotoResponse.next('mock photo data');

    tick(300);

    expect(mockURL.createObjectURL.mock.calls.length).toEqual(1);
    expect(mockURL.createObjectURL.mock.calls[0]).toEqual(['mock photo data']);
    expect(mockDomSanitizer.bypassSecurityTrustUrl.mock.calls.length).toEqual(1);
    expect(mockDomSanitizer.bypassSecurityTrustUrl.mock.calls[0]).toEqual(['mock url response']);
    expect(photographyComponent['selectedPhotographyData']).toEqual('secure url');

    /*
     * If photo is already loaded.
     */
    photographyComponent['selectPhoto']('mock photo name');
    expect(photographyComponent['selectedPhotographyData']).toEqual('/photography/mock photo name');

    /*
     * Recover original URL object.
     */
    window.URL = originalURL;
  }));

  it('should go back', () => {
    photographyComponent.goBack();

    expect(mockRouter.navigate.mock.calls.length).toEqual(1);
    expect(mockRouter.navigate.mock.calls[0]).toEqual([['/']]);
  });

  it('should process after view initializes', () => {
    const originalWindow = window;
    window = {innerWidth: 325, innerHeight: 100} as any;
    photographyComponent.gallery = {'nativeElement': {style: {}}};
    photographyComponent.viewer = {'nativeElement': {style: {}}};

    photographyComponent.ngAfterViewInit();

    expect(photographyComponent.gallery.nativeElement).toEqual({
      'style': {
        'marginLeft': '32px',
        'marginTop': '556px',
        'width': '960px'
      }
    });
    expect(photographyComponent.viewer.nativeElement).toEqual({
      'style': {
        'height': '630px',
        'left': '32px',
        'right': '32px',
        'top': '8px',
      }
    });

    /*
     * Recover original window.
     */
    window = originalWindow;
  });
});
