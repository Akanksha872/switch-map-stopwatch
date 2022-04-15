import { fromEvent, interval, merge, NEVER } from 'rxjs';
import { mapTo, scan, switchMap } from 'rxjs/operators';
import { emptyElement } from './dom-manipulation';

const start = document.getElementById('start');
const pause = document.getElementById('pause');
const clear = document.getElementById('clear');
const result = document.getElementById('result');

const start$ = fromEvent(start, 'click').pipe(mapTo(true));
const pause$ = fromEvent(pause, 'click').pipe(mapTo(false));
const clear$ = fromEvent(clear, 'click');

const counter$ = merge(start$, pause$).pipe(
  switchMap((shouldRun) => {
    if (shouldRun) {
      return interval(1000);
    } else {
      return NEVER;
    }
  }),
  scan((total) => total + 1, 0) // to continue from paused value
);

const setCount = (value) => {
  result.innerText = value;
};

counter$.subscribe(setCount);
clear$.subscribe(() => emptyElement(result));
