import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Fx = { enabled: boolean; toggle: () => void };
const FxContext = createContext<Fx>({ enabled: true, toggle: () => {} });

/** Global switch for heavy visual effects (3D globe, digital rain, looping animations). */
export function FxProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const saved = window.localStorage.getItem("ubisec-fx");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (saved === "off" || (saved === null && reduced)) setEnabled(false);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("fx-off", !enabled);
  }, [enabled]);

  const toggle = () =>
    setEnabled((v) => {
      window.localStorage.setItem("ubisec-fx", v ? "off" : "on");
      return !v;
    });

  return <FxContext.Provider value={{ enabled, toggle }}>{children}</FxContext.Provider>;
}

export const useFx = () => useContext(FxContext);
