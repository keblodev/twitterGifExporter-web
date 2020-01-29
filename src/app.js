import React            from 'react';
import { Provider }     from 'react-redux';
import App              from './components/app';

import { configureStore } from './store/configureStore-ENV_TARGET';
const store = configureStore();

export default function({locale, isLocaleUpdating}) {
    return (
        <Provider store={store}>
            <App locale={locale} isLocaleUpdating={isLocaleUpdating}/>
        </Provider>
    );
}
