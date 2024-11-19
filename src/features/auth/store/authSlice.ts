import { createSlice } from "@reduxjs/toolkit";

// import { RootState } from "@store/types";
import { registerUser } from "./authActions";

// Define a type for the slice state
interface AuthState {
  user: any;
  status: "loading" | "idle" | "failed" | "succeeded";
  error?: string | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        console.log(action);
        state.error = action.payload;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      }),
});

// export const { increment } = counterSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value;

export default authSlice.reducer;
