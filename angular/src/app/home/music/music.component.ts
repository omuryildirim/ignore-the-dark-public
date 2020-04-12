import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import * as Vivus from 'vivus';
import {MusicConstants} from './music.constants';
import {MatDialog} from '@angular/material/dialog';
import {SongDialogComponent} from './song-dialog/song-dialog.component';
import Timeout = NodeJS.Timeout;

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
    const intervalName = theme ? 'ossifyInterval' : 'dualitiesInterval';
    const circleIntervalName = theme ? 'ossifyIntervalCircle' : 'dualitiesIntervalCircle';

    const a = () => {
      e.clearRect(0, 0, k, l);
      for (let index = 0; index < j.length; index++) {
        f = j[index].r, e.fillStyle = 'rgba(' + j[index].color + ',' + j[index].o + ')', e.beginPath(), e.arc(j[index].x, j[index].y, f,
          0, 2 * Math.PI, !0), j[index].r++;

        if (f > l / 7) {
          j[index].o -= .005;
        }

        if (j[index].o <= -3) {
          j.splice(index, 1);
        }

        e.fill();
      }
    };

    const b = () => {
      m = n[o % n.length], o++;
      const element = {x: c, y: d, r: 10, o: .3, color: m};
      j.push(element);
    };

    let c, d, e, f,
      n = ['0, 173, 239', '0, 128, 95', '246, 129, 33', '154, 37, 142', '248, 237, 0'], m = '255,255,255', o = 0;
    // tslint:disable-next-line:no-unused-expression
    const g = window, h = (g.event, document), i = h.createElement('canvas'), j = [], k = g.innerWidth,
      l = g.innerHeight;

    if (theme === 'dark') {
      n = ['66, 63, 58'];
    }

    this.musicContainer.nativeElement.append(i);
    if (i.getContext) {
      e = i.getContext('2d');
      const p = this.musicContainer.nativeElement.offsetWidth + 40, q = 637;
      e.canvas.width = p, e.canvas.height = q, e.canvas.style.position = 'absolute', e.canvas.style.top = 0,
        e.canvas.style.left = 0, e.canvas.style.zIndex = -1, this[intervalName] = setInterval(() => {
        a();
      }, 20), this[circleIntervalName] = setInterval(function () {
        d = Math.random() * q, c = Math.random() * p, b();
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

      const b = [620, 960];
      let c = 0, d = 0;
      this.existenceInterval = setInterval(() => {
        const xmlns = 'http://www.w3.org/2000/svg';
        const stick = document.createElementNS(xmlns, 'svg');
        stick.id = 'timing' + c;
        stick.setAttribute('x', '0px');
        stick.setAttribute('y', '0px');
        stick.setAttribute('enable-background', 'new 0 0 200 200');
        const stroke = document.createElementNS(xmlns, 'g');
        stick.setAttribute('stroke-width', '1');
        stick.setAttribute('stroke-linecap', 'round');
        stick.setAttribute('stroke-miterlimit', '10');

        const path = document.createElementNS(xmlns, 'path');
        if (c % 2) {
          path.setAttribute('d', 'M' + Math.round(Math.random() * b[c % 2]) + ',0v620');
          path.setAttribute('style', 'stroke-dasharray: \'620, 622\'');
        } else {
          path.setAttribute('d', 'M0,' + Math.round(Math.random() * b[c % 2]) + 'h960');
          path.setAttribute('style', 'stroke-dasharray: \'960, 962\'');
        }
        stroke.appendChild(path);
        stick.appendChild(stroke);

        this.musicContainer.nativeElement.querySelector('.album-container').append(stick);
        const f: any = {
          type: 'delayed',
          duration: 1e3,
          start: 'autostart',
          pathTimingFunction: Vivus.LINEAR,
          animTimingFunction: Vivus.LINEAR
        };
        // tslint:disable-next-line:no-unused-expression
        new Vivus('timing' + c, f);
        c++;
        const selectedSVG = this.musicContainer.nativeElement.querySelector('#timing' + d);
        selectedSVG.setAttribute('class', 'opacity');
        d++;
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
}
