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

const nickName = observable({
            firstName: 'Yahen',
            age: 30,

   get nickName() {
        console.log('Generate nickName!');
        return `${this.firstName}${this.age}`;
    },
    increment() {
        this.age++
    },
    decrement() {
        this.age--
    }
});

const todos = observable([
    {text: 'react'},
    {text: 'mobX'},
]);


@observer class Counter extends Component {

    handleIncrement = () => { this.props.store.increment() };
    handleDecrement = () => { this.props.store.decrement() };

    render() {
        return (
            <div className="App">
                <div>
                <h1>{this.props.store.nickName}</h1>
                <h1>{this.props.store.age}</h1>
                <button onClick={this.handleDecrement}>-1</button>
                <button onClick={this.handleIncrement}>+1</button>
                </div>
                {/*<div>*/}
                {/*    <ul>*/}
                {/*        {todos.map(({text}) => <li key={text}>{text}</li>)}*/}
                {/*    </ul>*/}
                {/*</div>*/}
            </div>
        );
    }
}

ReactDOM.render(<Counter store={nickName} />, document.getElementById('root'));

serviceWorker.unregister();
