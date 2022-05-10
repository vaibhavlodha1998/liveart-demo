import {
    createSlice,
    PayloadAction,
  } from '@reduxjs/toolkit';
  import type { RootState } from '../../store/store';

  interface messageHistory {
    messageHistory : any[]
  } 

  const initialState: messageHistory = {
    messageHistory: [],
  };


  export const messageHistorySlice = createSlice({
    name: 'messageHistory',
    initialState,
  reducers: {

      updatemessageHistory: (state, action: PayloadAction<Array<any>>) => {
        state.messageHistory = [...action.payload,...state.messageHistory]
      },
      deletemessageHistory: (state, action: PayloadAction<Array<any>>) => {
        state.messageHistory = []
      },
    },
  });
  
  export const {
    updatemessageHistory,
    deletemessageHistory
  } = messageHistorySlice.actions;

  
    export const selectMessageHistory = (state: RootState) => state.messageHistory.messageHistory;
  
  export default messageHistorySlice.reducer;