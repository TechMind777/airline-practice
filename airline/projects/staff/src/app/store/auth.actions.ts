import { Action, createAction, props } from '@ngrx/store'; 

 
export const set = createAction(
  'login',
  props<Object >(),
);
 

// export const INCREMENT = '[Counter] Increment'

// export class IncrementAction implements Action {
//   readonly type = INCREMENT;

//   constructor(public value: number) {}
// }

// export type CounterActions = IncrementAction;
