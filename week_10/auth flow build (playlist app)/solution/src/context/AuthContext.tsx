// todo: store the current user and access token in state inside the shared provider
// todo: keep the session in memory and start without a session
// todo: store the returned session only after login or registration succeeds
// todo: clear the session on logout and expose a hook for reading auth state and actions

import { createContext, useContext, useState, type ReactNode } from "react";
import * as authApi from "../lib/authApi";
import type { AuthUser } from "../lib/authApi";


type AuthContextValue = {
  authToken: string;
  currentUser: AuthUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }){

  const [authToken, setAuthToken] = useState("");
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  async function signIn(email: string, password: string) {
    const body = await authApi.login(email, password);
    setAuthToken(body.token);
    setCurrentUser(body.user);
  }

  async function signUp(name: string, email: string, password: string) {
    const body = await authApi.register(name, email, password);
    setAuthToken(body.token);
    setCurrentUser(body.user);
  }

function signOut() {
    // clearing both values makes every route consumer see the signed-out state.
    // this removes the local session; it does not revoke the issued backend token.
    setAuthToken("");
    setCurrentUser(null);
  }

return (
    <AuthContext.Provider value={{
      authToken,
      currentUser,
      signIn, signUp, signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if (auth === undefined) throw new Error("useAuth must be used inside AuthProvider");
  return auth;
}
