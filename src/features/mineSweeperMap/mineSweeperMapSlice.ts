import {
    createSlice,
    PayloadAction,
  } from '@reduxjs/toolkit';
  import type { RootState } from '../../store/store';

  interface MineSweeperMapStateList {
    mineMap : string[]
  } 

  const initialState: MineSweeperMapStateList = {
    mineMap: [],
  };


  export const mineSweeperMapSlice = createSlice({
    name: 'mineSweeperMap',
    initialState,
  reducers: {

      updateMineSweeperMap: (state, action: PayloadAction<Array<any>>) => {
        state.mineMap = [...action.payload]
      },
    },
  });
  
  export const {
    updateMineSweeperMap
  } = mineSweeperMapSlice.actions;

  
    export const selectMineSweeperMap = (state: RootState) => state.mineSweeperMap.mineMap;
  
  export default mineSweeperMapSlice.reducer;