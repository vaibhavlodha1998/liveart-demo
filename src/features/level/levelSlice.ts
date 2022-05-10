import {
    createSlice,
    PayloadAction,
  } from '@reduxjs/toolkit';
  import type { RootState } from '../../store/store';

  interface Level {
    level : string
  } 

  const initialState: Level = {
    level: '1',
  };


  export const levelSlice = createSlice({
    name: 'level',
    initialState,
  reducers: {

      updateLevel: (state, action: PayloadAction<string>) => {
        state.level = action.payload
      },
      resetLevel: (state, action: PayloadAction<string>) => {
        state.level = '1'
      },
    },
  });
  
  export const {
    updateLevel,
    resetLevel
  } = levelSlice.actions;

  
    export const selectLevel = (state: RootState) => state.level.level;
  
  export default levelSlice.reducer;