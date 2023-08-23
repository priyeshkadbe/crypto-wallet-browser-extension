import { createSlice, PayloadAction,AsyncThunkAction, createAsyncThunk } from "@reduxjs/toolkit";
import { checkAccountExists } from "../services";
import {RootState} from "../store"


interface AccountState{
  mnemonics: string,
  password: string,
  accounts: [
    {
      account:string,
      publicKey: string,
      privateKey:string,
    }
  ]
}







