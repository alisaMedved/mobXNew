import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { computed, extendObservable } from 'mobx';
import { observer } from 'mobx-react';

// вычисляемое значение всегда предоставляется в виде геттера

// наблюдаемая переменная - @observable
// вычисляемая переменная - @computed - если оно нигде не используется то оно собирается gorbage collection

// если action попытается изменить значение наблюдаемой переменной на точно такое же - то этого не случится
// - магия mobX под капотом

// mobX не пытается привести вычисляемое значение к актуальному значению если оно нигде не нужно
// то есть нигде не выводится и не учавствует ни вкакой реакции
// реакция -  @observer

//весь стор приложения можно запихнуть в один класс

const nickName = new class UserNickName {

    constructor() {
        extendObservable(this, {
            firstName: 'Yahen',
            age: 30,
        })
    }

    @computed get nickName() {
        console.log('Generate nickName!');
        return `${this.firstName}${this.age}`;
    }
};

nickName.increment = function() {
    this.age++
};

nickName.decrement = function() {
    this.age--
};


@observer class Counter extends Component {

    handleIncrement = () => { this.props.store.increment() };
    handleDecrement = () => { this.props.store.decrement() };

    render() {
        return (
            <div className="App">
                <h1>{this.props.store.nickName}</h1>
                <h1>{this.props.store.age}</h1>
                <button onClick={this.handleDecrement}>-1</button>
                <button onClick={this.handleIncrement}>+1</button>
            </div>
        );
    }
}

ReactDOM.render(<Counter store={nickName} />, document.getElementById('root'));

serviceWorker.unregister();
