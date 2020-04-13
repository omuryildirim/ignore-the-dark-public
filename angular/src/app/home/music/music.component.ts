import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import * as Vivus from 'vivus';
import {MusicConstants} from './music.constants';
import {MatDialog} from '@angular/material/dialog';
import {SongDialogComponent} from './song-dialog/song-dialog.component';
import Timeout = NodeJS.Timeout;
import {VivusOptions} from 'vivus';

@Component({
  selector: 'app-music',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
})

export class MusicComponent implements OnInit {
  @ViewChild('musicContainer', {static: true}) musicContainer: ElementRef;

  public albumSelection = '';
  private existenceInterval: Timeout;
  private dualitiesInterval: Timeout;
  private dualitiesIntervalCircle: Timeout;
  private ossifyInterval: Timeout;
  private ossifyIntervalCircle: Timeout;

  public simpleRepetitionsParticles;
  public musicConstants = MusicConstants;

  /**
   * Initializer.
   * @param matDialog
   */
  constructor(private matDialog: MatDialog) {
  }

  /**
   * Apply Simple Repetition album effect on creation.
   */
  ngOnInit() {
    this.simpleRepetitionsEffect();
  }

  /**
   * Apply Dualities album effect.
   */
  public dualitiesEffect() {
    if (!this.dualitiesInterval) {
      this.albumSelection = 'Dualities';
      this.bubbleEffect('');
    }
  }

  /**
   * Apply Ossify album effect.
   */
  public ossifyEffect() {
    if (!this.ossifyInterval) {
      this.albumSelection = 'Ossify';
      this.bubbleEffect('dark');
    }
  }

  /**
   * Apply bubble effect.
   * theme: Color theme of bubble effect.
   */
  private bubbleEffect(theme: string) {
    this.clearIntervals();

    const canvas = document.createElement('canvas'),
      bubbleList = [];

    this.musicContainer.nativeElement.append(canvas);
    if (canvas.getContext) {
      const twoDimensionalContext = canvas.getContext('2d');
      const containerWidth = this.musicContainer.nativeElement.offsetWidth + 40, defaultHeight = 637;
      twoDimensionalContext.canvas.width = containerWidth;
      twoDimensionalContext.canvas.height = defaultHeight;
      twoDimensionalContext.canvas.style.position = 'absolute';
      twoDimensionalContext.canvas.style.top = '0 px';
      twoDimensionalContext.canvas.style.left = '0 px';
      twoDimensionalContext.canvas.style.zIndex = '-1';

      const intervalName = theme ? 'ossifyInterval' : 'dualitiesInterval';
      const circleIntervalName = theme ? 'ossifyIntervalCircle' : 'dualitiesIntervalCircle';
      this[intervalName] = setInterval(() => {
        MusicComponent.createBackground(twoDimensionalContext, bubbleList);
      }, 20);

      let occurrence = 0;
      this[circleIntervalName] = setInterval(function () {
        occurrence = MusicComponent.createBubble(occurrence, defaultHeight, containerWidth, theme, bubbleList);
      }, 1e3);
    }
  }

  /**
   * Clear intervals for animations.
   */
  private clearIntervals() {
    const canvas = this.musicContainer.nativeElement.querySelector('canvas');
    if (canvas) {
      canvas.remove();
    }
    clearInterval(this.dualitiesInterval);
    clearInterval(this.dualitiesIntervalCircle);
    clearInterval(this.ossifyInterval);
    clearInterval(this.ossifyIntervalCircle);
    clearInterval(this.existenceInterval);

    this.dualitiesInterval = null;
    this.dualitiesIntervalCircle = null;
    this.ossifyInterval = null;
    this.ossifyIntervalCircle = null;
    this.existenceInterval = null;
    this.simpleRepetitionsParticles = null;
  }

