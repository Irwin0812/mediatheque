import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { userReducer } from './userReducer';
import { comicsReducer } from './comicsReducer';
import { vinylsReducer } from './vinylsReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  comics: comicsReducer,
  vinyls: vinylsReducer,
  darkMode: (state: any) => state
});

export type RootState = ReturnType<typeof rootReducer>;
