import './index.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observable, configure, action, when, autorun } from 'mobx';
import { observer } from 'mobx-react';
configure({ enforceActions: 'observed' });

class Store {
    @observable count = 0;
    @action increment() { this.count++ };
    @action decrement() { this.count-- };
}

const appStore = new Store();
// when и autorun - это ключевые слова для создания пользовательской реакции
// when(условие, действие при true) - выполняется единоразово при выполненнии условия. И после этого перестает наблюдатся вовсе
when(
    () => appStore.count > 5,
    () => { alert('Count value is more than 5')}
);

// autorun - выполняется при componentWillMount и также при каждом изменении зависимости
// зависимость - это любая вычисляемая или наблюдаемая переменная что задействована в этом autorun
// autorun - запускается после изменения значения и перед его дальнейшей перерисовкой
autorun(() => {
    alert(`Count value is: ${appStore.count}`);
},
    {
        name: 'Custom autorun',
        delay: 3000,
    });

@observer class App extends Component {
    handleIncrement = () => {this.props.store.increment() };
    handleDecrement = () => {this.props.store.decrement() };
    render() {
        return (
            <div>
                <h1>{this.props.store.count}</h1>
                <button onClick={this.handleDecrement}>-1</button>
                <button onClick={this.handleIncrement}>+1</button>
            </div>
        )
    }
}

ReactDOM.render(<App store={appStore} />, document.getElementById('root'));
