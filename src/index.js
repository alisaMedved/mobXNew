import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

// вычисляемое значение всегда предоставляется в виде геттера

// наблюдаемая переменная - @observable
// вычисляемая переменная - @computed - если оно нигде не используется то оно собирается gorbage collection

// если action попытается изменить значение наблюдаемой переменной на точно такое же - то этого не случится
// - магия mobX под капотом

// mobX не пытается привести вычисляемое значение к актуальному значению если оно нигде не нужно
// то есть нигде не выводится и не учавствует ни вкакой реакции
// реакция -  @observer

//весь стор приложения c его методами можно запихнуть в один объект - observable object - наблюдаемый объект

// бывает и observable array

const todos = observable([
    {text: 'react'},
    {text: 'mobX'},
]);


@observer class Counter extends Component {

    render() {
        console.log('рендер идет');
        return (
            <div className="App">
                    <ul>
                        {todos.map(({text}) => <li key={text}>{text}</li>)}
                    </ul>
            </div>
        );
    }
}

ReactDOM.render(<Counter store={todos} />, document.getElementById('root'));

// пуш после рендера сработает потому что массив является наблюдаемым
// притом пуш вызовет перерендер
todos.push({text: 'redux'});
serviceWorker.unregister();
