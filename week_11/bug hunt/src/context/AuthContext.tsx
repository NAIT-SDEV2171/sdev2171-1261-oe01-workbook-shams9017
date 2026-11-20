// todo: 04: import the hooks, response parser, and storage helper used for restoration
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { parseResponse } from "../lib/api";
import type { AuthUser } from "../lib/authApi";
import * as authApi from "../lib/authApi";
import * as sessionStorage from "../lib/sessionStorage";

type AuthContextValue = {
  authToken: string;
  currentUser: AuthUser | null;
  // 05: expose restoration state and a retry action in the auth context type
  isRestoring: boolean;
  restoreError: string;
  retryRestore: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  // 06: change signOut to return a promise because storage deletion is asynchronous
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authToken, setAuthToken] = useState("");
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  // todo: 07: add state for restoration, errors, and duplicate restore protection
  const [isRestoring, setIsRestoring] = useState(true);
  const [restoreError, setRestoreError] = useState("");
  const restoreInProgress = useRef(false);

  // todo: 08: read the saved token, validate it using /auth/me, and handle invalid or unreachable sessions
  async function restoreSession() {
    if (restoreInProgress.current) return;
    restoreInProgress.current = true;
    setIsRestoring(true);
    setRestoreError("");

    try {
      const savedToken = await sessionStorage.readToken();
      if (!savedToken) {
        setAuthToken("");
        setCurrentUser(null);
        return;
      }
      const response = await authApi.getCurrentUser(savedToken);
      if (response.status === 401) {
        await sessionStorage.clearToken();
        setAuthToken("");
        setCurrentUser(null);
        return;
      }
      const body = await parseResponse(response);
      if (!body?.user?.id || !body?.user?.email) {
        throw new Error("The backend did not return a valid user.");
      }
      setCurrentUser(body.user as AuthUser);
      setAuthToken(savedToken);
    } catch {
      setRestoreError(
        "Could not restore the session. Check the backend connection and try again.",
      );
    } finally {
      setIsRestoring(false);
      restoreInProgress.current = false;
    }
  }
  // todo: 09: start session restoration once when the provider mounts
  useEffect(() => {
    void restoreSession();
  }, []);
  async function signIn(email: string, password: string) {
    const body = await authApi.login(email, password);
    // todo: 10: save the token securely after successful sign in, before updating context
    await sessionStorage.saveToken(body.token);
    setAuthToken(body.user.id);
    setCurrentUser(body.user);
  }

  async function signUp(name: string, email: string, password: string) {
    const body = await authApi.register(name, email, password);
    // todo: 11: save the token securely after successful registration, before updating context
    await sessionStorage.saveToken(body.user.id);
    setAuthToken(body.token);
    setCurrentUser(body.user);
  }

  // todo: 12: make signOut asynchronous and delete the saved token before clearing context
  async function signOut() {
    // clearing both values makes every route consumer see the signed-out state.
    // this removes the local session; it does not revoke the issued backend token.
    await sessionStorage.clearToken();
    setAuthToken("");
    setCurrentUser(null);
  }
  return (
    <AuthContext.Provider
      value={{
        authToken,
        currentUser,
        // 13: provide the restoration state and retry action to context consumers
        isRestoring,
        restoreError,
        retryRestore: restoreSession,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if (auth === undefined)
    throw new Error("useAuth must be used inside AuthProvider");
  return auth;
}
