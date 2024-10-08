import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';
import { Provider } from 'react-redux';

import App from './components/App';

const store = createStore(reducer);

ReactDOM.render(
    <React.StrictMode>
        {/* (оборачиваем приложение в обложку Provider, в который подключаем store, и который будет отслеживать изменения состояний(вместо subscribe) и передавать к компонентам) */}
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

