import { createAsyncThunk } from "@reduxjs/toolkit";

import { login, register } from "@services/api";

interface SignUpInfo {
  name: string;
  email: string;
  password: string;
}

interface LoginInfo {
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk<
  void,
  SignUpInfo,
  {
    rejectValue: string;
  }
>("auth/register", async (user, { rejectWithValue }) => {
  try {
    await register(user.name, user.email, user.password);
  } catch (error) {
    rejectWithValue("Error");
    console.log(error);
  }
});

export const loginUser = createAsyncThunk<
  void,
  LoginInfo,
  {
    rejectValue: string;
  }
>("auth/register", async (user, { rejectWithValue }) => {
  try {
    await login(user.email, user.password);
  } catch (error) {
    rejectWithValue("Error");
    console.log(error);
  }
});
