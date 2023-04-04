import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { CreateReduxStore } from '../config/store';
import { StateSchema } from '../config/StateSchema';

interface StoreProviderProps {
    children: ReactNode;
    initialState?: DeepPartial<StateSchema>;
    lazyReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider = (props: StoreProviderProps) => {
    const {
        children,
        initialState,
        lazyReducers,
    } = props;

    const store = CreateReduxStore(
        initialState as StateSchema,
        lazyReducers as ReducersMapObject<StateSchema>,
    );

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
