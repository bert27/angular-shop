import {
  trigger,
  animate,
  transition,
  style,
  query,
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* <=> *', [
    // Oculta el nuevo elemento antes de que entre
    query(':enter', [style({ opacity: 0 })], { optional: true }),

    // Anima la salida del elemento anterior
    query(
      ':leave',
      [style({ opacity: 1 }), animate('0.2s', style({ opacity: 0 }))],
      { optional: true }
    ),

    // Anima la entrada del nuevo elemento
    query(
      ':enter',
      [style({ opacity: 0 }), animate('0.2s', style({ opacity: 1 }))],
      { optional: true }
    ),
  ]),
]);
