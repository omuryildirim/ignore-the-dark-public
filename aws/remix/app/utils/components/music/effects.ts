import type { Dispatch, SetStateAction } from 'react';
import * as Vivus from 'vivus';

type Interval = number | undefined;
let dualitiesInterval: Interval;
let dualitiesIntervalCircle: Interval;
let ossifyIntervalCircle: Interval;
let ossifyInterval: Interval;
let existenceInterval: Interval;

export const dualitiesEffect = (setAlbumSelection: Dispatch<SetStateAction<string>>) => {
  if (!dualitiesInterval) {
    setAlbumSelection('Dualities');
    bubbleEffect('');
  }
};

export const ossifyEffect = (setAlbumSelection: Dispatch<SetStateAction<string>>) => {
  if (!ossifyInterval) {
    setAlbumSelection('Ossify');
    bubbleEffect('dark');
  }
};

const getMusicContainer = () => {
  return document.getElementById('music-container') as HTMLElement;
};

const bubbleEffect = (theme: string) => {
  clearIntervals();
  const setAnimationInterval = (index: Interval) => {
    if (theme) {
      ossifyInterval = index;
    } else {
      dualitiesInterval = index;
    }
  };
  const SetCircleInterval = (index: Interval) => {
    if (theme) {
      ossifyIntervalCircle = index;
    } else {
      dualitiesIntervalCircle = index;
    }
  };

  const a = () => {
    e.clearRect(0, 0, k, l);
    for (let index = 0; index < j.length; index++) {
      f = j[index].r;
      e.fillStyle = `rgba(${j[index].color},${j[index].o})`;
      e.beginPath();
      e.arc(j[index].x, j[index].y, f, 0, 2 * Math.PI, !0);
      j[index].r++;

      if (f > l / 7) {
        j[index].o -= 0.005;
      }

      if (j[index].o <= -3) {
        j.splice(index, 1);
      }

      e.fill();
    }
  };

  const b = () => {
    m = n[o % n.length];
    o++;
    const element = { x: c, y: d, r: 10, o: 0.3, color: m };
    j.push(element);
  };

  let c: number;
  let d: number;
  let e: CanvasRenderingContext2D;
  let f: number;
  let n = ['0, 173, 239', '0, 128, 95', '246, 129, 33', '154, 37, 142', '248, 237, 0'];
  let m = '255,255,255';
  let o = 0;
  // tslint:disable-next-line:no-unused-expression
  const g = window;
  const i = document.createElement('canvas');
  const j: { x: number; y: number; r: number; o: number; color: string }[] = [];
  const k = g.innerWidth;
  const l = g.innerHeight;

  if (theme === 'dark') {
    n = ['96, 96, 73'];
  }

  getMusicContainer().append(i);
  if (i.getContext) {
    e = i.getContext('2d') as CanvasRenderingContext2D;
    const p = getMusicContainer().offsetWidth + 40;
    const q = 637;
    e.canvas.width = p;
    e.canvas.height = q;
    e.canvas.style.position = 'absolute';
    e.canvas.style.top = '0';
    e.canvas.style.left = '0';
    e.canvas.style.zIndex = '-1';
    setAnimationInterval(
      setInterval(() => {
        a();
      }, 20) as unknown as number
    );
    SetCircleInterval(
      setInterval(() => {
        d = Math.random() * q;
        c = Math.random() * p;
        b();
      }, 1e3) as unknown as number
    );
  }
};

const clearIntervals = () => {
  const canvas = getMusicContainer().querySelector('canvas');
  if (canvas) {
    canvas.remove();
  }
  clearInterval(dualitiesInterval);
  clearInterval(dualitiesIntervalCircle);
  clearInterval(ossifyInterval);
  clearInterval(ossifyIntervalCircle);
  clearInterval(existenceInterval);

  dualitiesInterval = undefined;
  dualitiesIntervalCircle = undefined;
  ossifyInterval = undefined;
  ossifyIntervalCircle = undefined;
  existenceInterval = undefined;
};

export const existenceEffect = (setAlbumSelection: Dispatch<SetStateAction<string>>) => {
  if (!existenceInterval) {
    clearIntervals();
    setAlbumSelection('Existence');

    const width = document.querySelector('.music-container')?.clientWidth || 960;
    const height = document.querySelector('.music-container')?.clientHeight || 620;
    const b = [height, width];
    let c = 0;
    let d = 0;
    existenceInterval = setInterval(() => {
      const xmlns = 'http://www.w3.org/2000/svg';
      const stick = document.createElementNS(xmlns, 'svg');
      stick.id = `timing${c}`;
      stick.setAttribute('x', '0px');
      stick.setAttribute('y', '0px');
      stick.setAttribute('enable-background', 'new 0 0 200 200');
      const stroke = document.createElementNS(xmlns, 'g');
      stick.setAttribute('stroke-width', '1');
      stick.setAttribute('stroke-linecap', 'round');
      stick.setAttribute('stroke-miterlimit', '10');

      const path = document.createElementNS(xmlns, 'path');
      if (c % 2) {
        path.setAttribute('d', `M${Math.round(Math.random() * b[c % 2])},0v${height}`);
        path.setAttribute('style', `stroke-dasharray: '${height}, ${height + 2}'`);
      } else {
        path.setAttribute('d', `M0,${Math.round(Math.random() * b[c % 2])}h${width}`);
        path.setAttribute('style', `stroke-dasharray: '${width}, ${width + 2}'`);
      }
      stroke.appendChild(path);
      stick.appendChild(stroke);

      (getMusicContainer().querySelector('.album-container') as Element).append(stick);
      const f: Vivus.VivusOptions = {
        type: 'delayed',
        duration: 1e3,
        start: 'autostart',
        pathTimingFunction: Vivus.LINEAR,
        animTimingFunction: Vivus.LINEAR
      };
      new Vivus.default(`timing${c}`, f);
      c++;
      const selectedSVG = getMusicContainer().querySelector(`#timing${d}`) as Element;
      selectedSVG.setAttribute('class', 'opacity');
      d++;
      setTimeout(() => {
        selectedSVG.setAttribute('style', 'opacity: 0');
        setTimeout(() => {
          selectedSVG.remove();
        }, 1e3);
      }, 1e4);
    }, 1e3) as unknown as number;
  }
};

export const simpleRepetitionsEffect = (setAlbumSelection: Dispatch<SetStateAction<string>>) => {
  clearIntervals();
  setAlbumSelection('Simple Repetitions');
};
