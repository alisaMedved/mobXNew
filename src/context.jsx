import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {observable} from "mobx";


const TimerContext = React.createContext();

const Timer = observer(() => {
    const timerData = useContext(TimerContext);
    return <span>Seconds passed: {timerData.secondsPassed} </span>
});

// но вот зачем к контексту подвязывать observable не понятно
const timerData = observable(/* ... */);

const App = () => (
    <TimerContext.Provider value={timerData}>
        <Timer />
    </TimerContext.Provider>
);
