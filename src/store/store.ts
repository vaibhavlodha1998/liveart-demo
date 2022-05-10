import {
    Action,
    configureStore,
    getDefaultMiddleware,
    ThunkAction,
  } from '@reduxjs/toolkit';

  import mineSweeperMapReducer from '../features/mineSweeperMap/mineSweeperMapSlice'
  import messageHistoryReducer from '../features/messageHistory/messageHistorySlice'
  import levelReducer from '../features/level/levelSlice'
  import messageReducer from '../features/message/messageSlice'
  
  
  export const store = configureStore({
    reducer: {
      mineSweeperMap: mineSweeperMapReducer,
      messageHistory: messageHistoryReducer,
      level: levelReducer,
      message: messageReducer,

    },
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    })
  });
  
  export type AppDispatch = typeof store.dispatch;
  export type RootState = ReturnType<typeof store.getState>;
  export type AppThunk<ReturnType = void> = ThunkAction<
     ReturnType,
     RootState,
     unknown,
     Action<string>
   >;