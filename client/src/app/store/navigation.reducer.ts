import { createReducer, on } from '@ngrx/store';
import { createAction, props } from '@ngrx/store';

export const setNavigationData = createAction(
  '[Navigation] Set Data',
  props<{ data: string }>()
);

export const clearNavigationData = createAction('[Navigation] Clear Data');

export const initialState: string | null = null;

export const navigationReducer = createReducer<string|null>(
  initialState,
  on(setNavigationData, (state, { data }) => data),
  on(clearNavigationData, () => null)
);