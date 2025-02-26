import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import diagramReducer from "./slices/diagramSlice";
import { RootState } from "../../@types/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    user: userReducer,
    diagrams: diagramReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppState = RootState;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
