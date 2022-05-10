import {
    createSlice,
    PayloadAction,
  } from '@reduxjs/toolkit';
  import type { RootState } from '../../store/store';

  interface Message {
    message : string
  } 

  const initialState: Message = {
    message: '',
  };


  export const messageSlice = createSlice({
    name: 'message',
    initialState,
  reducers: {

      updateMessage: (state, action: PayloadAction<string>) => {
        state.message = action.payload
      },
      
    },
  });
  
  export const {
    updateMessage
  } = messageSlice.actions;

  
    export const selectMessage = (state: RootState) => state.message.message;
  
  export default messageSlice.reducer;