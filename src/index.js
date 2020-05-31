import './index.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observable, computed, configure, action, decorate, runInAction } from 'mobx';
import { observer } from 'mobx-react';
configure({ enforceActions: 'observed' });

class Store {
    user: null;

    getUser() {
       fetch(`https://randomuser.me/api/`)
           .then(res => res.json())
           .then(json => {
               if (json.results) {
                   runInAction(() => {
                       this.user = json.results[0]
                   });
               }
           })
    };
}

decorate(Store, {
    user: observable,
    // теряется контекст вызова action из-за содержания внутри него ассинхронщины
    getUser: action.bound,
});

const appStore = new Store();

@observer class App extends Component {
    render() {
        const { store } = this.props;

        return (
            <div>
                <button onClick={store.getUser}>Get User</button>
                <h1>{store.user ? store.user.login.username : 'Default name'}</h1>
            </div>
        )
    }
}

ReactDOM.render(<App store={appStore} />, document.getElementById('root'));
