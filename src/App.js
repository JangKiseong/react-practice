import React from 'react';
import TestAxios from './component/TestAxios';
import InputSample from './component/InputSample';
import UseRef from './component/UseRef';
import './App.css';

class App extends React.Component {

    render(){

        return(
            <div className="form app">
                <TestAxios />
                <InputSample />
                <UseRef />
            </div>
        )
    }

}

export default App;