import { createStore, combineReducers, compose } from 'redux';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

/* (enhancer - усилитель(перевод) для store, пример создания(их написано очень много, все пользуются готовыми)) */
const enhancer = (createStore) => (...args) => {
    const store = createStore(...args);

    const oldDispatch = store.dispatch; /* (сохраняем исходную функцию-диспетчер) */
    store.dispatch = (action) => {
        if (typeof action === 'string') { /* (проверяем, если действие пришло в виде строки вместо обьекта, преобразовываем в обьект) */
            return oldDispatch({
                type: action
            })
        }
        return oldDispatch(action)
    }
    return store; /* (теперь диспетчер может принимать как обьекты, так и строки) */
} /* (подключаем при создании store(ниже)) */

/* (создаем store, подключаем в него редьюсер и передаем строку для подключения DevTools, если редьюсеров много - передаем через функцию combineReducers(редьюсеры передаем в нее обязательно в виде обьекта)) */
const store = createStore(
                    combineReducers({heroes, filters}),
                    compose( /* (встроенная функция для подключения усилителей, миддлверов и т.д) */
                        enhancer,
                        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                    ));

export default store;