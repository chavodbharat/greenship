import React, {useState, useEffect} from 'react';
import {AppState} from 'react-native';

export default function useAppState(settings: any) {
  const {onChange, onForeground, onBackground} = settings || {};
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: any) => {
      if (nextAppState === 'active' && appState !== 'active') {
        isValidFunction(onForeground) && onForeground();
      } else if (
        appState === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        isValidFunction(onBackground) && onBackground();
      }
      setAppState(nextAppState);
      isValidFunction(onChange) && onChange(nextAppState);
    };
    const appState = AppState.addEventListener('change', handleAppStateChange);

    return () => appState.remove();
  }, [onChange, onForeground, onBackground, appState]);

  function isValidFunction(func: any) {
    return func && typeof func === 'function';
  }
  return {appState};
}
