import React from 'react';
import TestAxios from './component/TestAxios';
import './App.css';

class App extends React.Component {

    render(){

        return(
            <div className="form axios">
                <TestAxios />
            </div>
        )
    }

}

export default App;