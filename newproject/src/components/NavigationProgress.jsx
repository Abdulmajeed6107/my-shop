import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./NavigationProgress.css";

const NavigationProgressContext = createContext({
  completeNavigation: () => {},
});

export const useNavigationProgress = () => useContext(NavigationProgressContext);

export default function NavigationProgressProvider({ children }) {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const timersRef = useRef([]);
  const completedRef = useRef(false);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const completeNavigation = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    clearTimers();

    setProgress(100);
    timersRef.current.push(
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 250)
    );
  }, []);

  const startNavigation = useCallback(() => {
    completedRef.current = false;
    clearTimers();
    setVisible(true);
    setProgress(12);

    timersRef.current.push(
      setTimeout(() => setProgress((p) => (p < 55 ? 55 : p)), 120),
      setTimeout(() => setProgress((p) => (p < 82 ? 82 : p)), 320),
      setTimeout(() => completeNavigation(), 900)
    );
  }, [completeNavigation]);

  useEffect(() => {
    startNavigation();
    return clearTimers;
  }, [location.pathname, location.search, location.key, startNavigation]);

  return (
    <NavigationProgressContext.Provider value={{ completeNavigation }}>
      {visible && (
        <div className="navigation-progress" aria-hidden="true">
          <div
            className="navigation-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {children}
    </NavigationProgressContext.Provider>
  );
}
