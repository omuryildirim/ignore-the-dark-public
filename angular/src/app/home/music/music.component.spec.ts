import {MusicComponent} from './music.component';
import {mockDialog} from '../../shared/constants/test.constants';
import {discardPeriodicTasks, fakeAsync, tick} from '@angular/core/testing';

describe('Music Component', () => {
  let musicComponent: MusicComponent;
  beforeEach(() => {
    musicComponent = new MusicComponent(mockDialog);
    jest.clearAllMocks();
  });

  it('should construct', () => {
    expect(musicComponent).toBeTruthy();
  });

  it('should initialize', () => {
    const mockSimpleRepetitionsEffect = jest.fn();
    musicComponent.simpleRepetitionsEffect = mockSimpleRepetitionsEffect;
    musicComponent.ngOnInit();

    expect(mockSimpleRepetitionsEffect.mock.calls.length).toEqual(1);
  });

  it('should apply dualities effect', () => {
    const mockBubbleEffect = jest.fn();
    musicComponent['bubbleEffect'] = mockBubbleEffect;
    musicComponent.dualitiesEffect();

    expect(mockBubbleEffect.mock.calls.length).toEqual(1);
    expect(mockBubbleEffect.mock.calls[0]).toEqual(['']);
    expect(musicComponent.albumSelection).toEqual('Dualities');
  });

  it('should apply ossify effect', () => {
    const mockBubbleEffect = jest.fn();
    musicComponent['bubbleEffect'] = mockBubbleEffect;
    musicComponent.ossifyEffect();

    expect(mockBubbleEffect.mock.calls.length).toEqual(1);
    expect(mockBubbleEffect.mock.calls[0]).toEqual(['dark']);
    expect(musicComponent.albumSelection).toEqual('Ossify');
  });

  it('should apply bubble effect', fakeAsync(() => {
    const mockClearIntervals = jest.fn();
    musicComponent['clearIntervals'] = mockClearIntervals;
    const mockAppend = jest.fn();
    musicComponent.musicContainer = {nativeElement: {append: mockAppend}};

    const originalCreateElement = document.createElement;
    const mockGetContext = jest.fn().mockReturnValueOnce({canvas: {style: {}}});
    const mockCreateElement = jest.fn().mockReturnValueOnce({getContext: mockGetContext});
    document.createElement = mockCreateElement;

    musicComponent['bubbleEffect']('');

    expect(mockClearIntervals.mock.calls.length).toEqual(1);
    expect(mockCreateElement.mock.calls.length).toEqual(1);
    expect(mockCreateElement.mock.calls[0]).toEqual(['canvas']);
    expect(mockAppend.mock.calls.length).toEqual(1);
    expect(mockGetContext.mock.calls[0]).toEqual(['2d']);

    const originalCreateBackground = MusicComponent['createBackground'];
    const mockCreateBackground = jest.fn();
    MusicComponent['createBackground'] = mockCreateBackground;

    tick(20);
    expect(mockCreateBackground.mock.calls.length).toEqual(1);
    expect(mockCreateBackground.mock.calls[0].length).toEqual(2);

    const originalCreateBubble = MusicComponent['createBubble'];
    const mockCreateBubble = jest.fn();
    MusicComponent['createBubble'] = mockCreateBubble;

    tick(980);
    expect(mockCreateBubble.mock.calls.length).toEqual(1);
    expect(mockCreateBubble.mock.calls[0].length).toEqual(5);

    discardPeriodicTasks();

    /*
     * Recover original functions.
     */
    document.createElement = originalCreateElement;
    MusicComponent['createBackground'] = originalCreateBackground;
    MusicComponent['createBubble'] = originalCreateBubble;
  }));
});
