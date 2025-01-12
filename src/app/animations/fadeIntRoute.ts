import { trigger, animate, transition, style, query, group } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* <=> *', [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true },
    ),

    group([
      query(':leave', [style({ opacity: 1 }), animate('300ms ease-out', style({ opacity: 0 }))], { optional: true }),

      query(':enter', [style({ opacity: 0 }), animate('300ms ease-in', style({ opacity: 1 }))], { optional: true }),
    ]),
  ]),
]);
