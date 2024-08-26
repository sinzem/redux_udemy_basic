import { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions';
import { bindActionCreators } from "redux";

/* (пример получения состояний и экшнов в компоненте с помощью функции connect(чаще используют хуки, но функция более быстрая и настраиваемая)) */

// const Counter = ({counter, inc, dec, rnd}) => {
//     return (
//         <div className="jumbotron">
//             <h1>{counter}</h1>
//             <button onClick={dec} className="btn btn-primary">DEC</button>
//             <button onClick={inc} className="btn btn-primary">INC</button>
//             <button onClick={rnd} className="btn btn-primary">RND</button>
//         </div>
//     )
// }

class Counter extends Component {
    render() {
        const {counter, inc, dec, rnd} = this.props;
        return (
            <div className="jumbotron">
                <h1>{counter}</h1>
                <button onClick={dec} className="btn btn-primary">DEC</button>
                <button onClick={inc} className="btn btn-primary">INC</button>
                <button onClick={rnd} className="btn btn-primary">RND</button>
            </div>
        )
    }
}

/* (встроенная функция connect по получению состояний из state(при изменении состояний provider автоматически передает данные)) */
const mapStateToProps = (state) => {
    return {
        counter: state.value, /* (получаем из state интересующие поля(получили value, назвали counter и передали в верстку)) */
    }
}

/* (встроенная функция connect по получению actions) */
// const mapDispatchToProps = (dispatch) => { /* (как аргумент получает dispatch) */
//     // return (inc: () => dispatch(inc())) /* (пример полной записи - каждое действие подключаем как коллбэк через диспетчер) */
//     // return bindActionCreators(actions, dispatch) /* (пример сокращенной записи через bindActionCreators - действия передаются в нее в виде обьекта и автоматически подключаются как в примере выше) */
// }

/* (экспортируем компонент/класс через функцию-обложку connect, в которую передаем функции по получению состояний и действий(вместо mapDispatchToProps зачастую просто передают обьект с actions, dispatch добавляется автоматически, но в функции можно дополнительно настраивать действия)) */
export default connect(mapStateToProps, /* mapDispatchToProps, */ actions)(Counter);