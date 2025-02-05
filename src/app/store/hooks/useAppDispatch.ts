import { useDispatch } from "react-redux";

import { AppDispatch } from "../types";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Ensure that the dispatch function is correctly typed for my App.

// useDispatch is hook to access the dispatch function
// AppDispatch is a type that I have defined to represent the valid actions for my store.
