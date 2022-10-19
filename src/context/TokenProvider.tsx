import { createContext, useMemo, useState } from "react";
import { getLocalStorage, setLocalStorage } from "utils";

type ContextType = [string | null, { setJWT: (value: string) => void }];

export const TokenContext = createContext<ContextType>([
  getLocalStorage("jwt"),
  { setJWT: (value: string) => {} },
]);

const TokenProvider = ({ children }: { children: JSX.Element }) => {
  const [token, setToken] = useState<string | null>(getLocalStorage("jwt"));
  const actions = useMemo(
    () => ({
      setJWT(value: string) {
        setLocalStorage("jwt", value);
        setToken(value);
      },
    }),
    []
  );

  const value: ContextType = useMemo(() => [token, actions], [actions, token]);
  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};

export default TokenProvider;
