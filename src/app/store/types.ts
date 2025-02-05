import { store } from "./store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// store.getState - is a function from the Redux store, it returns the entire current state of store
// ReturnType<typeof store.getState> - it extracts the return type of the store.getState function

//RootState - represents the shape of my entire Redux state object.

// AppDispatch - by this I ensure that when I call dispatch, I only allow to dispatch actions that are valid for my app.
