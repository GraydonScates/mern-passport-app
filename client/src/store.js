import { useReducer, createContext } from 'react';
import rootReducer from './reducers';

export const Store = createContext();

export function StoreProvider(props){
    const [state, dispatch] = useReducer(rootReducer[0], rootReducer[1]);
    const value = {state, dispatch};
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
}