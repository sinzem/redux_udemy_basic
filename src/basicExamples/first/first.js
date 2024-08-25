
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

const initialState = {value: 0}; /* (начальное состояние) */

const reducer = (state = initialState, action) => { /* (редьюсер, в него передаем начальное состояние и действия) */
    switch (action.type) { /* (проверяем тип действия, соответственно каждому меняем состояние) */
        case "INC":
            return {
                ...state,
                value: state.value + 1
            }; /* (не забываем про иммутабельность) */
        case "DEC":
            return {
                ...state,
                value: state.value - 1
            };
        case "RND":
            return {
                ...state,
                value: state.value * action.payload
            };
        default:
            return state;
    }
}

const store = createStore(reducer); /* (создаем store, подключаем в него редьюсер) */

const update = () => {
    document.getElementById('counter').textContent = store.getState().value;
}

store.subscribe(update); /* (функция subscribe следит за изменениями store, запустит функцию по отрисовке результата на страницу) */

/* (экшинкриэйтеры - функции для сокращения кода действий - примут действие, при вызове вернут его без изменений) */
const inc = () => ({type: 'INC'});
const dec = () => ({type: 'DEC'});
const rnd = (value) => ({type: 'RND', payload: value});

/* (навешиваем действия на кнопки(вызываем экшнкриэйтеры, можно просто прописывать действия), обязательно через функцию dispatch(для доставки действия в редьюсер)) */
document.getElementById('inc').addEventListener('click', () => {
    store.dispatch(inc());
});

document.getElementById('dec').addEventListener('click', () => {
    store.dispatch(dec());
});

document.getElementById('rnd').addEventListener('click', () => {
    const value = Math.floor(Math.random() * 10);
    store.dispatch(rnd(value)); /* (при вызове действия передаем в него дополнительную информацию - полезную нагрузку(payload) - идет аргументом - редьюсер только обрабатывает пришедшие действия и payload, внутри него нельзя получать подобные данные по типу случайных чисел или запросов, обращений к dom-дереву, также выводов в консоль - они должны быть получены зараннее и переданы как payload) */
});



// let state = reducer(initialState, {type: 'INC'});
// state = reducer(state, {type: 'INC'});
// state = reducer(state, {type: 'INC'});
// state = reducer(state, {type: 'INC'});
// console.log(state);

ReactDOM.render(
  <React.StrictMode>
    <>
    
    </>
  </React.StrictMode>,
  document.getElementById('root')
);