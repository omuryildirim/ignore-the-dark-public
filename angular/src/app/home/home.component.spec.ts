// This shows a different way of testing a component, check about for a simpler one
import {HomeComponent} from './home.component';
import {mockLanguageService, mockLocation, mockRouter} from '../shared/constants/test.constants';

describe('Home Component', () => {
  let homeComponent: HomeComponent;
  beforeEach(() => {
    homeComponent = new HomeComponent(mockRouter, mockLocation, mockLanguageService);
    jest.clearAllMocks();
  });

  it('should construct', () => {
    expect(homeComponent).toBeTruthy();
  });

  it('should initialize', () => {
    mockLocation.path.mockReturnValueOnce('/photography');
    homeComponent.ngOnInit();

    expect(mockLocation.path.mock.calls.length).toEqual(1);
    expect(homeComponent.location).toEqual('/photography');
    expect(homeComponent.selectedWork).toEqual('Photography');

    mockLocation.path.mockReturnValueOnce('/music');
    homeComponent.ngOnInit();
    expect(homeComponent.selectedWork).toEqual('Music');
  });

  it('should select work', () => {
    homeComponent.selectWork('Test Work');

    expect(homeComponent.selectedWork).toEqual('Test Work');
    expect(mockRouter.navigateByUrl.mock.calls.length).toEqual(1);
    expect(mockRouter.navigateByUrl.mock.calls[0]).toEqual('/test work');
  });

  it('should navigate to sub page', () => {
    mockLocation.path.mockReturnValueOnce('mock location');
    homeComponent.navigateToSubPage('test sub page');

    expect(mockRouter.navigateByUrl.mock.calls.length).toEqual(1);
    expect(mockRouter.navigateByUrl.mock.calls[0]).toEqual('/test sub page');
    expect(mockLocation.path.mock.calls.length).toEqual(1);
    expect(homeComponent.location).toEqual('mock location');
  });
});
