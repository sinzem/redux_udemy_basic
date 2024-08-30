import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import { createSelector } from 'reselect';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {

    // const someState = useSelector(state => ({
    //     activeFilter: state.filters.activeFilter,
    //     heroes: state.heroes.heroes
    // })) /* (пример получения нужных состояний в виде одного обьекта - не рекомендуется, может вызывать лишние рендеры) */

    /* (функция по фильтрованию героев - получаем из store нужные состояния напрямую, без лишнего вынесения в обьект, как выше, тут же в хуке фильтруем и результат идет в верстку(при повторном нажатии на одинаковый фильтр будут перерендер, нужна меморизация - ниже пример с createSelector)) */
    // const filteredHeroes = useSelector(state => {
    //     if (state.filters.activeFilter === "all") {
    //         return state.heroes.heroes;
    //     } else {
    //         return state.heroes.heroes.filter(item => item.element === state.filters.activeFilter)
    //     }
    // })

    /* (создаем функцию фильтрации на основе модуля reselect для глубокого сравнения состояний(решит проблему лишних рендеров - при нажатии на один и тот же фильтр перерисовывается компонент, хотя обьект состояний не изменился)) */
    const filteredHeroesSelector = createSelector( /* (используем функцию createSelector, первыми аргументами идут функции по получению нужных состояний из store, последним - функция по их использованию) */
        (state) => state.filters.activeFilter,
        (state) => state.heroes.heroes,
        (filter, heroes) => { /* (аргументы функции соответствуют полученным выше полям состояний, названия даем любые, но порядок должен совпадать) */
            if (filter === "all") {
                return heroes;
            } else {
                return heroes.filter(item => item.element === filter)
            }
        }
    ) /* (далее функция используется в стандартном redux-хуке по получению состояний - useSelector, подключена ниже) */
    const filteredHeroes = useSelector(filteredHeroesSelector);

    const {heroesLoadingStatus} = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    // Функция берет id и по нему удаляет ненужного персонажа из store
    // ТОЛЬКО если запрос на удаление прошел успешно
    const onDelete = useCallback((id) => {
        // Удаление персонажа по его id
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(data => console.log(data, 'Deleted'))
            .then(dispatch(heroDeleted(id)))
            .catch(err => console.log(err));
        // eslint-disable-next-line  
    }, [request]);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition 
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <HeroesListItem  {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;