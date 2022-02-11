import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import UseReducer from './component/UseReducer';
import './App.css';
import Info from './component/Info';
import UseMemo from './component/UseMemo';
import UseCallback from './component/UseCallback';
import UseRefAvg from './component/UseRefAvg';

axios.defaults.withCredentials = true;

const App = () => {
	return (
		<div className="form app">
			<Info />
		</div>
	);
};

export default App;
