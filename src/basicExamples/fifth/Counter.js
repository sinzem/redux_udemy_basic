import {inc, dec, rnd} from '../actions';
import { useSelector, useDispatch } from "react-redux";

/* (пример получения состояния и действий с помощью хуков) */
const Counter = () => {

    const counter = useSelector(state => state.counter); /* (через useSelector получаем нужные состояния из store(если получаем одним обьектом, то при изменении store проверяет весь обьект, а не построчно как в работе с Connect, что вызывает лишние рендеры, поэтому для каждого состояния желательно создавать отдельную переменную с хуком или использовать библиотеки для более точного сравнения)) */
    const dispatch = useDispatch(); /* (подключаем диспетчер) */
    
    return (
        <div className="jumbotron">
            <h1>{counter}</h1>
            {/* (действия вызываем через диспетчер в виде коллбеков, желательно без сокращений(сокращенные варианты в документации), если передаем дочерним компонентам - обязательно меморизируем через useCallback, иначе любое изменение этого блока будет перерисовывать и дочерний) */}
            <button onClick={() => dispatch(dec())} className="btn btn-primary">DEC</button>
            <button onClick={() => dispatch(inc())} className="btn btn-primary">INC</button>
            <button onClick={() => dispatch(rnd())} className="btn btn-primary">RND</button>
        </div>
    )
}

export default Counter;