import * as React from 'react';

import {
  StackActions,
  DrawerActions,
  CommonActions,
} from '@react-navigation/native';

export const navigationRef = React.createRef() as any;

export function navigate(name, params?: object) {
  navigationRef.current?.navigate(name, params);
}
export function goBack() {
  navigationRef.current?.canGoBack() && navigationRef.current?.goBack();
}
export function push(...args) {
  navigationRef.current?.dispatch(StackActions.push(...args));
}

export function pop(...args) {
  navigationRef.current?.canGoBack() &&
    navigationRef.current?.dispatch(StackActions.pop(...args));
}

export function popToRoot(...args) {
  navigationRef.current?.dispatch(StackActions.popToTop(...args));
}

export function replace(...args) {
  navigationRef.current?.dispatch(StackActions.replace(...args));
}
// export function replace(source, ...args) {
//     navigationRef.current?.dispatch({
//         ...StackActions.replace(...args),
//         source,
//         target: navigationRef.current?.dangerouslyGetState()?.key,
//     });
// }

export function toggleDrawer() {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}

export function reset(...args) {
  navigationRef.current?.dispatch(CommonActions.reset(...args));
}