  /**
   * Apply Existence album effect.
   */
  public existenceEffect() {
    if (!this.existenceInterval) {
      this.clearIntervals();
      this.albumSelection = 'Existence';

      let stickId = 0, previousStickId = 0;

      /*
       * Create a stick every second.
       */
      this.existenceInterval = setInterval(() => {
        const xmlns = 'http://www.w3.org/2000/svg';
        const stick = MusicComponent.createStick(xmlns, stickId);
        const stroke = MusicComponent.createStroke(xmlns, stickId);
        stick.appendChild(stroke);

        this.musicContainer.nativeElement.querySelector('.album-container').append(stick);

        MusicComponent.createVivus(stickId);

        stickId += 1;
        const selectedSVG = this.musicContainer.nativeElement.querySelector('#timing' + previousStickId);
        selectedSVG.setAttribute('class', 'opacity');
        previousStickId += 1;

        /*
         * Put fade out effect after 10 seconds of appearance. Remove stick after 11 seconds.
         */
        setTimeout(() => {
          selectedSVG.setAttribute('style', 'opacity: 0');
          setTimeout(() => {
            selectedSVG.remove();
          }, 1e3);
        }, 1e4);
      }, 1e3);
    }
  }

  /**
   * Apply Simple Repetition album effect.
   */
  public simpleRepetitionsEffect() {
    if (!this.simpleRepetitionsParticles) {
      this.clearIntervals();
      this.albumSelection = 'Simple Repetitions';

      this.simpleRepetitionsParticles = {
        'particles': {
          'number': {'value': 80, 'density': {'enable': true, 'value_area': 2525.2724532232724}},
          'color': {'value': '#fff'},
          'shape': {
            'type': 'circle',
            'stroke': {'width': 0, 'color': '#000000'},
            'polygon': {'nb_sides': 5},
            'image': {'src': 'img/github.svg', 'width': 100, 'height': 100}
          },
          'opacity': {
            'value': 0.5,
            'random': true,
            'anim': {'enable': false, 'speed': 1, 'opacity_min': 0.1, 'sync': false}
          },
          'size': {'value': 4, 'random': true, 'anim': {'enable': false, 'speed': 40, 'size_min': 0.1, 'sync': false}},
          'line_linked': {'enable': false, 'distance': 500, 'color': '#ffffff', 'opacity': 0.4, 'width': 2},
          'move': {
            'enable': true,
            'speed': 6,
            'direction': 'bottom',
            'random': false,
            'straight': false,
            'out_mode': 'out',
            'bounce': false,
            'attract': {'enable': false, 'rotateX': 600, 'rotateY': 1200}
          }
        },
        'interactivity': {
          'detect_on': 'canvas',
          'events': {
            'onhover': {'enable': false, 'mode': 'bubble'},
            'onclick': {'enable': false, 'mode': 'repulse'},
            'resize': true
          },
          'modes': {
            'grab': {'distance': 400, 'line_linked': {'opacity': 0.5}},
            'bubble': {'distance': 400, 'size': 4, 'duration': 0.3, 'opacity': 1, 'speed': 3},
            'repulse': {'distance': 200, 'duration': 0.4},
            'push': {'particles_nb': 4},
            'remove': {'particles_nb': 2}
          }
        },
        'retina_detect': true
      };
    }
  }

  /**
   * Display desired song information on a dialog.
   * @param constantName: Constant of album information.
   * @param songName: Selected song name.
   */
  public openSong(constantName: string, songName: string) {
    this.matDialog.open(SongDialogComponent, {
      width: '600px',
      ariaLabel: 'dark',
      data: {name: songName, songsConstant: constantName}
    });
  }

