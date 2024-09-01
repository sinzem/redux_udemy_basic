// Базовый разбор работы с глобальным состоянием с помощью Redux

// npm i redux react-redux

// Базовый пример создания state в basicExamples/first/first.js, 
    // в папке second пример более сокращенного подключения действий, 
    // в папке third более похожее на приложение построение модулей и подключение store через provider  
    // в папке fourd пример получения состояний и действий в компоненте при помощи connect
    // в папке fifth пример получения состояний и действий в компоненте при помощи хуков


// Redux DevTools - https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ru&pli=1 - (устанавливаем в браузер и добавляем настройку при создании store из https://github.com/zalmoxisus/redux-devtools-extension#usage - на этот момент +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


// npm i concurrently - модуль позволит запустить на одном терминале два сервера(само приложение и json-сервер для БД, пример подключения в package.json/scripts/start) 

// npm i reselect --save  - модуль для глубокого сравнения состояний(если состояния подключены обьектом, сравнение не происходит(поля одинаковые, но вцелом обьект считается разным - будет перерисовываться даже если не произошло изменений, модуль исправит эту проблему - пример использования в HeroesList.js))

// npm i redux-thunk --save  - миддлвер для передачи в диспетчер не только обьектов, но и функций, в т.ч асинхронных(пример подключения - в store/index.js, пример использования - в actions/index.js)




