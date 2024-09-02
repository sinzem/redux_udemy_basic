import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import {thunk} from "redux-thunk"; /* (middleware для передачи функций в dispatch) */
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


/* (middleware - усилитель именно для dispatch - набор обложек из функций, которые по цепочке принимают store(можно декомпозировать - использует dispatch и getState), dispatch(заменен на next - миддлверы зачастую подключаются цепочкой, и next запускает следующий миддлвер(с помощью applyMiddleware), суммируя усиления) и action, внутри пишем функционал по усилению и возвращаем диспетчер, подключаем все это при создании store(ниже)) */
const stringMiddleware = (/* store *//* {dispatch, getState} */) => (/* dispatch */next) => (action) => { 
    if (typeof action === 'string') { /* (проверяем, если действие пришло в виде строки вместо обьекта, преобразовываем в обьект) */
        return /* dispatch */next({
            type: action
        })
    }
    return /* dispatch */next(action)
}

/* (создаем store, подключаем в него редьюсер и передаем строку для подключения DevTools, если редьюсеров много - передаем через функцию combineReducers(редьюсеры передаем в нее обязательно в виде обьекта)) */
const store = createStore(
                    combineReducers({heroes, filters}),
                    compose( /* (встроенная функция для подключения усилителей, миддлверов и т.д)  */
                        /*  enhancer, */
                        /* (функция applyMiddleware для подключения миддлверов - по цепочке собирает через вызов next, суммируя результат усиления диспетчера, thunk для передачи в dispatch функций, в т.ч асинхронных, пример использования в HeroesList) */
                        applyMiddleware(thunk, stringMiddleware),
                        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() /* (строка подключения приложения к DevTools(результат - отображение работы redux в консоли браузера)) */
                    ) 
                );

export default store;