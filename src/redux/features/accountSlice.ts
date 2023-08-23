import { createSlice, PayloadAction,AsyncThunkAction, createAsyncThunk } from "@reduxjs/toolkit";
import { checkAccountExists } from "../services";
import {RootState} from "../store"

interface AccountState{
  isAccountExists: boolean,
  error:string | null
}

const initialState: AccountState = {
  isAccountExists: false,
  error:null
}

// export const fetchAccountStatus = createAsyncThunk<
//   boolean,
//   string,
//   { state: RootState; rejectValue: string }
// >("account/fetchAccountStatus", async (seedPhrase, { rejectWithValue }) => {
//   try {
//     const isAccountExisting = await checkAccountExists(seedPhrase);
//     return isAccountExisting; // Ensure this is of type `boolean`
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });


