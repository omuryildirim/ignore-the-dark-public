import {AppComponent} from './app.component';
import {mockLanguageService} from './shared/constants/test.constants';


describe('AppComponent', () => {
  let appComponent: AppComponent;
  beforeEach(() => {
    appComponent = new AppComponent(mockLanguageService);
  });

  it('should construct', () => {
    expect(appComponent).toBeTruthy();
  });
});
