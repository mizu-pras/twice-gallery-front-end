import React from 'react';
import ReactDOM from 'react-dom';
import AppContext from './context/AppContext';

import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<AppContext>
			<App/>
		</AppContext>
  	</React.StrictMode>,
	document.getElementById('root')
);