  /**
   * Create bubble effect background and randomize bubbles.
   * @param twoDimensionalContext: Canvas of background.
   * @param bubbleList: List of bubbles.
   */
  private static createBackground(twoDimensionalContext: CanvasRenderingContext2D,
                                  bubbleList: { x: number, y: number, r: number, o: number, color: string }[]) {
    const windowInnerWidth = window.innerWidth,
      windowInnerHeight = window.innerHeight;

    twoDimensionalContext.clearRect(0, 0, windowInnerWidth, windowInnerHeight);
    for (let index = 0; index < bubbleList.length; index++) {
      const radius = bubbleList[index].r;
      twoDimensionalContext.fillStyle = 'rgba(' + bubbleList[index].color + ',' + bubbleList[index].o + ')';
      twoDimensionalContext.beginPath();
      twoDimensionalContext.arc(bubbleList[index].x, bubbleList[index].y, radius, 0, 2 * Math.PI, true);
      bubbleList[index].r += 1;

      if (radius > windowInnerHeight / 7) {
        bubbleList[index].o -= .005;
      }

      if (bubbleList[index].o <= -3) {
        bubbleList.splice(index, 1);
      }

      twoDimensionalContext.fill();
    }
  }

  /**
   * Create a random bubble.
   * @param occurrence
   * @param theme
   * @param defaultHeight
   * @param containerWidth
   * @param bubbleList
   * @returns {number}
   */
  private static createBubble(occurrence: number, defaultHeight: number, containerWidth: number, theme: string,
                              bubbleList: { x: number, y: number, r: number, o: number, color: string }[]): number {
    const colorList = theme === 'dark' ? MusicConstants.darkBubbleColor : MusicConstants.bubbleColors;
    const randomVerticalPosition = Math.random() * defaultHeight;
    const randomHorizontalPosition = Math.random() * containerWidth;
    const bubbleColor = colorList[occurrence % colorList.length];
    const element = {x: randomHorizontalPosition, y: randomVerticalPosition, r: 10, o: .3, color: bubbleColor};
    bubbleList.push(element);
    return occurrence + 1;
  }

  /**
   * Create a stick.
   * @param xmlns: Name space url.
   * @param id: Id of stick.
   * @returns {Element}
   */
  private static createStick(xmlns: string, id: number): Element {
    const stick = document.createElementNS(xmlns, 'svg');
    stick.id = 'timing' + id;
    stick.setAttribute('x', '0px');
    stick.setAttribute('y', '0px');
    stick.setAttribute('enable-background', 'new 0 0 200 200');
    return stick;
  }

  /**
   * Create a stroke.
   * @param xmlns: Name space url.
   * @param id: Id of stick.
   * @returns {Element}
   */
  private static createStroke(xmlns: string, id: number): Element {
    const stroke = document.createElementNS(xmlns, 'g');
    stroke.setAttribute('stroke-width', '1');
    stroke.setAttribute('stroke-linecap', 'round');
    stroke.setAttribute('stroke-miterlimit', '10');

    const path = MusicComponent.createPath(xmlns, id);
    stroke.appendChild(path);
    return stroke;
  }

  /**
   * Create a path.
   * @param xmlns: Name space url.
   * @param id: Id of stick.
   * @returns {Element}
   */
  private static createPath(xmlns: string, id: number): Element {
    const defaultWidthHeightList = [620, 960];
    const path = document.createElementNS(xmlns, 'path');
    if (id % 2) {
      path.setAttribute('d', 'M' + Math.round(Math.random() * defaultWidthHeightList[id % 2]) + ',0v620');
      path.setAttribute('style', 'stroke-dasharray: \'620, 622\'');
    } else {
      path.setAttribute('d', 'M0,' + Math.round(Math.random() * defaultWidthHeightList[id % 2]) + 'h960');
      path.setAttribute('style', 'stroke-dasharray: \'960, 962\'');
    }
    return path;
  }

  /**
   * Create a Vivus stick.
   * @param id: Id of stick.
   */
  private static createVivus(id: number) {
    const options: VivusOptions = {
      type: 'delayed',
      duration: 1e3,
      start: 'autostart',
      pathTimingFunction: Vivus.LINEAR,
      animTimingFunction: Vivus.LINEAR
    };
    // tslint:disable-next-line:no-unused-expression
    new Vivus('timing' + id, options);
  }
}
