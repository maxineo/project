import { Dispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from './store';

/**
 * Custom hook for getting the state.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Custom hook for getting dispatch function.
 * @returns Dispatch.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
