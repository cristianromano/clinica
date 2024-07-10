import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const routeTransition = trigger('routeTransition', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          width: '100%',
          top: 0,
          left: 0,
        }),
      ],
      { optional: true }
    ),
    query(':enter', [style({ transform: 'translateY(100%)', opacity: 0 })], {
      optional: true,
    }),
    group([
      query(
        ':leave',
        [
          animate(
            '300ms ease-out',
            style({ transform: 'translateY(-100%)', opacity: 0 })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          animate(
            '300ms ease-out',
            style({ transform: 'translateY(0)', opacity: 1 })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);

export const routeTransitionLogin = trigger('routeTransitionLogin', [
  transition('LoginPage <=> HomePage', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          width: '100%',
          top: 0,
          left: 0,
        }),
      ],
      { optional: true }
    ),
    query(':enter', [style({ transform: 'translateY(100%)', opacity: 0 })], {
      optional: true,
    }),
    group([
      query(
        ':leave',
        [
          animate(
            '300ms ease-out',
            style({ transform: 'translateY(-100%)', opacity: 0 })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          animate(
            '300ms ease-out',
            style({ transform: 'translateY(0)', opacity: 1 })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);
