import React from "react";

export interface User {
  email?: string,
  firstName?: string,
  lastName?: string,
  userId?: string,
  verified?: boolean,
  isLoggedIn: boolean,
  isJustSignedUp?: boolean,
}

/**
 * Application state interface
 */
export interface AppState {
  user: User;
  updateState: (newState: Partial<AppState>) => void;
}

/**
 * Default application state
 */
const defaultState: AppState = {
  user: {
    isLoggedIn: false,
  },
  updateState: (newState?: Partial<AppState>) => {},
};

/**
 * Creating the Application state context for the provider
 */
export const UserContext = React.createContext<AppState>(defaultState);