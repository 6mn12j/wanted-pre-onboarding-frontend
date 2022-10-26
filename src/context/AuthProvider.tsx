import { createContext, useMemo, useState } from "react";
import { getLocalStorage, setLocalStorage } from "utils";

type ContextType = [
  value: string | null,
  actions: {
    setJWT: (value: string) => void;
    login: () => void;
    logout: () => void;
  }
];

export const AuthContext = createContext<ContextType>([
  getLocalStorage("jwt"),
  { setJWT: (value: string) => {}, login: () => {}, logout: () => {} },
]);

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [token, setToken] = useState<string | null>(getLocalStorage("jwt"));
  const actions = useMemo(
    () => ({
      setJWT(value: string) {
        setLocalStorage("jwt", value);
        setToken(value);
      },
      login() {
        const token = getLocalStorage("jwt");
        setToken(token);
      },
      logout() {
        localStorage.removeItem("jwt");
        setToken(null);
      },
    }),
    []
  );

  const value: ContextType = useMemo(() => [token, actions], [token, actions]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
