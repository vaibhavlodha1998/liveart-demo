import {
    createSlice,
    PayloadAction,
  } from '@reduxjs/toolkit';
  import type { RootState } from '../../store/store';

  export type MineSweeperMapState = {
    value: Array<any>;
  };

  const initialState: MineSweeperMapState = {
    value: [],
  };


  export const mineSweeperMapSlice = createSlice({
    name: 'mineSweeperMap',
    initialState,
  reducers: {

      updateMineSweeperMap: (state, action: PayloadAction<Array<any>>) => {
        return [...state.value,...action.payload]
      },
    },
  });
  
  export const {
    updateMineSweeperMap
  } = mineSweeperMapSlice.actions;

  
    export const selectMineSweeperMap = (state: RootState) => state.mineSweeperMap;
  
  export default mineSweeperMapSlice.reducer;