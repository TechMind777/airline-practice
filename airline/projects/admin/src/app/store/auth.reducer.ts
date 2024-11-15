import { Action, createReducer, on } from '@ngrx/store';

// import { CounterActions, INCREMENT, IncrementAction } from './counter.actions';
import {   set } from './auth.actions';

const initialState :Object= {};

export const authReducer = createReducer(
  initialState,
  on(set, (state, action) =>  action ),
  // on(decrement, (state, action) => state - action.value),
  // on(set, (state, action) => action.value),
);

// export function counterReducer(state = initialState, action: CounterActions | Action) {
//   if (action.type === INCREMENT) {
//     return state + (action as IncrementAction).value;
//   }
//   return state;
// }

